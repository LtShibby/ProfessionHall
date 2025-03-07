from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
import uuid


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    auth_provider: str
    auth_provider_id: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None


class UserInDBBase(UserBase):
    id: uuid.UUID
    auth_provider: str
    auth_provider_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    """User information returned to the client"""
    pass


class UserWithToken(BaseModel):
    """User information with access token"""
    user: User
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    """JWT token payload"""
    sub: str  # User ID
    exp: int  # Expiration time (Unix timestamp)
    jti: str  # JWT ID for token revocation 