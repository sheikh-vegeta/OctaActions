import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrototypesList } from "@/components/prototypes/prototypes-list"

export default async function PrototypesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <PrototypesList />
}

