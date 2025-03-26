"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Presentation,
  Layers,
  Clock,
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  Smartphone,
  Monitor,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for recent projects
const mockProjects = [
  {
    id: "1",
    name: "Product Launch Presentation",
    description: "Q2 product launch presentation for marketing team",
    lastUpdated: "2 hours ago",
    type: "presentation",
    slides: 12,
  },
  {
    id: "2",
    name: "Mobile App Prototype",
    description: "E-commerce app prototype with checkout flow",
    lastUpdated: "Yesterday",
    type: "prototype",
    device: "mobile",
    screens: 8,
  },
  {
    id: "3",
    name: "Company Overview",
    description: "Company overview presentation for investors",
    lastUpdated: "3 days ago",
    type: "presentation",
    slides: 24,
  },
  {
    id: "4",
    name: "Dashboard UI Prototype",
    description: "Admin dashboard interface prototype",
    lastUpdated: "1 week ago",
    type: "prototype",
    device: "desktop",
    screens: 6,
  },
  {
    id: "5",
    name: "Car Infotainment System",
    description: "Automotive HMI prototype for infotainment system",
    lastUpdated: "2 weeks ago",
    type: "prototype",
    device: "automotive",
    screens: 10,
  },
]

export function DashboardContent() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = mockProjects.filter(
    (project) =>
      (activeTab === "all" ||
        (activeTab === "presentations" && project.type === "presentation") ||
        (activeTab === "prototypes" && project.type === "prototype")) &&
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Create, edit, and manage your presentations and prototypes.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="presentations">Presentations</TabsTrigger>
              <TabsTrigger value="prototypes">Prototypes</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/editor/presentation/new">
                    <FileText className="mr-2 h-4 w-4" />
                    New Presentation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/editor/prototype/new?device=mobile">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile Prototype
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/editor/prototype/new?device=desktop">
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop Prototype
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/editor/prototype/new?device=automotive">
                    <Car className="mr-2 h-4 w-4" />
                    Automotive HMI
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    {project.type === "presentation" ? (
                      <>
                        <Presentation className="h-3 w-3" />
                        Presentation
                      </>
                    ) : (
                      <>
                        <Layers className="h-3 w-3" />
                        Prototype
                      </>
                    )}
                  </Badge>
                  {project.type === "presentation" ? (
                    <Badge variant="outline">{project.slides} Slides</Badge>
                  ) : (
                    <>
                      <Badge variant="outline">
                        {project.device === "mobile" && <Smartphone className="mr-1 h-3 w-3" />}
                        {project.device === "desktop" && <Monitor className="mr-1 h-3 w-3" />}
                        {project.device === "automotive" && <Car className="mr-1 h-3 w-3" />}
                        {project.device?.charAt(0).toUpperCase() + project.device?.slice(1)}
                      </Badge>
                      <Badge variant="outline">{project.screens} Screens</Badge>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Updated {project.lastUpdated}</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/editor/${project.type}/${project.id}`}>Open</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

