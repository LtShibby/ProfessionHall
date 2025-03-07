import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Mock GitHub data for demonstration
const mockGithubData = {
  user: {
    login: "johndoe",
    name: "John Doe",
    bio: "Full-stack developer passionate about web technologies",
    avatar_url: "https://github.com/johndoe.png",
    html_url: "https://github.com/johndoe",
    public_repos: 15,
    followers: 45,
    following: 32,
  },
  repos: [
    {
      name: "e-commerce-api",
      description: "A RESTful API for e-commerce platforms built with Node.js and Express",
      html_url: "https://github.com/johndoe/e-commerce-api",
      language: "JavaScript",
      stargazers_count: 12,
      forks_count: 5,
      topics: ["nodejs", "express", "mongodb", "rest-api"],
    },
    {
      name: "weather-dashboard",
      description: "A React-based weather dashboard with real-time data visualization",
      html_url: "https://github.com/johndoe/weather-dashboard",
      language: "JavaScript",
      stargazers_count: 8,
      forks_count: 2,
      topics: ["react", "javascript", "d3js", "weather-api"],
    },
    {
      name: "task-management-app",
      description: "A full-stack task management application with real-time updates",
      html_url: "https://github.com/johndoe/task-management-app",
      language: "TypeScript",
      stargazers_count: 15,
      forks_count: 3,
      topics: ["nextjs", "typescript", "prisma", "tailwindcss"],
    },
  ],
}

export async function GET(request: Request) {
  // In a real implementation, you would fetch data from GitHub API
  // using the user's OAuth token

  // For demonstration, we'll use mock data
  return NextResponse.json(mockGithubData)
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json()

    // In a real implementation, you would fetch actual GitHub data
    // For demonstration, we'll use mock data and AI to analyze it

    // Use AI to analyze GitHub data and extract skills
    const { text: skillsAnalysis } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze the following GitHub profile and repositories to extract skills and expertise levels:
      
      User: ${JSON.stringify(mockGithubData.user)}
      Repositories: ${JSON.stringify(mockGithubData.repos)}
      
      Format the response as a JSON object with the following structure:
      {
        "skills": [
          {"name": "Skill Name", "level": "Beginner/Intermediate/Advanced", "percentage": 65, "category": "Frontend/Backend/Database/DevOps"},
          ...
        ],
        "summary": "A brief professional summary of the developer's strengths and expertise",
        "topTechnologies": ["Tech1", "Tech2", "Tech3"]
      }`,
    })

    // Parse the AI-generated response
    const skillsData = JSON.parse(skillsAnalysis)

    return NextResponse.json(skillsData)
  } catch (error) {
    console.error("Error analyzing GitHub profile:", error)
    return NextResponse.json({ error: "Failed to analyze GitHub profile" }, { status: 500 })
  }
}

