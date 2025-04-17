"use client"

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

type Project = {
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

const workAuthColors: Record<string, string> = {
  "US Citizen": "bg-green-100 text-green-800",
  "Green Card": "bg-blue-100 text-blue-800",
  H1B: "bg-yellow-100 text-yellow-800",
  OPT: "bg-pink-100 text-pink-800",
  CPT: "bg-orange-100 text-orange-800",
  Other: "bg-gray-100 text-gray-800",
  Any: "bg-slate-100 text-slate-800",
}

export function EngineerCard({ engineer }: { engineer: Engineer }) {
  return (
    <Card key={engineer.id} className="flex flex-col relative">
      {/* Color pill strip for work authorization only */}
      {engineer.workAuthorization && (
        <div
          className={clsx(
            "absolute top-0 left-0 w-full h-1 rounded-t-md",
            workAuthColors[engineer.workAuthorization] || "bg-purple-400"
          )}
        />
      )}

      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:gap-4 mt-2">
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
            </div>
            {engineer.availability?.types && (
              <div className="flex flex-wrap gap-1 justify-end">
                {engineer.availability.types.map((type) => (
                  <Badge
                    key={type}
                    variant="outline"
                    className={clsx("text-xs", {
                      "bg-green-100 text-green-800": type === "Full-time",
                      "bg-yellow-100 text-yellow-800": type === "Contract",
                      "bg-blue-100 text-blue-800": type === "Part-time",
                    })}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 flex-1">
        <div className="text-sm line-clamp-3 text-muted-foreground">{engineer.bio}</div>

        {engineer.workAuthorization && (
          <div>
            <h4 className="text-sm font-medium mb-1">Work Authorization</h4>
            <Badge
              variant="outline"
              className={clsx(
                "text-xs",
                workAuthColors[engineer.workAuthorization] || "bg-purple-100 text-purple-800"
              )}
            >
              {engineer.workAuthorization}
            </Badge>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {engineer.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
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
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {project.description}
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