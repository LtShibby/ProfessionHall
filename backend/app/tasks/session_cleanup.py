import asyncio
import logging
from datetime import datetime
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings
from app.models.user import Session, RevokedToken

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create async engine and session
engine = create_async_engine(
    str(settings.DATABASE_URL),
    echo=False,
    future=True,
)
async_session_factory = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


async def cleanup_expired_sessions():
    """
    Remove expired sessions and tokens from the database
    """
    try:
        async with async_session_factory() as db:
            # Delete expired sessions
            expired_sessions = delete(Session).where(
                Session.expires_at < datetime.utcnow()
            )
            result = await db.execute(expired_sessions)
            deleted_sessions = result.rowcount
            
            # Log result
            if deleted_sessions > 0:
                logger.info(f"Deleted {deleted_sessions} expired sessions")
            
            # Commit changes
            await db.commit()
    except Exception as e:
        logger.error(f"Error cleaning up expired sessions: {e}")


async def cleanup_task():
    """
    Run the cleanup task periodically
    """
    while True:
        await cleanup_expired_sessions()
        # Sleep for 1 hour
        await asyncio.sleep(3600)


def start_cleanup_task():
    """
    Start the cleanup task in a background task
    """
    asyncio.create_task(cleanup_task()) 