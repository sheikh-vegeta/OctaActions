import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AgentChat } from "@/components/agent/agent-chat"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default async function AgentPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar isOpen={true} setIsOpen={() => {}} activeView="chat" setActiveView={() => {}} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader toggleSidebar={() => {}} isSidebarOpen={true} />
        <main className="flex-1 overflow-auto p-6">
          <div className="h-full">
            <AgentChat />
          </div>
        </main>
      </div>
    </div>
  )
}

