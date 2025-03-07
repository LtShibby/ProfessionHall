"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, Code2 } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

type Engineer = {
  id: string
  name: string
  title: string
  location: string
  image: string
  skills: { name: string; level: string; percentage: number }[]
  projects: {
    name: string
    description: string
    technologies: string[]
    url: string
  }[]
  summary: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const commonSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "Go",
    "Ruby",
    "PHP",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
  ]

  const handleSearch = async () => {
    setLoading(true)
    try {
      const skillsParam = selectedSkills.length > 0 ? `&skills=${selectedSkills.join(",")}` : ""
      const response = await fetch(`/api/search?q=${searchQuery}${skillsParam}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error searching engineers:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  useEffect(() => {
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills])

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Find Professionals</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-[250px_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Skills</h3>
                <div className="space-y-2">
                  {commonSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, skill, or project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button onClick={() => toggleSkill(skill)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">None</span>
              )}
            </div>
            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.map((engineer) => (
                  <Card key={engineer.id}>
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={engineer.image || "/placeholder.svg"}
                          alt={engineer.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="grid gap-1">
                        <CardTitle>{engineer.name}</CardTitle>
                        <CardDescription>{engineer.title}</CardDescription>
                        <div className="text-xs text-muted-foreground">{engineer.location}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="text-sm">{engineer.summary}</div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Top Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {engineer.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill.name} variant="secondary">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Featured Projects</h4>
                        <div className="space-y-2">
                          {engineer.projects.slice(0, 2).map((project) => (
                            <div key={project.name} className="text-sm">
                              <div className="font-medium">{project.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2">{project.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/profile/${engineer.id}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <Search className="h-8 w-8 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No professionals found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

