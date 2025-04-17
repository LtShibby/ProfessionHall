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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavBar } from "@/components/navbar"

type Engineer = {
  id: number
  name: string
  title: string
  skills: string[]
  experience: number
  location: string
  availability: string
  bio: string
  projects: {
    name: string
    description: string
    technologies: string[]
  }[]
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [locationFilter, setLocationFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")

  const commonSkills = [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "JavaScript",
    "AWS",
    "Java",
    "C#",
    "Go",
    "Ruby",
    "PHP",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "UI/UX",
    "CSS"
  ]

  const handleSearch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('q', searchQuery)
      if (selectedSkills.length > 0) params.append('skills', selectedSkills.join(','))
      if (locationFilter) params.append('location', locationFilter)
      if (experienceFilter) params.append('experience', experienceFilter)

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()
      setResults(data.results)
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
  }, [selectedSkills, locationFilter, experienceFilter])

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find Talent</h2>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-[250px_1fr] gap-4">
          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Skills</h3>
                  <div className="space-y-2">
                    {commonSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <Label htmlFor={`mobile-skill-${skill}`}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Location</h3>
                  <Input
                    placeholder="Filter by location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Minimum Experience (years)</h3>
                  <Input
                    type="number"
                    placeholder="Years of experience"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filter Card */}
          <Card className="hidden md:block h-fit">
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
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location</h3>
                <Input
                  placeholder="Filter by location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Minimum Experience (years)</h3>
                <Input
                  type="number"
                  placeholder="Years of experience"
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, title, or bio..."
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
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSkills.length > 0 || locationFilter || experienceFilter ? (
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
                  {locationFilter && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Location: {locationFilter}
                      <button onClick={() => setLocationFilter("")} className="ml-1 rounded-full hover:bg-muted p-0.5">
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
                  )}
                  {experienceFilter && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Experience: {experienceFilter}+ years
                      <button onClick={() => setExperienceFilter("")} className="ml-1 rounded-full hover:bg-muted p-0.5">
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
                  )}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">None</span>
              )}
            </div>
            {loading ? (
              <div className="flex justify-center p-8 md:p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((engineer) => (
                  <Card key={engineer.id} className="flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <Code2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="grid gap-1">
                        <CardTitle className="line-clamp-1">{engineer.name}</CardTitle>
                        <CardDescription className="line-clamp-1">{engineer.title}</CardDescription>
                        <div className="text-xs text-muted-foreground">
                          {engineer.location} • {engineer.experience}+ years
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-2 flex-1">
                      <div className="text-sm line-clamp-2">{engineer.bio}</div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {engineer.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Projects</h4>
                        <div className="space-y-2">
                          {engineer.projects.map((project) => (
                            <div key={project.name} className="text-sm">
                              <div className="font-medium line-clamp-1">{project.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2">{project.description}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`mailto:matt@wozwize.com?subject=Interest in ${engineer.name}`}>
                          Contact to Hire
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

