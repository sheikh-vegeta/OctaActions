import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Editor } from "@/components/editor/editor"

interface EditorPageProps {
  params: {
    type: string
    id: string
  }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <Editor type={params.type} id={params.id} />
}

