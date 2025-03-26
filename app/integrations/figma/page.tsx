import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { FigmaIntegration } from "@/components/integrations/figma-integration"

export default async function FigmaIntegrationPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <FigmaIntegration />
}

