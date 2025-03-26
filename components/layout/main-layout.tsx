"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [isMobile])

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && isSidebarOpen && <Sidebar />}

      <div className="flex flex-col flex-1">
        <Header isSidebarOpen={isSidebarOpen} onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-6">{children}</main>
      </div>

      {isMobile && <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
    </div>
  )
}

