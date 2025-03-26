"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  ChevronDown,
  ChevronRight,
  FileCode,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Plus,
  RefreshCw,
} from "lucide-react"

interface GitPanelProps {
  language?: "en" | "bn"
}

export function GitPanel({ language = "en" }: GitPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    changes: true,
    branches: false,
    remotes: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-10 items-center justify-between border-b px-4">
        <span className="text-xs font-medium">{language === "en" ? "SOURCE CONTROL" : "সোর্স কন্ট্রোল"}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {/* Changes Section */}
          <div>
            <Button
              variant="ghost"
              className="flex h-8 w-full items-center justify-between rounded-none px-2"
              onClick={() => toggleSection("changes")}
            >
              <div className="flex items-center gap-2">
                {expandedSections.changes ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{language === "en" ? "Changes" : "পরিবর্তন"}</span>
              </div>
              <Badge variant="outline" className="rounded-sm px-1 text-xs">
                3
              </Badge>
            </Button>

            {expandedSections.changes && (
              <div className="ml-6 mt-1 space-y-1">
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <FileCode className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">index.js</span>
                </Button>
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <FileCode className="h-4 w-4 text-green-500" />
                  <span className="text-sm">styles.css</span>
                </Button>
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <FileCode className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">package.json</span>
                </Button>
              </div>
            )}
          </div>

          {/* Branches Section */}
          <div>
            <Button
              variant="ghost"
              className="flex h-8 w-full items-center justify-between rounded-none px-2"
              onClick={() => toggleSection("branches")}
            >
              <div className="flex items-center gap-2">
                {expandedSections.branches ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{language === "en" ? "Branches" : "ব্রাঞ্চ"}</span>
              </div>
            </Button>

            {expandedSections.branches && (
              <div className="ml-6 mt-1 space-y-1">
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span className="text-sm">main</span>
                  <Check className="ml-auto h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-sm">develop</span>
                </Button>
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-sm">feature/new-ui</span>
                </Button>
              </div>
            )}
          </div>

          {/* Remotes Section */}
          <div>
            <Button
              variant="ghost"
              className="flex h-8 w-full items-center justify-between rounded-none px-2"
              onClick={() => toggleSection("remotes")}
            >
              <div className="flex items-center gap-2">
                {expandedSections.remotes ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="text-sm font-medium">{language === "en" ? "Remotes" : "রিমোট"}</span>
              </div>
            </Button>

            {expandedSections.remotes && (
              <div className="ml-6 mt-1 space-y-1">
                <Button variant="ghost" className="flex h-7 w-full items-center justify-start gap-2 rounded-none px-2">
                  <GitPullRequest className="h-4 w-4" />
                  <span className="text-sm">origin</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="space-y-2">
          <Input placeholder={language === "en" ? "Commit message" : "কমিট বার্তা"} className="h-8" />
          <div className="flex gap-2">
            <Button className="flex-1 h-8 gap-1">
              <GitCommit className="h-4 w-4" />
              <span>{language === "en" ? "Commit" : "কমিট"}</span>
            </Button>
            <Button variant="outline" className="h-8 gap-1">
              <GitPullRequest className="h-4 w-4" />
              <span>{language === "en" ? "Push" : "পুশ"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

