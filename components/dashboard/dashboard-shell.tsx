"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { MainLayout } from "@/components/layout/main-layout"
import { ProjectsList } from "@/components/dashboard/projects-list"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"

export function DashboardShell() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push("/login")
    return null
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg border p-4">
          <h3 className="font-medium mb-1">Presentations</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <h3 className="font-medium mb-1">Prototypes</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <h3 className="font-medium mb-1">Code Projects</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <ProjectsList />
        </div>
      </div>

      <CreateProjectDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </MainLayout>
  )
}

