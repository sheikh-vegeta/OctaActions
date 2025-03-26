import { type NextRequest, NextResponse } from "next/server"
import { createOrUpdateFile } from "@/lib/github/repository-service"
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
    const { owner, repo, path, content, message, branch } = await req.json()

    if (!owner || !repo || !path || !content) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const result = await createOrUpdateFile(
      owner,
      repo,
      path,
      content,
      message || "Update from OctaActions",
      branch || "main",
    )

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error creating or updating file:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

