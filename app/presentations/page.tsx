import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PresentationsList } from "@/components/presentations/presentations-list"

export default async function PresentationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <PresentationsList />
}

