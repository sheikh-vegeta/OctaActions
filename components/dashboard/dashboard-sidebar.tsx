"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, FolderGit2, Settings, MessageSquare, Code, Terminal, Database, Rocket, Sparkles } from "lucide-react"

interface DashboardSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeView: "projects" | "chat"
  setActiveView: (view: "projects" | "chat") => void
}

export function DashboardSidebar({ isOpen, setIsOpen, activeView, setActiveView }: DashboardSidebarProps) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block md:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FolderGit2 className="h-6 w-6" />
            <span>OctaActions</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2 py-2">
          <div className="space-y-1">
            <Button
              variant={activeView === "projects" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveView("projects")}
            >
              <Home className="h-4 w-4" />
              Projects
            </Button>
            <Button
              variant={activeView === "chat" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setActiveView("chat")}
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
            <Link href="/agent" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Sparkles className="h-4 w-4" />
                AI Agent
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Development</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Code className="h-4 w-4" />
                Editor
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Terminal className="h-4 w-4" />
                Terminal
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Database className="h-4 w-4" />
                Database
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Rocket className="h-4 w-4" />
                Deploy
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Settings</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

