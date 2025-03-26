import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { chatWithAI } from "@/lib/ai-service"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    const result = await chatWithAI(messages)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in AI chat route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

