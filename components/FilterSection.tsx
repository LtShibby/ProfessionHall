// components/FilterSection.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function FilterSection({
  skills,
  selectedSkills,
  toggleSkill,
  locationFilter,
  setLocationFilter,
  experienceFilter,
  setExperienceFilter,
  prefix,
}: {
  skills: string[]
  selectedSkills: string[]
  toggleSkill: (skill: string) => void
  locationFilter: string
  setLocationFilter: (value: string) => void
  experienceFilter: string
  setExperienceFilter: (value: string) => void
  prefix: string
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Skills</h3>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`${prefix}-skill-${skill}`}
                checked={selectedSkills.includes(skill)}
                onCheckedChange={() => toggleSkill(skill)}
              />
              <Label htmlFor={`${prefix}-skill-${skill}`}>{skill}</Label>
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
  )
}