from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Request, status, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db
from app.services.oauth_service import oauth, exchange_code_for_token
from app.services.user_service import (
    create_oauth_user, 
    create_user_token, 
    get_user_by_email,
    revoke_all_user_sessions
)
from app.utils.auth import get_current_user, end_user_session
from app.schemas.user import User, UserWithToken
from app.config import settings

router = APIRouter(prefix="/auth", tags=["authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/google/login")
async def login_with_google():
    """
    Redirect user to Google login page
    """
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    return await oauth.google.authorize_redirect(redirect_uri)


@router.get("/github/login")
async def login_with_github():
    """
    Redirect user to GitHub login page
    """
    redirect_uri = settings.GITHUB_REDIRECT_URI
    return await oauth.github.authorize_redirect(redirect_uri)


@router.get("/callback/{provider}")
async def auth_callback(
    provider: str,
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> RedirectResponse:
    """
    Handle OAuth callback from Google or GitHub
    """
    try:
        # Get code from query params
        code = request.query_params.get("code")
        if not code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Authorization code is required"
            )
        
        # Exchange code for token and get user data
        redirect_uri = settings.GOOGLE_REDIRECT_URI if provider == "google" else settings.GITHUB_REDIRECT_URI
        _, user_data = await exchange_code_for_token(provider, code, redirect_uri)
        
        # Create or get user
        db_user = await create_oauth_user(db, user_data)
        
        # Create JWT token
        token = await create_user_token(db, db_user)
        
        # Redirect to frontend with token
        frontend_url = f"{settings.FRONTEND_URL}/auth/callback?token={token}"
        return RedirectResponse(url=frontend_url)
    
    except Exception as e:
        # Redirect to frontend with error
        error_url = f"{settings.FRONTEND_URL}/auth/error?message={str(e)}"
        return RedirectResponse(url=error_url)


@router.get("/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)) -> User:
    """
    Get current authenticated user
    """
    return current_user


@router.post("/logout")
async def logout(
    response: Response,
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Logout user (revoke current session)
    """
    try:
        await end_user_session(db, token)
        response.delete_cookie(key="Authorization")
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during logout: {str(e)}"
        )


@router.post("/logout/all")
async def logout_all_sessions(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Logout user from all sessions
    """
    try:
        await revoke_all_user_sessions(db, current_user.id)
        response.delete_cookie(key="Authorization")
        return {"message": "Successfully logged out from all sessions"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during logout: {str(e)}"
        ) 