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

    const { prompt, imageUrl } = await req.json()

    if (!prompt && !imageUrl) {
      return NextResponse.json({ error: "Either prompt or imageUrl is required" }, { status: 400 })
    }

    // Create a system prompt for the AI agent
    const systemPrompt = `You are OctaActions AI Agent, an expert in creating web applications from descriptions or screenshots.
    Your task is to generate code for a web application based on the user's input.
    
    When generating code:
    1. Use React and Next.js with the App Router
    2. Use Tailwind CSS for styling
    3. Use shadcn/ui components where appropriate
    4. Use lucide-react for icons
    5. Make the application responsive and accessible
    6. Follow best practices for code organization and structure
    
    Your response should include:
    1. A brief explanation of the application structure
    2. The necessary files and their contents
    3. Instructions for running the application`

    let userPrompt = prompt || ""

    // If an image URL is provided, include it in the prompt
    if (imageUrl) {
      userPrompt += `\n\nI've uploaded a screenshot of a design I'd like you to recreate. The image is available at: ${imageUrl}\n\nPlease analyze this image and create a web application that matches this design as closely as possible.`
    }

    // Generate response using Groq
    const { text } = await generateText({
      model: groq("qwen-qwq-32b"),
      prompt: userPrompt,
      system: systemPrompt,
      maxTokens: 4000,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in agent route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

