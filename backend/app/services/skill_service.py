from typing import List, Optional, Dict, Any
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload

from app.models.project import Skill, ProjectSkill
from app.models.user import User
from app.schemas.project import SkillCreate


async def get_skill_by_id(db: AsyncSession, skill_id: uuid.UUID) -> Optional[Skill]:
    """
    Get a skill by ID
    :param db: Database session
    :param skill_id: Skill ID
    :return: Skill if found, None otherwise
    """
    query = select(Skill).where(Skill.id == skill_id)
    result = await db.execute(query)
    return result.scalars().first()


async def get_skill_by_name(db: AsyncSession, name: str) -> Optional[Skill]:
    """
    Get a skill by name
    :param db: Database session
    :param name: Skill name
    :return: Skill if found, None otherwise
    """
    # Normalize skill name
    name = name.lower().strip()
    
    query = select(Skill).where(func.lower(Skill.name) == name)
    result = await db.execute(query)
    return result.scalars().first()


async def get_all_skills(db: AsyncSession) -> List[Skill]:
    """
    Get all skills
    :param db: Database session
    :return: List of skills
    """
    query = select(Skill)
    result = await db.execute(query)
    return result.scalars().all()


async def create_skill(db: AsyncSession, skill_data: SkillCreate) -> Skill:
    """
    Create a new skill
    :param db: Database session
    :param skill_data: Skill data
    :return: Created skill
    """
    # Check if skill already exists
    existing_skill = await get_skill_by_name(db, skill_data.name)
    if existing_skill:
        return existing_skill
    
    # Create skill
    skill = Skill(
        name=skill_data.name.lower().strip(),
        category=skill_data.category
    )
    db.add(skill)
    await db.commit()
    await db.refresh(skill)
    
    return skill


async def get_user_skills(db: AsyncSession, user_id: uuid.UUID) -> Dict[str, Any]:
    """
    Get all skills for a user across all projects
    :param db: Database session
    :param user_id: User ID
    :return: Dict with skill data and stats
    """
    # Get user
    user_query = select(User).where(User.id == user_id)
    user_result = await db.execute(user_query)
    user = user_result.scalars().first()
    
    if not user:
        return {"skills": [], "total_count": 0}
    
    # Query all skills across user's projects
    query = (
        select(Skill, func.count(ProjectSkill.id).label("project_count"))
        .join(ProjectSkill, Skill.id == ProjectSkill.skill_id)
        .join(ProjectSkill.project)
        .filter(ProjectSkill.project.has(user_id=user_id))
        .group_by(Skill.id)
        .order_by(func.count(ProjectSkill.id).desc())
    )
    
    result = await db.execute(query)
    
    # Format response
    skills_with_counts = []
    for skill, count in result:
        skills_with_counts.append({
            "id": str(skill.id),
            "name": skill.name,
            "category": skill.category,
            "project_count": count
        })
    
    return {
        "skills": skills_with_counts,
        "total_count": len(skills_with_counts)
    } 