# ProfessionHall API

This is the backend API for the ProfessionHall platform, a resume-free hiring platform where engineers are hired based on their work, not their resumes.

## Features

- OAuth2 authentication with Google and GitHub
- Secure JWT-based session management
- PostgreSQL storage for users, sessions, and authentication tokens
- API endpoints for user management, projects, skills, and recruiter searches
- Integration with Supabase for PostgreSQL hosting

## Tech Stack

- **Backend:** FastAPI (Python)
- **Auth:** OAuth2 with Google & GitHub
- **Database:** PostgreSQL (hosted on Supabase)
- **Security:** JWT for authentication

## Setup Instructions

### Prerequisites

- Python 3.8+
- Supabase account with PostgreSQL database
- Google and GitHub OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/professionhall.git
   cd professionhall/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Set up the database in Supabase:
   - Create a new project in Supabase
   - Find your database connection string in the Supabase dashboard
   - Update the `DATABASE_URL` in your `.env` file
   - Run migrations to create the necessary tables:
     ```bash
     alembic upgrade head
     ```

### Supabase Setup

1. Create a Supabase project at [app.supabase.com](https://app.supabase.com)
2. Get your API keys from the Supabase dashboard:
   - Supabase URL (e.g., `https://your-project-id.supabase.co`)
   - Supabase API Key (anon key)
   - Supabase Service Role Key (for admin operations)
3. Update the `.env` file with these values

### OAuth Setup

1. **Google OAuth**:
   - Go to the [Google Developer Console](https://console.developers.google.com/)
   - Create a new project
   - Set up OAuth consent screen
   - Create OAuth credentials (Web application)
   - Add authorized redirect URIs: `http://localhost:8000/api/v1/auth/callback/google`
   - Add the client ID and secret to your `.env` file

2. **GitHub OAuth**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Add Homepage URL: `http://localhost:3000`
   - Add Authorization callback URL: `http://localhost:8000/api/v1/auth/callback/github`
   - Add the client ID and secret to your `.env` file

### Running the Application

```bash
python run.py
```

The API will be available at `http://localhost:8000`.

API documentation is available at `http://localhost:8000/docs`.

## API Endpoints

### Authentication

- `GET /api/v1/auth/google/login` - Google OAuth login
- `GET /api/v1/auth/github/login` - GitHub OAuth login
- `GET /api/v1/auth/callback/{provider}` - Handles OAuth callbacks
- `POST /api/v1/auth/logout` - Ends user session
- `POST /api/v1/auth/logout/all` - Ends all user sessions
- `GET /api/v1/auth/me` - Returns logged-in user profile

### Projects

- `POST /api/v1/projects/add` - Add a new project
- `GET /api/v1/projects/user/{user_id}` - Get all projects for a user
- `GET /api/v1/projects/me` - Get all projects for the current user
- `GET /api/v1/projects/{project_id}` - Get a project by ID
- `PUT /api/v1/projects/{project_id}` - Update a project
- `DELETE /api/v1/projects/delete/{project_id}` - Delete a project

### Skills

- `POST /api/v1/skills/add` - Add a new skill
- `GET /api/v1/skills/all` - Get all skills
- `GET /api/v1/skills/{skill_id}` - Get a skill by ID
- `GET /api/v1/skills/user/{user_id}` - Get all skills for a user
- `GET /api/v1/skills/me` - Get all skills for the current user

### Recruiter Searches

- `POST /api/v1/searches/add` - Add a new search
- `GET /api/v1/searches/recruiter/{recruiter_id}` - Get all searches for a recruiter
- `GET /api/v1/searches/me` - Get all searches for the current user
- `GET /api/v1/searches/{search_id}` - Get a search by ID
- `PUT /api/v1/searches/{search_id}/results` - Update search results
- `DELETE /api/v1/searches/{search_id}` - Delete a search

## License

MIT 