import uuid
from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.models.user import RevokedToken


def create_jwt_token(
    subject: str,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create a new JWT token
    :param subject: Token subject (usually user ID)
    :param expires_delta: Token expiration time
    :return: Encoded JWT token
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.JWT_EXPIRATION_MINUTES
        )
    
    # Create a unique token ID for potential revocation
    jti = str(uuid.uuid4())
    
    to_encode = {"exp": expire, "sub": str(subject), "jti": jti}
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


async def is_token_revoked(db: AsyncSession, token: str) -> bool:
    """
    Check if a token has been revoked
    :param db: Database session
    :param token: JWT token to check
    :return: True if token is revoked, False otherwise
    """
    query = select(RevokedToken).where(RevokedToken.token == token)
    result = await db.execute(query)
    return result.scalars().first() is not None


async def revoke_token(db: AsyncSession, token: str) -> None:
    """
    Revoke a JWT token
    :param db: Database session
    :param token: JWT token to revoke
    """
    revoked_token = RevokedToken(token=token)
    db.add(revoked_token)
    await db.commit()


def decode_jwt_token(token: str) -> Dict[str, Any]:
    """
    Decode a JWT token
    :param token: JWT token to decode
    :return: Decoded token payload
    """
    return jwt.decode(
        token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
    ) 