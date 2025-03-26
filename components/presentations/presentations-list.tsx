"use client"

import { useState } from "react"
import Link from "next/link"
import { Presentation, Clock, Plus, Search, MoreHorizontal, Sparkles } from "lucide-react"
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

// Mock data for presentations
const mockPresentations = [
  {
    id: "1",
    name: "Product Launch Presentation",
    description: "Q2 product launch presentation for marketing team",
    lastUpdated: "2 hours ago",
    slides: 12,
    tags: ["Marketing", "Product"],
  },
  {
    id: "2",
    name: "Company Overview",
    description: "Company overview presentation for investors",
    lastUpdated: "3 days ago",
    slides: 24,
    tags: ["Corporate", "Investors"],
  },
  {
    id: "3",
    name: "Quarterly Results",
    description: "Q1 2023 financial results presentation",
    lastUpdated: "1 week ago",
    slides: 18,
    tags: ["Finance", "Quarterly"],
  },
  {
    id: "4",
    name: "Team Meeting",
    description: "Weekly team meeting presentation",
    lastUpdated: "2 weeks ago",
    slides: 8,
    tags: ["Internal", "Team"],
  },
  {
    id: "5",
    name: "Project Proposal",
    description: "New project proposal for client",
    lastUpdated: "3 weeks ago",
    slides: 15,
    tags: ["Client", "Proposal"],
  },
]

export function PresentationsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAIModal, setShowAIModal] = useState(false)

  const filteredPresentations = mockPresentations.filter(
    (presentation) =>
      presentation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presentation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presentation.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAIGenerate = (result: any) => {
    console.log("AI Generated Result:", result)
    // Handle the generated presentation
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Presentations</h1>
        <p className="text-muted-foreground">Create and manage your interactive presentations.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search presentations..."
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
            <Button className="gap-1" asChild>
              <Link href="/editor/presentation/new">
                <Plus className="h-4 w-4" />
                <span>New Presentation</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPresentations.map((presentation) => (
            <Card key={presentation.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{presentation.name}</CardTitle>
                    <CardDescription>{presentation.description}</CardDescription>
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
                        <Link href={`/editor/presentation/${presentation.id}`}>Edit</Link>
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
                    <Presentation className="h-3 w-3" />
                    <span>{presentation.slides} Slides</span>
                  </Badge>
                  {presentation.tags.map((tag, i) => (
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
                    <span>Updated {presentation.lastUpdated}</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/editor/presentation/${presentation.id}`}>Open</Link>
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

