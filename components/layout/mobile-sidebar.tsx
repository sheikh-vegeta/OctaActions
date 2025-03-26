"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LayoutDashboard, Presentation, Smartphone, FileCode, Layers, Settings, Github, Figma, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Presentations",
    href: "/presentations",
    icon: Presentation,
  },
  {
    title: "Prototypes",
    href: "/prototypes",
    icon: Smartphone,
  },
  {
    title: "Code Editor",
    href: "/editor",
    icon: FileCode,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: Layers,
  },
  {
    title: "Integrations",
    items: [
      {
        title: "GitHub",
        href: "/integrations/github",
        icon: Github,
      },
      {
        title: "Figma",
        href: "/integrations/figma",
        icon: Figma,
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-64">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <FileCode className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">OctaActions</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => {
                if (item.items) {
                  return (
                    <div key={index} className="mb-4">
                      <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {item.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                              pathname === subItem.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                            onClick={onClose}
                          >
                            {subItem.icon && <subItem.icon className="mr-3 h-5 w-5" />}
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    onClick={onClose}
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

