import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { TemplatesList } from "@/components/templates/templates-list"

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <TemplatesList />
}

