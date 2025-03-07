import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    repo_url = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="projects")
    skills = relationship("ProjectSkill", back_populates="project", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Project {self.title}>"


class Skill(Base):
    __tablename__ = "skills"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True, index=True)
    category = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    project_skills = relationship("ProjectSkill", back_populates="skill")
    
    def __repr__(self):
        return f"<Skill {self.name}>"


class ProjectSkill(Base):
    __tablename__ = "project_skills"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(UUID(as_uuid=True), ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)
    confidence_score = Column(Integer, nullable=True)  # Optional confidence score (0-100)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    project = relationship("Project", back_populates="skills")
    skill = relationship("Skill", back_populates="project_skills")
    
    def __repr__(self):
        return f"<ProjectSkill {self.project_id}:{self.skill_id}>"


class RecruiterSearch(Base):
    __tablename__ = "recruiter_searches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recruiter_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    search_query = Column(JSONB, nullable=False)  # Stores search parameters as JSON
    results = Column(JSONB, nullable=True)  # Stores search results as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    recruiter = relationship("User", foreign_keys=[recruiter_id])
    
    def __repr__(self):
        return f"<RecruiterSearch {self.id}>" 