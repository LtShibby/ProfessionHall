from typing import Optional
import uuid
import time
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User, Session as DBSession
from app.utils.jwt import decode_jwt_token, is_token_revoked
from app.schemas.user import TokenPayload
from app.config import settings

# OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/token",
    scheme_name="JWT",
    auto_error=False
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Get the current authenticated user
    :param token: JWT token from Authorization header
    :param db: Database session
    :return: Current authenticated user
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        # Decode token
        payload = decode_jwt_token(token)
        token_data = TokenPayload(**payload)
        
        # Check if token is expired
        if token_data.exp < int(time.time()):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Check if token is revoked
        if await is_token_revoked(db, token):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token revoked",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Get user by ID
        user_id = token_data.sub
        query = select(User).where(User.id == user_id)
        result = await db.execute(query)
        user = result.scalars().first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def create_user_session(
    db: AsyncSession, 
    user_id: uuid.UUID, 
    token: str, 
    expires_at: Optional[datetime] = None
) -> DBSession:
    """
    Create a new session for a user
    :param db: Database session
    :param user_id: User ID
    :param token: JWT token
    :param expires_at: Token expiration time
    :return: Created session
    """
    session = DBSession(
        user_id=user_id,
        token=token,
        expires_at=expires_at or datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return session


async def end_user_session(db: AsyncSession, token: str) -> bool:
    """
    End a user session by revoking the token
    :param db: Database session
    :param token: JWT token to revoke
    :return: True if session ended successfully, False otherwise
    """
    from app.utils.jwt import revoke_token
    
    # Mark session as revoked
    query = select(DBSession).where(DBSession.token == token)
    result = await db.execute(query)
    session = result.scalars().first()
    
    if session:
        session.is_revoked = True
        await db.commit()
    
    # Add token to revoked tokens list
    await revoke_token(db, token)
    
    return True 