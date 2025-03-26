"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const router = useRouter()
  const [currentLang, setCurrentLang] = React.useState<"en" | "bn">("en")

  // Check if current URL path contains /bangla to set initial language state
  React.useEffect(() => {
    const path = window.location.pathname
    if (path.includes("/bangla")) {
      setCurrentLang("bn")
    } else {
      setCurrentLang("en")
    }
  }, [])

  const switchLanguage = (lang: "en" | "bn") => {
    if (lang === "bn") {
      router.push("/bangla")
    } else {
      router.push("/")
    }
    setCurrentLang(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 px-0">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={currentLang === "en" ? "bg-muted" : ""}>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchLanguage("bn")} 
          className={`font-bangla ${currentLang === "bn" ? "bg-muted" : ""}`}
        >
          <span>বাংলা</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
