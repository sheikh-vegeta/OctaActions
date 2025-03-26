import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer())

    // Create a form data object for the ElevenLabs API
    const elevenlabsFormData = new FormData()
    elevenlabsFormData.append("audio", new Blob([buffer]), "audio.mp3")

    // Call the ElevenLabs API
    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: elevenlabsFormData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: "Error transcribing audio", details: errorData }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error("Error transcribing audio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

