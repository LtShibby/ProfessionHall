"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"
import clsx from "clsx"

export type Project = {
  name: string
  description: string
  technologies: string[]
  link?: string
}

export type Engineer = {
  id: string
  name: string
  title: string
  skills: string[]
  experience: number
  location: string
  availability?: {
    types: string[]
    startDate?: string
    note?: string
  }
  bio: string
  projects: Project[]
  links?: {
    github?: string
    linkedin?: string
    resume?: string
    portfolio?: string
  }
  image?: string
  workAuthorization?: string
}

const workAuthStyles: Record<string, { header: string; badge: string }> = {
  "U.S. Citizen": {
    header: "border-t-4 border-green-300",
    badge: "bg-green-100 text-green-800",
  },
  "U.S. Green Card Holder (Permanent Resident)": {
    header: "border-t-4 border-emerald-300",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "H-1B Visa Holder": {
    header: "border-t-4 border-yellow-300",
    badge: "bg-yellow-100 text-yellow-800",
  },
  "F-1 OPT / CPT": {
    header: "border-t-4 border-blue-300",
    badge: "bg-blue-100 text-blue-800",
  },
  "TN Visa": {
    header: "border-t-4 border-indigo-300",
    badge: "bg-indigo-100 text-indigo-800",
  },
  "Singapore Citizen": {
    header: "border-t-4 border-red-300",
    badge: "bg-red-100 text-red-800",
  },
  "Authorized to work in Singapore": {
    header: "border-t-4 border-pink-300",
    badge: "bg-pink-100 text-pink-800",
  },
  "Authorized to work in the U.S.": {
    header: "border-t-4 border-gray-300",
    badge: "bg-gray-100 text-gray-800",
  },
  Other: {
    header: "border-t-4 border-slate-300",
    badge: "bg-slate-100 text-slate-800",
  },
}

export function EngineerCard({ engineer }: { engineer: Engineer }) {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})

  const toggleProjectDescription = (projectName: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectName]: !prev[projectName],
    }))
  }

  const skillLimit = 12
  const visibleSkills = showAllSkills ? engineer.skills : engineer.skills.slice(0, skillLimit)

  const workAuth = engineer.workAuthorization || "Other"
  const headerColor = workAuthStyles[workAuth]?.header
  const badgeColor = clsx("text-xs", workAuthStyles[workAuth]?.badge)

  return (
    <Card key={engineer.id} className={clsx("flex flex-col", headerColor)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          <Code2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="w-full space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <CardTitle className="text-lg">{engineer.name}</CardTitle>
              <CardDescription>{engineer.title}</CardDescription>
              <div className="text-xs text-muted-foreground">
                {engineer.location} • {engineer.experience}+ years
              </div>
              {engineer.availability?.types && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {engineer.availability.types.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className={clsx("text-xs", {
                        "bg-green-100 text-green-800": type === "Full Time",
                        "bg-yellow-100 text-yellow-800": type === "Contract",
                        "bg-blue-100 text-blue-800": type === "Part Time",
                      })}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 flex-1">
        {engineer.workAuthorization && (
          <div>
          <h4 className="text-sm font-medium mb-1">Work Authorization</h4>
          <Badge className={badgeColor}>{engineer.workAuthorization}</Badge>
        </div>
        )}

        <div className="text-sm text-muted-foreground">
          {showFullBio || engineer.bio.length < 200
            ? engineer.bio
            : `${engineer.bio.slice(0, 200)}...`}
          {engineer.bio.length > 200 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-xs ml-1 text-blue-600 hover:underline"
            >
              {showFullBio ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {visibleSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {engineer.skills.length > skillLimit && (
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-blue-600 px-2 py-0.5 h-auto"
                onClick={() => setShowAllSkills(!showAllSkills)}
              >
                {showAllSkills
                  ? "Show less"
                  : `+${engineer.skills.length - skillLimit} more`}
              </Button>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Projects</h4>
          <div className="space-y-2">
            {engineer.projects.map((project) => (
              <div key={project.name} className="text-sm">
                <div className="font-medium line-clamp-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {expandedProjects[project.name] || project.description.length < 120
                    ? project.description
                    : `${project.description.slice(0, 120)}...`}
                  {project.description.length > 120 && (
                    <button
                      onClick={() => toggleProjectDescription(project.name)}
                      className="text-xs ml-1 text-blue-600 hover:underline"
                    >
                      {expandedProjects[project.name] ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
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
          <Link href={`mailto:matt@wozwize.com?subject=Interest in ${engineer.name}, ID: ${engineer.id}`}>
            Contact to Hire
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
