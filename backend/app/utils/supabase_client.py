from supabase import create_client, Client
from app.config import settings

def get_supabase_client() -> Client:
    """
    Return a Supabase client instance
    """
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_API_KEY)

def get_supabase_admin_client() -> Client:
    """
    Return a Supabase admin client instance with service role key
    """
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY) 