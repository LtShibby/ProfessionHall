from typing import Dict, List, Any
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.schemas.project import Skill, SkillCreate
from app.services.skill_service import (
    create_skill,
    get_all_skills,
    get_skill_by_id,
    get_user_skills
)
from app.utils.auth import get_current_user

router = APIRouter(prefix="/skills", tags=["skills"])


@router.post("/add", response_model=Skill)
async def add_skill(
    skill_data: SkillCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Add a new skill to the system
    """
    return await create_skill(db, skill_data)


@router.get("/all", response_model=List[Skill])
async def get_skills(
    db: AsyncSession = Depends(get_db)
):
    """
    Get all skills in the system
    """
    return await get_all_skills(db)


@router.get("/{skill_id}", response_model=Skill)
async def get_skill(
    skill_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a skill by ID
    """
    skill = await get_skill_by_id(db, skill_id)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    return skill


@router.get("/user/{user_id}", response_model=Dict[str, Any])
async def get_skills_for_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all skills for a specific user
    """
    return await get_user_skills(db, user_id)


@router.get("/me", response_model=Dict[str, Any])
async def get_my_skills(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all skills for the current user
    """
    return await get_user_skills(db, current_user.id) 