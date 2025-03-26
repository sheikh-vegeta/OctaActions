import { HfInference } from "@huggingface/inference";

// Create a singleton instance of the InferenceClient
let client: HfInference | null = null;

export function getHuggingFaceClient() {
  if (!client) {
    const apiKey = process.env.HUGGING_FACE_TOKEN;
    if (!apiKey) {
      throw new Error("HUGGING_FACE_TOKEN is not set in environment variables");
    }
    client = new HfInference(apiKey);
  }
  return client;
}

export async function streamHuggingFaceCompletion({
  model,
  messages,
  maxTokens = 500,
  temperature = 0.7,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  maxTokens?: number;
  temperature?: number;
}) {
  const client = getHuggingFaceClient();
  
  try {
    const stream = await client.chatCompletionStream({
      provider: model.includes("/") ? "novita" : model,
      model: model.includes("/") ? model : undefined,
      messages: messages,
      max_tokens: maxTokens,
      temperature: temperature,
    });

    return stream;
  } catch (error) {
    console.error("Error streaming from HuggingFace:", error);
    throw error;
  }
}

export async function generateHuggingFaceCompletion({
  model,
  messages,
  maxTokens = 500,
  temperature = 0.7,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  maxTokens?: number;
  temperature?: number;
}) {
  const client = getHuggingFaceClient();
  
  try {
    let output = "";
    const stream = await streamHuggingFaceCompletion({
      model,
      messages,
      maxTokens,
      temperature,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content || "";
        output += newContent;
      }
    }

    return output;
  } catch (error) {
    console.error("Error generating from HuggingFace:", error);
    throw error;
  }
}
