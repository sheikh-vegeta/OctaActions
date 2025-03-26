"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, X, Github, Moon, Sun, Sparkles, Wand2, Code, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/okta-logo.svg" alt="OctaActions Logo" width={32} height={32} />
            <span className="text-xl font-bold">OctaActions</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Blog
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/editor">Editor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/playground" className="text-muted-foreground hover:text-foreground">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Playground
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ui-generator" className="text-muted-foreground hover:text-foreground">
                    <Wand2 className="mr-2 h-4 w-4" />
                    UI Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/advanced-ui-generator" className="text-muted-foreground hover:text-foreground">
                    <Code className="mr-2 h-4 w-4" />
                    Advanced UI Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/v0-chat" className="text-muted-foreground hover:text-foreground">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    V0 Chat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/presentations">Presentations</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => signIn("auth0")}>
                Log in
              </Button>
              <Button className="rounded-full" onClick={() => signIn("auth0")}>
                Sign up
                <Github className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Docs
            </Link>
            <Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              {session ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link href="/editor" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Editor
                  </Link>
                  <Link href="/playground" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Playground
                  </Link>
                  <Link href="/ui-generator" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    UI Generator
                  </Link>
                  <Link href="/advanced-ui-generator" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <Code className="mr-2 h-4 w-4" />
                    Advanced UI Generator
                  </Link>
                  <Link href="/v0-chat" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    V0 Chat
                  </Link>
                  <Link href="/presentations" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Presentations
                  </Link>
                  <Button variant="ghost" className="justify-start px-2" onClick={() => signOut()}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => signIn("auth0")}>
                    Log in
                  </Button>
                  <Button className="rounded-full" onClick={() => signIn("auth0")}>
                    Sign up
                    <Github className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
