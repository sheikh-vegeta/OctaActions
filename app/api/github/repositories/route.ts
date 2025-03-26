import { type NextRequest, NextResponse } from "next/server"
import { getUserRepositories } from "@/lib/github/repository-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const repositories = await getUserRepositories()
    return NextResponse.json({ repositories })
  } catch (error) {
    console.error("Error fetching repositories:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

