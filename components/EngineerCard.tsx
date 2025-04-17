"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

type Project = {
  name: string
  description: string
  technologies: string[]
}

export type Engineer = {
  id: number
  name: string
  title: string
  skills: string[]
  experience: number
  location: string
  availability: string
  bio: string
  projects: Project[]
}

export function EngineerCard({ engineer }: { engineer: Engineer }) {
  return (
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
  )
}
