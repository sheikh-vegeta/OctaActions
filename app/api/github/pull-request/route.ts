import { type NextRequest, NextResponse } from "next/server"
import { createPullRequest } from "@/lib/github/repository-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const { owner, repo, title, body, head, base } = await req.json()

    if (!owner || !repo || !title || !head) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const result = await createPullRequest(owner, repo, title, body || "", head, base || "main")

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error creating pull request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

