"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { UserButton } from "@clerk/nextjs"
import { Menu, Bell, Search } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

export function Header({ isSidebarOpen, onSidebarToggle }: HeaderProps) {
  const { user } = useAuth()
  const [language, setLanguage] = useState<"en" | "bn">("en")

  return (
    <header className="h-16 border-b bg-card flex items-center px-6">
      <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="mr-4">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle language={language} onLanguageChange={(lang) => setLanguage(lang as "en" | "bn")} />
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}

