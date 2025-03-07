from typing import List, Optional
from pydantic import BaseModel, HttpUrl
from datetime import datetime
import uuid


class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class Skill(SkillBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        orm_mode = True


class ProjectSkillBase(BaseModel):
    skill_id: uuid.UUID
    confidence_score: Optional[int] = None


class ProjectSkillCreate(ProjectSkillBase):
    pass


class ProjectSkill(ProjectSkillBase):
    id: uuid.UUID
    project_id: uuid.UUID
    created_at: datetime
    skill: Skill

    class Config:
        orm_mode = True


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    repo_url: Optional[str] = None
    live_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    is_published: bool = True


class ProjectCreate(ProjectBase):
    skills: Optional[List[ProjectSkillCreate]] = []


class Project(ProjectBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    skills: List[ProjectSkill] = []

    class Config:
        orm_mode = True


class RecruiterSearchBase(BaseModel):
    search_query: dict
    results: Optional[dict] = None


class RecruiterSearchCreate(RecruiterSearchBase):
    pass


class RecruiterSearch(RecruiterSearchBase):
    id: uuid.UUID
    recruiter_id: uuid.UUID
    created_at: datetime

    class Config:
        orm_mode = True 