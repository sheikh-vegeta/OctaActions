import { type NextRequest, NextResponse } from "next/server"
import { getRepositoryContents } from "@/lib/github/repository-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const owner = url.searchParams.get("owner")
    const repo = url.searchParams.get("repo")
    const path = url.searchParams.get("path") || ""

    if (!owner || !repo) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const contents = await getRepositoryContents(owner, repo, path)
    return NextResponse.json({ contents })
  } catch (error) {
    console.error("Error fetching repository contents:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
