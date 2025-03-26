import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, you would use the GitHub API to fetch repositories
    // This is a mock implementation
    const mockRepos = [
      {
        id: 1,
        name: "project-one",
        full_name: "username/project-one",
        html_url: "https://github.com/username/project-one",
        description: "A sample project",
        private: false,
        owner: {
          login: "username",
          avatar_url: "https://github.com/github.png",
        },
      },
      {
        id: 2,
        name: "project-two",
        full_name: "username/project-two",
        html_url: "https://github.com/username/project-two",
        description: "Another sample project",
        private: true,
        owner: {
          login: "username",
          avatar_url: "https://github.com/github.png",
        },
      },
    ]

    return NextResponse.json(mockRepos)
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

