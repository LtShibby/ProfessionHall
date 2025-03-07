from typing import List, Optional, Dict, Any
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.models.project import RecruiterSearch
from app.schemas.project import RecruiterSearchCreate


async def get_search_by_id(db: AsyncSession, search_id: uuid.UUID) -> Optional[RecruiterSearch]:
    """
    Get a recruiter search by ID
    :param db: Database session
    :param search_id: Search ID
    :return: Search if found, None otherwise
    """
    query = select(RecruiterSearch).where(RecruiterSearch.id == search_id)
    result = await db.execute(query)
    return result.scalars().first()


async def get_recruiter_searches(db: AsyncSession, recruiter_id: uuid.UUID) -> List[RecruiterSearch]:
    """
    Get all searches for a recruiter
    :param db: Database session
    :param recruiter_id: Recruiter user ID
    :return: List of searches
    """
    query = select(RecruiterSearch).where(RecruiterSearch.recruiter_id == recruiter_id).order_by(
        RecruiterSearch.created_at.desc()
    )
    result = await db.execute(query)
    return result.scalars().all()


async def create_search(db: AsyncSession, search_data: RecruiterSearchCreate, recruiter_id: uuid.UUID) -> RecruiterSearch:
    """
    Create a new recruiter search
    :param db: Database session
    :param search_data: Search data
    :param recruiter_id: Recruiter user ID
    :return: Created search
    """
    search = RecruiterSearch(
        recruiter_id=recruiter_id,
        search_query=search_data.search_query,
        results=search_data.results
    )
    db.add(search)
    await db.commit()
    await db.refresh(search)
    
    return search


async def update_search_results(db: AsyncSession, search_id: uuid.UUID, results: Dict[str, Any]) -> Optional[RecruiterSearch]:
    """
    Update search results
    :param db: Database session
    :param search_id: Search ID
    :param results: Search results
    :return: Updated search if found, None otherwise
    """
    search = await get_search_by_id(db, search_id)
    if not search:
        return None
    
    search.results = results
    await db.commit()
    await db.refresh(search)
    
    return search


async def delete_search(db: AsyncSession, search_id: uuid.UUID) -> bool:
    """
    Delete a recruiter search
    :param db: Database session
    :param search_id: Search ID
    :return: True if deleted, False otherwise
    """
    search = await get_search_by_id(db, search_id)
    if not search:
        return False
    
    await db.delete(search)
    await db.commit()
    return True 