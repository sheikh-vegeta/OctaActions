import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Combine all user messages into a single prompt
    const userMessages = messages
      .filter((message: any) => message.role === "user")
      .map((message: any) => message.content)
      .join("\n")

    // Get the last user message
    const lastUserMessage = messages.filter((message: any) => message.role === "user").pop()

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    // Create a system prompt
    const systemPrompt = `You are OctaActions AI, a helpful assistant for developers. 
    You provide concise, accurate information about coding, debugging, and deployment.
    You can help with code examples, explain concepts, and suggest solutions to common problems.
    Always format code blocks with the appropriate language syntax highlighting.`

    // Generate response using Groq
    const { text } = await generateText({
      model: groq("qwen-qwq-32b"),
      prompt: lastUserMessage.content,
      system: systemPrompt,
      maxTokens: 1000,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

