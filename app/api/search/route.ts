import { NextResponse } from "next/server"

// Mock data for demonstration
const mockProfessionals = [
  {
    id: "1",
    name: "John Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    image: "/placeholder.svg",
    skills: [
      { name: "JavaScript", level: "Advanced", percentage: 90 },
      { name: "React", level: "Advanced", percentage: 85 },
      { name: "Node.js", level: "Advanced", percentage: 80 },
      { name: "TypeScript", level: "Intermediate", percentage: 70 },
      { name: "MongoDB", level: "Intermediate", percentage: 65 },
    ],
    projects: [
      {
        name: "E-commerce API",
        description: "A RESTful API for e-commerce platforms built with Node.js and Express",
        technologies: ["Node.js", "Express", "MongoDB"],
        url: "https://github.com/johndoe/e-commerce-api",
      },
      {
        name: "Weather Dashboard",
        description: "A React-based weather dashboard with real-time data visualization",
        technologies: ["React", "JavaScript", "D3.js"],
        url: "https://github.com/johndoe/weather-dashboard",
      },
    ],
    summary:
      "Experienced full-stack developer with a strong focus on JavaScript technologies. Specializes in building scalable web applications with React and Node.js.",
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    image: "/placeholder.svg",
    skills: [
      { name: "JavaScript", level: "Advanced", percentage: 95 },
      { name: "React", level: "Advanced", percentage: 90 },
      { name: "TypeScript", level: "Advanced", percentage: 85 },
      { name: "CSS/SASS", level: "Advanced", percentage: 90 },
      { name: "Next.js", level: "Intermediate", percentage: 75 },
    ],
    projects: [
      {
        name: "E-learning Platform",
        description: "A modern e-learning platform with interactive courses and quizzes",
        technologies: ["React", "TypeScript", "Next.js"],
        url: "https://github.com/janesmith/e-learning-platform",
      },
      {
        name: "Design System",
        description: "A comprehensive design system with reusable components",
        technologies: ["React", "TypeScript", "Storybook"],
        url: "https://github.com/janesmith/design-system",
      },
    ],
    summary:
      "Frontend specialist with a passion for creating beautiful, responsive, and accessible user interfaces. Strong expertise in React and modern JavaScript.",
  },
  {
    id: "3",
    name: "Alex Johnson",
    title: "Backend Developer",
    location: "Austin, TX",
    image: "/placeholder.svg",
    skills: [
      { name: "Python", level: "Advanced", percentage: 95 },
      { name: "Django", level: "Advanced", percentage: 90 },
      { name: "PostgreSQL", level: "Advanced", percentage: 85 },
      { name: "Docker", level: "Intermediate", percentage: 75 },
      { name: "AWS", level: "Intermediate", percentage: 70 },
    ],
    projects: [
      {
        name: "Content Management API",
        description: "A headless CMS API built with Django and PostgreSQL",
        technologies: ["Python", "Django", "PostgreSQL"],
        url: "https://github.com/alexjohnson/content-management-api",
      },
      {
        name: "Authentication Service",
        description: "A microservice for user authentication and authorization",
        technologies: ["Python", "FastAPI", "JWT"],
        url: "https://github.com/alexjohnson/auth-service",
      },
    ],
    summary:
      "Backend developer specializing in Python and Django. Experienced in building scalable APIs and microservices with a focus on performance and security.",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const skills = searchParams.get("skills")?.split(",") || []
    
    // In a real app, this would be a database query
    let results = [...mockProfessionals]

    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (professional) =>
          professional.name.toLowerCase().includes(lowerQuery) ||
          professional.title.toLowerCase().includes(lowerQuery) ||
          professional.summary.toLowerCase().includes(lowerQuery) ||
          professional.skills.some((skill) => skill.name.toLowerCase().includes(lowerQuery)) ||
          professional.projects.some(
            (project) =>
              project.name.toLowerCase().includes(lowerQuery) ||
              project.description.toLowerCase().includes(lowerQuery) ||
              project.technologies.some((tech) => tech.toLowerCase().includes(lowerQuery)),
          ),
      )
    }

    if (skills.length > 0) {
      results = results.filter((professional) =>
        skills.every((skill: string) => professional.skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())),
      )
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching professionals:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

