from typing import Optional, List
import uuid
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.models.user import User, Session
from app.schemas.user import UserCreate, UserUpdate
from app.utils.jwt import create_jwt_token
from app.utils.auth import create_user_session
from app.config import settings


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """
    Get a user by email
    :param db: Database session
    :param email: User email
    :return: User if found, None otherwise
    """
    query = select(User).where(User.email == email)
    result = await db.execute(query)
    return result.scalars().first()


async def get_user_by_provider_id(
    db: AsyncSession, 
    provider: str, 
    provider_id: str
) -> Optional[User]:
    """
    Get a user by provider ID
    :param db: Database session
    :param provider: Auth provider (google/github)
    :param provider_id: Provider user ID
    :return: User if found, None otherwise
    """
    query = select(User).where(
        User.auth_provider == provider,
        User.auth_provider_id == provider_id
    )
    result = await db.execute(query)
    return result.scalars().first()


async def create_oauth_user(
    db: AsyncSession,
    user_data: UserCreate
) -> User:
    """
    Create a new user from OAuth data
    :param db: Database session
    :param user_data: User data from OAuth provider
    :return: Created user
    """
    # Check if user with this email already exists
    existing_user = await get_user_by_email(db, user_data.email)
    if existing_user:
        # User exists - just update auth provider if needed
        return existing_user
    
    # Create new user
    db_user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        avatar_url=user_data.avatar_url,
        auth_provider=user_data.auth_provider,
        auth_provider_id=user_data.auth_provider_id
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def update_user(
    db: AsyncSession,
    user_id: uuid.UUID,
    user_data: UserUpdate
) -> Optional[User]:
    """
    Update user information
    :param db: Database session
    :param user_id: User ID
    :param user_data: User data to update
    :return: Updated user if found, None otherwise
    """
    # Get user by ID
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    user = result.scalars().first()
    
    if not user:
        return None
    
    # Update user fields if provided
    update_data = user_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    await db.commit()
    await db.refresh(user)
    return user


async def create_user_token(
    db: AsyncSession,
    user: User
) -> str:
    """
    Create a JWT token for a user
    :param db: Database session
    :param user: User to create token for
    :return: JWT token
    """
    # Create JWT token
    token = create_jwt_token(
        subject=str(user.id),
        expires_delta=timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
    )
    
    # Create session record
    expires_at = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
    await create_user_session(db, user.id, token, expires_at)
    
    return token


async def get_user_active_sessions(
    db: AsyncSession,
    user_id: uuid.UUID
) -> List[Session]:
    """
    Get all active sessions for a user
    :param db: Database session
    :param user_id: User ID
    :return: List of active sessions
    """
    query = select(Session).where(
        Session.user_id == user_id,
        Session.is_revoked == False,
        Session.expires_at > datetime.utcnow()
    )
    result = await db.execute(query)
    return result.scalars().all()


async def revoke_all_user_sessions(
    db: AsyncSession,
    user_id: uuid.UUID
) -> bool:
    """
    Revoke all active sessions for a user
    :param db: Database session
    :param user_id: User ID
    :return: True if sessions revoked successfully
    """
    # Get all active sessions
    sessions = await get_user_active_sessions(db, user_id)
    
    # Mark each session as revoked
    for session in sessions:
        session.is_revoked = True
    
    # Add each token to revoked tokens list
    from app.utils.jwt import revoke_token
    for session in sessions:
        await revoke_token(db, session.token)
    
    await db.commit()
    return True 