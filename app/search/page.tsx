"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Users } from "lucide-react"
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
import engineersData from "@/data/engineers.json"

const PAGE_SIZE = 6

// Optimized Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  const len = shuffled.length
  for (let i = len - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [locationFilter, setLocationFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("")
  const [workAuthFilter, setWorkAuthFilter] = useState("any")
  const [availabilityFilter, setAvailabilityFilter] = useState("any")
  const [currentPage, setCurrentPage] = useState(1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [willingToRelocateFilter, setWillingToRelocateFilter] = useState("any")
  const [shuffledEngineers, setShuffledEngineers] = useState<Engineer[]>([])

  // Optimized shuffle on component mount
  useEffect(() => {
    const shuffled = shuffleArray(engineersData.engineers)
    setShuffledEngineers(shuffled)
  }, [])

  const commonSkills = [
    "React", "Node.js", "Python", "TypeScript", "JavaScript", "AWS", "Java",
    "C#", "Go", "Ruby", "PHP", "Docker", "Kubernetes", "MongoDB",
    "PostgreSQL", "UI/UX", "CSS"
  ]

  const normalize = (str: string) => str.toLowerCase()

  const handleSearch = useCallback(async () => {
    setLoading(true)
    try {
      const q = normalize(searchQuery)
      const filtered = shuffledEngineers.filter((eng) => {
        const matchesQuery = !q ||
          normalize(eng.name).includes(q) ||
          normalize(eng.title).includes(q) ||
          normalize(eng.bio).includes(q) ||
          eng.skills.some(skill => normalize(skill).includes(q)) ||
          eng.projects.some(project =>
            normalize(project.name).includes(q) ||
            normalize(project.description).includes(q) ||
            project.technologies.some(tech => normalize(tech).includes(q))
          )

        const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(skill => eng.skills.includes(skill))
        const matchesLocation = !locationFilter || normalize(eng.location).includes(normalize(locationFilter))
        const matchesExperience = !experienceFilter || eng.experience >= Number(experienceFilter)
        const matchesWorkAuth =
          workAuthFilter === "any" ||
          (Array.isArray(eng.workAuthorization) &&
            eng.workAuthorization.some(auth => normalize(auth) === normalize(workAuthFilter)))
        const matchesAvailability = availabilityFilter === "any" || (eng.availability?.types || []).includes(availabilityFilter)
        const matchesWillingToRelocate = willingToRelocateFilter === "any" || eng.willingToRelocate === willingToRelocateFilter

        return matchesQuery && matchesSkills && matchesLocation && matchesExperience && matchesWorkAuth && matchesAvailability && matchesWillingToRelocate
      })
      setResults(filtered)
      setCurrentPage(1)
    } catch (error) {
      console.error("Error searching engineers:", error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedSkills, locationFilter, experienceFilter, workAuthFilter, availabilityFilter, willingToRelocateFilter, shuffledEngineers])

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([])
    const q = normalize(query)
    const keywords = new Set<string>()

    for (const eng of shuffledEngineers) {
      if (normalize(eng.name).includes(q)) keywords.add(eng.name)
      if (normalize(eng.title).includes(q)) keywords.add(eng.title)
      if (normalize(eng.bio).includes(q)) keywords.add(eng.bio)
      eng.skills.forEach(skill => normalize(skill).includes(q) && keywords.add(skill))
      eng.projects.forEach(project => {
        if (normalize(project.name).includes(q)) keywords.add(project.name)
        if (normalize(project.description).includes(q)) keywords.add(project.description)
        project.technologies.forEach(tech => normalize(tech).includes(q) && keywords.add(tech))
      })
    }

    setSuggestions(Array.from(keywords).slice(0, 10))
  }

  const fetchLocationSuggestions = (input: string) => {
    const q = normalize(input)
    const matches = Array.from(new Set(
      shuffledEngineers
        .map(e => e.location)
        .filter(loc => normalize(loc).includes(q))
    ))
    setLocationSuggestions(matches.slice(0, 10))
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const paginatedResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const totalPages = Math.ceil(results.length / PAGE_SIZE)

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find Talent</h2>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {engineersData.engineers.length} engineers ready to join your team
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-[250px_1fr] gap-4">
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
                  setLocationFilter={value => {
                    setLocationFilter(value)
                    fetchLocationSuggestions(value)
                  }}
                  experienceFilter={experienceFilter}
                  setExperienceFilter={setExperienceFilter}
                  workAuthFilter={workAuthFilter}
                  setWorkAuthFilter={setWorkAuthFilter}
                  availabilityFilter={availabilityFilter}
                  setAvailabilityFilter={setAvailabilityFilter}
                  willingToRelocateFilter={willingToRelocateFilter}
                  setWillingToRelocateFilter={setWillingToRelocateFilter}
                  locationSuggestions={locationSuggestions}
                  fetchLocationSuggestions={fetchLocationSuggestions}
                  prefix="mobile"
                />
              </div>
            </SheetContent>
          </Sheet>

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
                setLocationFilter={value => {
                  setLocationFilter(value)
                  fetchLocationSuggestions(value)
                }}
                experienceFilter={experienceFilter}
                setExperienceFilter={setExperienceFilter}
                workAuthFilter={workAuthFilter}
                setWorkAuthFilter={setWorkAuthFilter}
                availabilityFilter={availabilityFilter}
                setAvailabilityFilter={setAvailabilityFilter}
                willingToRelocateFilter={willingToRelocateFilter}
                setWillingToRelocateFilter={setWillingToRelocateFilter}
                locationSuggestions={locationSuggestions}
                fetchLocationSuggestions={fetchLocationSuggestions}
                prefix="desktop"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Search by name, title, skill, or project..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  fetchSuggestions(e.target.value)
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {suggestions.length > 0 && (
                <div className="border rounded-md p-2 shadow-sm bg-background max-h-48 overflow-auto">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(s)
                        setSuggestions([])
                        handleSearch()
                      }}
                      className="block w-full text-left text-sm py-1 px-2 hover:bg-muted rounded"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ActiveFilters
              selectedSkills={selectedSkills}
              toggleSkill={toggleSkill}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              experienceFilter={experienceFilter}
              setExperienceFilter={setExperienceFilter}
              workAuthFilter={workAuthFilter}
              setWorkAuthFilter={setWorkAuthFilter}
              availabilityFilter={availabilityFilter}
              setAvailabilityFilter={setAvailabilityFilter}
              willingToRelocateFilter={willingToRelocateFilter}
              setWillingToRelocateFilter={setWillingToRelocateFilter}
            />

            {loading ? (
              <div className="flex justify-center p-8 md:p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedResults.map((engineer) => (
                    <EngineerCard key={engineer.id} engineer={engineer} />
                  ))}
                </div>
                <div className="flex justify-center gap-2 pt-4">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </>
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
