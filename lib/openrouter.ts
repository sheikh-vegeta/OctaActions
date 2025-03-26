import OpenAI from 'openai';

let openRouterClient: OpenAI | null = null;

export function getOpenRouterClient() {
  if (!openRouterClient) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://octaactions.vercel.app';
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'OctaActions';
    
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set in environment variables');
    }
    
    openRouterClient = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
      },
    });
  }
  
  return openRouterClient;
}

export async function streamOpenRouterCompletion({
  model,
  messages,
  temperature = 0.7,
  topP = 0.9,
  maxTokens = 2048,
  tools = undefined,
  toolChoice = undefined,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  tools?: any;
  toolChoice?: string | { type: string; function: { name: string } } | null;
}) {
  const client = getOpenRouterClient();
  
  try {
    const params: any = {
      model,
      messages,
      temperature,
      top_p: topP,
      max_tokens: maxTokens,
      stream: true,
    };

    if (tools) {
      params.tools = tools;
    }

    if (toolChoice) {
      params.tool_choice = toolChoice;
    }

    const stream = await client.chat.completions.create(params);

    return stream;
  } catch (error) {
    console.error('Error streaming from OpenRouter:', error);
    throw error;
  }
}

export async function generateOpenRouterCompletion({
  model,
  messages,
  temperature = 0.7,
  topP = 0.9,
  maxTokens = 2048,
  tools = undefined,
  toolChoice = undefined,
}: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  tools?: any;
  toolChoice?: string | { type: string; function: { name: string } } | null;
}) {
  const stream = await streamOpenRouterCompletion({
    model,
    messages,
    temperature,
    topP,
    maxTokens,
    tools,
    toolChoice,
  });
  
  let output = '';
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    output += content;
  }
  
  return output;
}

// Function to fetch available models from OpenRouter
export async function fetchOpenRouterModels() {
  const client = getOpenRouterClient();
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    return [];
  }
}
