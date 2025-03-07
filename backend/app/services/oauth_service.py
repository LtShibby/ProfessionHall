from typing import Dict, Optional, Tuple
import httpx
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from fastapi import HTTPException, status

from app.config import settings
from app.schemas.user import UserCreate

# Create OAuth clients
config = Config(environ={"GITHUB_CLIENT_ID": settings.GITHUB_CLIENT_ID,
                         "GITHUB_CLIENT_SECRET": settings.GITHUB_CLIENT_SECRET,
                         "GOOGLE_CLIENT_ID": settings.GOOGLE_CLIENT_ID,
                         "GOOGLE_CLIENT_SECRET": settings.GOOGLE_CLIENT_SECRET})

oauth = OAuth(config)

# Configure OAuth providers
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

oauth.register(
    name="github",
    client_id=settings.GITHUB_CLIENT_ID,
    client_secret=settings.GITHUB_CLIENT_SECRET,
    access_token_url="https://github.com/login/oauth/access_token",
    access_token_params=None,
    authorize_url="https://github.com/login/oauth/authorize",
    authorize_params=None,
    api_base_url="https://api.github.com/",
    client_kwargs={"scope": "user:email"},
)


async def get_google_user_data(access_token: str) -> Dict:
    """
    Get user data from Google
    :param access_token: Google OAuth access token
    :return: User data from Google
    """
    async with httpx.AsyncClient() as client:
        userinfo_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        
        response = await client.get(userinfo_endpoint, headers=headers)
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not authenticate with Google",
            )
        
        user_data = response.json()
        return user_data


async def get_github_user_data(access_token: str) -> Dict:
    """
    Get user data from GitHub
    :param access_token: GitHub OAuth access token
    :return: User data from GitHub
    """
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"token {access_token}"}
        
        # Get user profile
        response = await client.get("https://api.github.com/user", headers=headers)
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not authenticate with GitHub",
            )
        
        user_data = response.json()
        
        # Get user emails (needed because email might be private)
        emails_response = await client.get("https://api.github.com/user/emails", headers=headers)
        if emails_response.status_code == 200:
            emails = emails_response.json()
            primary_email = next((email["email"] for email in emails if email["primary"]), None)
            if primary_email:
                user_data["email"] = primary_email
        
        return user_data


def extract_user_data_from_google(user_data: Dict) -> UserCreate:
    """
    Extract required user data from Google response
    :param user_data: User data from Google
    :return: Structured user data
    """
    return UserCreate(
        email=user_data.get("email"),
        full_name=user_data.get("name"),
        avatar_url=user_data.get("picture"),
        auth_provider="google",
        auth_provider_id=user_data.get("sub"),
    )


def extract_user_data_from_github(user_data: Dict) -> UserCreate:
    """
    Extract required user data from GitHub response
    :param user_data: User data from GitHub
    :return: Structured user data
    """
    return UserCreate(
        email=user_data.get("email"),
        full_name=user_data.get("name"),
        avatar_url=user_data.get("avatar_url"),
        auth_provider="github",
        auth_provider_id=str(user_data.get("id")),
    )


async def exchange_code_for_token(
    provider: str, 
    code: str, 
    redirect_uri: Optional[str] = None
) -> Tuple[str, Dict]:
    """
    Exchange authorization code for access token
    :param provider: OAuth provider (google/github)
    :param code: Authorization code
    :param redirect_uri: Redirect URI used in authorization request
    :return: Tuple of (access_token, user_data)
    """
    if provider == "google":
        token = await oauth.google.authorize_access_token(code=code, redirect_uri=redirect_uri)
        user_data = await get_google_user_data(token["access_token"])
        structured_user_data = extract_user_data_from_google(user_data)
    elif provider == "github":
        token = await oauth.github.authorize_access_token(code=code, redirect_uri=redirect_uri)
        user_data = await get_github_user_data(token["access_token"])
        structured_user_data = extract_user_data_from_github(user_data)
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported provider: {provider}",
        )
    
    return token["access_token"], structured_user_data 