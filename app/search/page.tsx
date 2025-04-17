"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavBar } from "@/components/navbar"
import { EngineerCard, Engineer } from "@/components/EngineerCard"
import { FilterSection } from "@/components/FilterSection"
import { ActiveFilters } from "@/components/ActiveFilters"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [locationFilter, setLocationFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")

  const commonSkills = [
    "React", "Node.js", "Python", "TypeScript", "JavaScript", "AWS", "Java",
    "C#", "Go", "Ruby", "PHP", "Docker", "Kubernetes", "MongoDB",
    "PostgreSQL", "UI/UX", "CSS"
  ]

  const handleSearch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("q", searchQuery)
      if (selectedSkills.length > 0) params.append("skills", selectedSkills.join(","))
      if (locationFilter) params.append("location", locationFilter)
      if (experienceFilter) params.append("experience", experienceFilter)

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
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  useEffect(() => {
    handleSearch()
  }, [selectedSkills, locationFilter, experienceFilter])

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find Talent</h2>
        <div className="flex flex-col md:grid md:grid-cols-[250px_1fr] gap-4">
          {/* Mobile Filters */}
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
                <FilterSection
                  skills={commonSkills}
                  selectedSkills={selectedSkills}
                  toggleSkill={toggleSkill}
                  locationFilter={locationFilter}
                  setLocationFilter={setLocationFilter}
                  experienceFilter={experienceFilter}
                  setExperienceFilter={setExperienceFilter}
                  prefix="mobile"
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filter Panel */}
          <Card className="hidden md:block h-fit">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FilterSection
                skills={commonSkills}
                selectedSkills={selectedSkills}
                toggleSkill={toggleSkill}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                experienceFilter={experienceFilter}
                setExperienceFilter={setExperienceFilter}
                prefix="desktop"
              />
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by name, title, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <ActiveFilters
              selectedSkills={selectedSkills}
              toggleSkill={toggleSkill}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              experienceFilter={experienceFilter}
              setExperienceFilter={setExperienceFilter}
            />

            {loading ? (
              <div className="flex justify-center p-8 md:p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((engineer) => (
                  <EngineerCard key={engineer.id} engineer={engineer} />
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
