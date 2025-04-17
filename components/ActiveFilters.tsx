"use client"

import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

export function ActiveFilters({
  selectedSkills,
  toggleSkill,
  locationFilter,
  setLocationFilter,
  experienceFilter,
  setExperienceFilter,
  workAuthFilter,
  setWorkAuthFilter,
  availabilityFilter,
  setAvailabilityFilter,
}: {
  selectedSkills: string[]
  toggleSkill: (skill: string) => void
  locationFilter: string
  setLocationFilter: (value: string) => void
  experienceFilter: string
  setExperienceFilter: (value: string) => void
  workAuthFilter: string
  setWorkAuthFilter: (value: string) => void
  availabilityFilter: string
  setAvailabilityFilter: (value: string) => void
}) {
  const hasFilters =
    selectedSkills.length > 0 ||
    locationFilter ||
    experienceFilter ||
    (workAuthFilter && workAuthFilter !== "any") ||
    (availabilityFilter && availabilityFilter !== "any")

  const renderClearButton = (onClick: () => void) => (
    <button
      onClick={onClick}
      className="ml-1 rounded-full hover:bg-muted p-0.5"
      aria-label="Remove filter"
    >
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
  )

  return (
    <div className="flex items-start gap-2 flex-wrap">
      <div className="flex items-center gap-2 mb-1">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Active filters:</span>
      </div>

      {hasFilters ? (
        <div className="flex flex-wrap gap-1">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              {renderClearButton(() => toggleSkill(skill))}
            </Badge>
          ))}

          {locationFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Location: {locationFilter}
              {renderClearButton(() => setLocationFilter(""))}
            </Badge>
          )}

          {experienceFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Experience: {experienceFilter}+ years
              {renderClearButton(() => setExperienceFilter(""))}
            </Badge>
          )}

          {workAuthFilter && workAuthFilter !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Work Auth: {workAuthFilter}
              {renderClearButton(() => setWorkAuthFilter("any"))}
            </Badge>
          )}

          {availabilityFilter && availabilityFilter !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Availability: {availabilityFilter}
              {renderClearButton(() => setAvailabilityFilter("any"))}
            </Badge>
          )}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">None</span>
      )}
    </div>
  )
}
