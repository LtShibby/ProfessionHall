// components/ActiveFilters.tsx
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
}: {
  selectedSkills: string[]
  toggleSkill: (skill: string) => void
  locationFilter: string
  setLocationFilter: (value: string) => void
  experienceFilter: string
  setExperienceFilter: (value: string) => void
}) {
  const hasFilters = selectedSkills.length > 0 || locationFilter || experienceFilter

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {hasFilters ? (
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
  )
}