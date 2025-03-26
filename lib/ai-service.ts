import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { HfInference } from "@huggingface/inference"

// Initialize Hugging Face client
const hfClient = new HfInference(process.env.HUGGING_FACE_TOKEN)

export async function generateSlides(prompt: string) {
  try {
    const systemPrompt = `You are an expert presentation designer. 
    Create a well-structured presentation based on the user's prompt.
    Your response should include:
    1. A title slide
    2. An outline of key points
    3. Detailed content slides with appropriate headings
    4. Visual suggestions (charts, images, etc.)
    5. A conclusion slide
    
    Format your response as JSON with the following structure:
    {
      "title": "Presentation Title",
      "slides": [
        {
          "type": "title",
          "content": {
            "title": "Slide Title",
            "subtitle": "Optional Subtitle"
          }
        },
        {
          "type": "content",
          "content": {
            "title": "Slide Title",
            "bullets": ["Point 1", "Point 2", "Point 3"],
            "notes": "Speaker notes"
          }
        },
        {
          "type": "image",
          "content": {
            "title": "Slide Title",
            "imageDescription": "Description of the image to use",
            "caption": "Optional image caption"
          }
        },
        {
          "type": "chart",
          "content": {
            "title": "Slide Title",
            "chartType": "bar|line|pie",
            "data": {
              "labels": ["Label 1", "Label 2"],
              "values": [10, 20]
            }
          }
        }
      ]
    }`

    const { text } = await generateText({
      model: groq("qwen-qwq-32b"),
      prompt: prompt,
      system: systemPrompt,
      maxTokens: 2048,
    })

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error)
      return { error: "Failed to generate presentation" }
    }
  } catch (error) {
    console.error("Error generating slides:", error)
    return { error: "Failed to generate presentation" }
  }
}

export async function generatePrototype(prompt: string, deviceType: string) {
  try {
    const systemPrompt = `You are an expert UI/UX designer. 
    Create a prototype design based on the user's prompt for a ${deviceType} interface.
    Your response should include:
    1. A main screen design
    2. Navigation elements
    3. Interactive components
    4. Color scheme and typography suggestions
    
    Format your response as JSON with the following structure:
    {
      "title": "Prototype Title",
      "deviceType": "${deviceType}",
      "screens": [
        {
          "name": "Screen Name",
          "elements": [
            {
              "type": "container|text|button|image|input",
              "properties": {
                "x": 0,
                "y": 0,
                "width": 100,
                "height": 50,
                "text": "Text content if applicable",
                "style": {
                  "backgroundColor": "#ffffff",
                  "borderRadius": 4,
                  "color": "#000000"
                }
              }
            }
          ],
          "interactions": [
            {
              "elementIndex": 0,
              "event": "click|hover",
              "action": "navigate|toggle|show|hide",
              "target": "Screen Name or Element Index"
            }
          ]
        }
      ]
    }`

    const { text } = await generateText({
      model: groq("qwen-qwq-32b"),
      prompt: prompt,
      system: systemPrompt,
      maxTokens: 2048,
    })

    // Parse the JSON response
    try {
      return JSON.parse(text)
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error)
      return { error: "Failed to generate prototype" }
    }
  } catch (error) {
    console.error("Error generating prototype:", error)
    return { error: "Failed to generate prototype" }
  }
}

export async function chatWithAI(messages: any[]) {
  try {
    const stream = hfClient.chatCompletionStream({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: messages,
      provider: "hf-inference",
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.7,
    })

    let response = ""
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content
        response += newContent
      }
    }

    return { text: response }
  } catch (error) {
    console.error("Error chatting with AI:", error)
    return { error: "Failed to chat with AI" }
  }
}

