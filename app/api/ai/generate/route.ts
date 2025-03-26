import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { generateSlides, generatePrototype } from "@/lib/ai-service"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { prompt, type, deviceType } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    let result

    if (type === "presentation") {
      result = await generateSlides(prompt)
    } else if (type === "prototype") {
      result = await generatePrototype(prompt, deviceType || "mobile")
    } else {
      return NextResponse.json({ error: "Invalid type. Must be 'presentation' or 'prototype'" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in AI generate route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

