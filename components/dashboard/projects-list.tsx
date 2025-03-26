"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Presentation, Smartphone, FileCode, MoreVertical, Pencil, Trash, Copy } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

type ProjectType = "presentation" | "prototype" | "code"

interface Project {
  id: string
  name: string
  description: string
  type: ProjectType
  updatedAt: Date
  createdAt: Date
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Company Presentation",
    description: "Quarterly results presentation for stakeholders",
    type: "presentation",
    updatedAt: new Date(2023, 11, 15),
    createdAt: new Date(2023, 10, 5),
  },
  {
    id: "2",
    name: "Mobile App Prototype",
    description: "Interactive prototype for the new mobile app",
    type: "prototype",
    updatedAt: new Date(2023, 11, 10),
    createdAt: new Date(2023, 9, 20),
  },
  {
    id: "3",
    name: "Landing Page",
    description: "Code for the new product landing page",
    type: "code",
    updatedAt: new Date(2023, 11, 5),
    createdAt: new Date(2023, 10, 15),
  },
  {
    id: "4",
    name: "Educational Slides",
    description: "Interactive slides for the programming workshop",
    type: "presentation",
    updatedAt: new Date(2023, 10, 25),
    createdAt: new Date(2023, 9, 10),
  },
  {
    id: "5",
    name: "E-commerce Website",
    description: "Prototype for the new e-commerce website",
    type: "prototype",
    updatedAt: new Date(2023, 10, 20),
    createdAt: new Date(2023, 8, 15),
  },
  {
    id: "6",
    name: "API Integration",
    description: "Code for integrating with the payment API",
    type: "code",
    updatedAt: new Date(2023, 10, 15),
    createdAt: new Date(2023, 9, 5),
  },
]

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call
    setProjects(mockProjects)
  }, [])

  const getProjectIcon = (type: ProjectType) => {
    switch (type) {
      case "presentation":
        return <Presentation className="h-5 w-5" />
      case "prototype":
        return <Smartphone className="h-5 w-5" />
      case "code":
        return <FileCode className="h-5 w-5" />
    }
  }

  const getProjectUrl = (project: Project) => {
    switch (project.type) {
      case "presentation":
        return `/presentations/${project.id}`
      case "prototype":
        return `/prototypes/${project.id}`
      case "code":
        return `/editor/${project.id}`
    }
  }

  const handleDelete = (id: string) => {
    // In a real app, this would be an API call
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleDuplicate = (project: Project) => {
    // In a real app, this would be an API call
    const newProject = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProjects([newProject, ...projects])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-md">{getProjectIcon(project.type)}</div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(getProjectUrl(project))}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(project)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push(getProjectUrl(project))}>
              Open
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

