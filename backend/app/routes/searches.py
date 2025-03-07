from typing import List, Dict, Any
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.schemas.project import RecruiterSearch, RecruiterSearchCreate
from app.services.search_service import (
    create_search,
    get_recruiter_searches,
    get_search_by_id,
    update_search_results,
    delete_search
)
from app.utils.auth import get_current_user

router = APIRouter(prefix="/searches", tags=["recruiter_searches"])


@router.post("/add", response_model=RecruiterSearch)
async def add_search(
    search_data: RecruiterSearchCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Add a new recruiter search
    """
    return await create_search(db, search_data, current_user.id)


@router.get("/recruiter/{recruiter_id}", response_model=List[RecruiterSearch])
async def get_searches_for_recruiter(
    recruiter_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all searches for a specific recruiter
    """
    return await get_recruiter_searches(db, recruiter_id)


@router.get("/me", response_model=List[RecruiterSearch])
async def get_my_searches(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all searches for the current user
    """
    return await get_recruiter_searches(db, current_user.id)


@router.get("/{search_id}", response_model=RecruiterSearch)
async def get_search(
    search_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get a search by ID
    """
    search = await get_search_by_id(db, search_id)
    if not search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Search not found"
        )
    
    # Check if search belongs to current user
    if search.recruiter_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this search"
        )
    
    return search


@router.put("/{search_id}/results", response_model=RecruiterSearch)
async def update_results(
    search_id: uuid.UUID,
    results: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Update search results
    """
    # Check if search exists and belongs to current user
    search = await get_search_by_id(db, search_id)
    if not search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Search not found"
        )
    
    if search.recruiter_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this search"
        )
    
    updated_search = await update_search_results(db, search_id, results)
    return updated_search


@router.delete("/{search_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_search_by_id(
    search_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Delete a search
    """
    # Check if search exists and belongs to current user
    search = await get_search_by_id(db, search_id)
    if not search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Search not found"
        )
    
    if search.recruiter_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this search"
        )
    
    deleted = await delete_search(db, search_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete search"
        ) 