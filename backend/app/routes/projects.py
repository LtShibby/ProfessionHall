from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.schemas.project import Project, ProjectCreate
from app.services.project_service import (
    create_project, 
    get_project, 
    get_user_projects, 
    update_project, 
    delete_project
)
from app.utils.auth import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/add", response_model=Project)
async def add_project(
    project_data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Add a new project for the current user
    """
    return await create_project(db, project_data, current_user.id)


@router.get("/user/{user_id}", response_model=List[Project])
async def get_projects_for_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all projects for a specific user
    """
    return await get_user_projects(db, user_id)


@router.get("/me", response_model=List[Project])
async def get_my_projects(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all projects for the current user
    """
    return await get_user_projects(db, current_user.id)


@router.get("/{project_id}", response_model=Project)
async def get_project_by_id(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a project by ID
    """
    project = await get_project(db, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


@router.put("/{project_id}", response_model=Project)
async def update_project_by_id(
    project_id: uuid.UUID,
    project_data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Update a project
    """
    # Check if project exists and belongs to current user
    project = await get_project(db, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    if project.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this project"
        )
    
    updated_project = await update_project(db, project_id, project_data)
    return updated_project


@router.delete("/delete/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project_by_id(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a project
    """
    # Check if project exists and belongs to current user
    project = await get_project(db, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    if project.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this project"
        )
    
    deleted = await delete_project(db, project_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete project"
        ) 