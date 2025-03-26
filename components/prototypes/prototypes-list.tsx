"use client"

import { useState } from "react"
import Link from "next/link"
import { Layers, Clock, Plus, Search, MoreHorizontal, Smartphone, Monitor, Car, Sparkles } from "lucide-react"
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
import { AIGenerationModal } from "@/components/ai/ai-generation-modal"

// Mock data for prototypes
const mockPrototypes = [
  {
    id: "1",
    name: "Mobile App Prototype",
    description: "E-commerce app prototype with checkout flow",
    lastUpdated: "Yesterday",
    device: "mobile",
    screens: 8,
    tags: ["E-commerce", "Mobile"],
  },
  {
    id: "2",
    name: "Dashboard UI Prototype",
    description: "Admin dashboard interface prototype",
    lastUpdated: "1 week ago",
    device: "desktop",
    screens: 6,
    tags: ["Dashboard", "Admin"],
  },
  {
    id: "3",
    name: "Car Infotainment System",
    description: "Automotive HMI prototype for infotainment system",
    lastUpdated: "2 weeks ago",
    device: "automotive",
    screens: 10,
    tags: ["Automotive", "HMI"],
  },
  {
    id: "4",
    name: "Fitness App",
    description: "Mobile fitness tracking application",
    lastUpdated: "3 weeks ago",
    device: "mobile",
    screens: 12,
    tags: ["Fitness", "Health"],
  },
  {
    id: "5",
    name: "Smart Home Control",
    description: "Desktop application for smart home control",
    lastUpdated: "1 month ago",
    device: "desktop",
    screens: 8,
    tags: ["IoT", "Smart Home"],
  },
]

export function PrototypesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAIModal, setShowAIModal] = useState(false)

  const filteredPrototypes = mockPrototypes.filter(
    (prototype) =>
      prototype.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prototype.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prototype.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAIGenerate = (result: any) => {
    console.log("AI Generated Result:", result)
    // Handle the generated prototype
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Prototypes</h1>
        <p className="text-muted-foreground">Create and manage your interactive prototypes for multiple devices.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search prototypes..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" onClick={() => setShowAIModal(true)}>
              <Sparkles className="h-4 w-4" />
              <span>AI Generate</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New Prototype</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
          {filteredPrototypes.map((prototype) => (
            <Card key={prototype.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{prototype.name}</CardTitle>
                    <CardDescription>{prototype.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/editor/prototype/${prototype.id}`}>Edit</Link>
                      </DropdownMenuItem>
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
                    <Layers className="h-3 w-3" />
                    <span>{prototype.screens} Screens</span>
                  </Badge>
                  <Badge variant="outline">
                    {prototype.device === "mobile" && <Smartphone className="mr-1 h-3 w-3" />}
                    {prototype.device === "desktop" && <Monitor className="mr-1 h-3 w-3" />}
                    {prototype.device === "automotive" && <Car className="mr-1 h-3 w-3" />}
                    {prototype.device.charAt(0).toUpperCase() + prototype.device.slice(1)}
                  </Badge>
                  {prototype.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Updated {prototype.lastUpdated}</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/editor/prototype/${prototype.id}`}>Open</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <AIGenerationModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} onGenerate={handleAIGenerate} />
    </div>
  )
}

