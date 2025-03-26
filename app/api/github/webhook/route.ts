import { type NextRequest, NextResponse } from "next/server"
import { handleGitHubWebhook } from "@/lib/github/probot-service"

export async function POST(req: NextRequest) {
  try {
    return await handleGitHubWebhook(req)
  } catch (error) {
    console.error("Error processing GitHub webhook:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

