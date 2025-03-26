"use client"

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import Link from "next/link"
import { Palette, Search, Presentation, Layers, Smartphone, Monitor, Car, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for templates
const mockTemplates = [
  {
    id: "1",
    name: "Business Presentation",
    description: "Professional business presentation template",
    type: "presentation",
    category: "Business",
    tags: ["Corporate", "Professional"],
  },
  {
    id: "2",
    name: "Creative Portfolio",
    description: "Creative portfolio presentation template",
    type: "presentation",
    category: "Creative",
    tags: ["Portfolio", "Design"],
  },
  {
    id: "3",
    name: "E-commerce Mobile App",
    description: "Mobile e-commerce app prototype template",
    type: "prototype",
    device: "mobile",
    category: "E-commerce",
    tags: ["Shopping", "Mobile"],
  },
  {
    id: "4",
    name: "Dashboard UI Kit",
    description: "Admin dashboard UI kit for web applications",
    type: "prototype",
    device: "desktop",
    category: "Dashboard",
    tags: ["Admin", "Analytics"],
  },
  {
    id: "5",
    name: "Car Infotainment UI",
    description: "Automotive infotainment system UI template",
    type: "prototype",
    device: "automotive",
    category: "Automotive",
    tags: ["HMI", "Infotainment"],
  },
  {
    id: "6",
    name: "Pitch Deck",
    description: "Startup pitch deck presentation template",
    type: "presentation",
    category: "Business",
    tags: ["Startup", "Pitch"],
  },
  {
    id: "7",
    name: "Social Media App",
    description: "Social media mobile app prototype template",
    type: "prototype",
    device: "mobile",
    category: "Social",
    tags: ["Social Media", "Mobile"],
  },
  {
    id: "8",
    name: "Educational Slides",
    description: "Educational presentation template for courses",
    type: "presentation",
    category: "Education",
    tags: ["Learning", "Course"],
  },
]

export function TemplatesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredTemplates = mockTemplates.filter(
    (template) =>
      (activeTab === "all" ||
        (activeTab === "presentations" && template.type === "presentation") ||
        (activeTab === "prototypes" && template.type === "prototype")) &&
      (!activeCategory || template.category === activeCategory) &&
      (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  // Get unique categories
  const categories = Array.from(new Set(mockTemplates.map((template) => template.category)))

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">Browse and use pre-built templates for presentations and prototypes.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="presentations" className="gap-1">
                <Presentation className="h-4 w-4" />
                <span>Presentations</span>
              </TabsTrigger>
              <TabsTrigger value="prototypes" className="gap-1">
                <Layers className="h-4 w-4" />
                <span>Prototypes</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveCategory(null)}>All Categories</DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setActiveCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {activeCategory && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtered by:</span>
            <Badge variant="secondary" className="gap-1">
              {activeCategory}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 -mr-1"
                onClick={() => setActiveCategory(null)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {template.type === "presentation" ? (
                      <Presentation className="h-5 w-5 text-primary" />
                    ) : template.device === "mobile" ? (
                      <Smartphone className="h-5 w-5 text-primary" />
                    ) : template.device === "desktop" ? (
                      <Monitor className="h-5 w-5 text-primary" />
                    ) : (
                      <Car className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{template.type === "presentation" ? "Presentation" : "Prototype"}</Badge>
                  {template.device && (
                    <Badge variant="outline">
                      {template.device.charAt(0).toUpperCase() + template.device.slice(1)}
                    </Badge>
                  )}
                  <Badge>{template.category}</Badge>
                  {template.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Template</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/editor/${template.type}/new?template=${template.id}`}>Use Template</Link>
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

