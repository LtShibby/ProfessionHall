from typing import List, Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import joinedload

from app.models.project import Project, Skill, ProjectSkill
from app.schemas.project import ProjectCreate, ProjectSkillCreate


async def get_project(db: AsyncSession, project_id: uuid.UUID) -> Optional[Project]:
    """
    Get a project by ID
    :param db: Database session
    :param project_id: Project ID
    :return: Project if found, None otherwise
    """
    query = select(Project).where(Project.id == project_id).options(
        joinedload(Project.skills).joinedload(ProjectSkill.skill)
    )
    result = await db.execute(query)
    return result.scalars().first()


async def get_user_projects(db: AsyncSession, user_id: uuid.UUID) -> List[Project]:
    """
    Get all projects for a user
    :param db: Database session
    :param user_id: User ID
    :return: List of projects
    """
    query = select(Project).where(Project.user_id == user_id).options(
        joinedload(Project.skills).joinedload(ProjectSkill.skill)
    )
    result = await db.execute(query)
    return result.scalars().all()


async def create_project(db: AsyncSession, project_data: ProjectCreate, user_id: uuid.UUID) -> Project:
    """
    Create a new project
    :param db: Database session
    :param project_data: Project data
    :param user_id: User ID
    :return: Created project
    """
    # Create project
    project = Project(
        user_id=user_id,
        title=project_data.title,
        description=project_data.description,
        repo_url=project_data.repo_url,
        live_url=project_data.live_url,
        thumbnail_url=project_data.thumbnail_url,
        is_published=project_data.is_published
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    
    # Add skills to project
    if project_data.skills:
        for skill_data in project_data.skills:
            await add_skill_to_project(db, project.id, skill_data)
    
    return project


async def update_project(db: AsyncSession, project_id: uuid.UUID, project_data: ProjectCreate) -> Optional[Project]:
    """
    Update a project
    :param db: Database session
    :param project_id: Project ID
    :param project_data: Project data
    :return: Updated project if found, None otherwise
    """
    # Get project
    project = await get_project(db, project_id)
    if not project:
        return None
    
    # Update project fields
    for field, value in project_data.dict(exclude={"skills"}).items():
        setattr(project, field, value)
    
    await db.commit()
    await db.refresh(project)
    
    # Update skills
    if project_data.skills is not None:
        # Remove existing skills
        query = delete(ProjectSkill).where(ProjectSkill.project_id == project_id)
        await db.execute(query)
        
        # Add new skills
        for skill_data in project_data.skills:
            await add_skill_to_project(db, project.id, skill_data)
    
    return project


async def delete_project(db: AsyncSession, project_id: uuid.UUID) -> bool:
    """
    Delete a project
    :param db: Database session
    :param project_id: Project ID
    :return: True if deleted, False otherwise
    """
    project = await get_project(db, project_id)
    if not project:
        return False
    
    await db.delete(project)
    await db.commit()
    return True


async def get_or_create_skill(db: AsyncSession, skill_name: str, category: Optional[str] = None) -> Skill:
    """
    Get a skill by name or create it if it doesn't exist
    :param db: Database session
    :param skill_name: Skill name
    :param category: Optional skill category
    :return: Skill
    """
    # Normalize skill name
    skill_name = skill_name.lower().strip()
    
    # Check if skill exists
    query = select(Skill).where(Skill.name == skill_name)
    result = await db.execute(query)
    skill = result.scalars().first()
    
    if skill:
        return skill
    
    # Create skill
    skill = Skill(name=skill_name, category=category)
    db.add(skill)
    await db.commit()
    await db.refresh(skill)
    
    return skill


async def add_skill_to_project(db: AsyncSession, project_id: uuid.UUID, skill_data: ProjectSkillCreate) -> ProjectSkill:
    """
    Add a skill to a project
    :param db: Database session
    :param project_id: Project ID
    :param skill_data: Skill data
    :return: Created project skill
    """
    project_skill = ProjectSkill(
        project_id=project_id,
        skill_id=skill_data.skill_id,
        confidence_score=skill_data.confidence_score
    )
    db.add(project_skill)
    await db.commit()
    await db.refresh(project_skill)
    
    return project_skill


async def get_project_skills(db: AsyncSession, project_id: uuid.UUID) -> List[ProjectSkill]:
    """
    Get all skills for a project
    :param db: Database session
    :param project_id: Project ID
    :return: List of project skills
    """
    query = select(ProjectSkill).where(ProjectSkill.project_id == project_id).options(
        joinedload(ProjectSkill.skill)
    )
    result = await db.execute(query)
    return result.scalars().all() 