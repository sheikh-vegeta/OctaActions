import OpenAI from 'openai';

let nvidiaClient: OpenAI | null = null;

export function getNvidiaAIClient() {
  if (!nvidiaClient) {
    const apiKey = process.env.NVIDIA_API_KEY;
    
    if (!apiKey) {
      throw new Error('NVIDIA_API_KEY is not set in environment variables');
    }
    
    nvidiaClient = new OpenAI({
      apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });
  }
  
  return nvidiaClient;
}

export async function streamNvidiaCompletion({
  model,
  messages,
  temperature = 0.6,
  topP = 0.7,
  maxTokens = 1024,
  frequencyPenalty = 0,
  presencePenalty = 0,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}) {
  const client = getNvidiaAIClient();
  
  try {
    const stream = await client.chat.completions.create({
      model,
      messages,
      temperature,
      top_p: topP,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      stream: true,
    });

    return stream;
  } catch (error) {
    console.error('Error streaming from NVIDIA AI:', error);
    throw error;
  }
}

export async function generateNvidiaCompletion({
  model,
  messages,
  temperature = 0.6,
  topP = 0.7,
  maxTokens = 1024,
  frequencyPenalty = 0,
  presencePenalty = 0,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}) {
  const stream = await streamNvidiaCompletion({
    model,
    messages,
    temperature,
    topP,
    maxTokens,
    frequencyPenalty,
    presencePenalty,
  });
  
  let output = '';
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    output += content;
  }
  
  return output;
}
