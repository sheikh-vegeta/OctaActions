interface ReplicateOptions {
  model: string;
  prompt: string;
  max_tokens?: number;
  temperature?: number;
}

interface ReplicateResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_logprobs: number;
  choices: {
    text: string;
    index: number;
    logprobs: {
      tokens: string[];
      token_logprobs: number[];
      top_logprobs: number[];
      text_offset: number[];
    };
    finish_reason: string;
  }[];
}

export async function generateWithReplicate(options: ReplicateOptions): Promise<ReplicateResponse> {
  const { model, prompt, max_tokens = 1024, temperature = 0.7 } = options;
  
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
  }
  
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: model,
        input: {
          prompt,
          max_tokens: max_tokens,
          temperature,
        },
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Replicate API error: ${error.detail || 'Unknown error'}`);
    }
    
    const prediction = await response.json();
    
    // Poll for the prediction result
    const pollInterval = 1000; // 1 second
    const maxPolls = 60; // 1 minute timeout
    let polls = 0;
    let result: ReplicateResponse;
    
    while (polls < maxPolls) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!statusResponse.ok) {
        const error = await statusResponse.json();
        throw new Error(`Replicate API error: ${error.detail || 'Unknown error'}`);
      }
      
      const status = await statusResponse.json();
      
      if (status.status === 'succeeded') {
        result = {
          id: status.id,
          object: status.object,
          created: status.created,
          model: status.model,
          prompt: status.input.prompt,
          max_tokens: status.input.max_tokens,
          temperature: status.input.temperature,
          top_logprobs: status.input.top_logprobs,
          choices: [
            {
              text: Array.isArray(status.output) ? status.output.join('') : status.output,
              index: 0,
              logprobs: {
                tokens: [],
                token_logprobs: [],
                top_logprobs: [],
                text_offset: [],
              },
              finish_reason: 'stop',
            },
          ],
        };
        break;
      } else if (status.status === 'failed') {
        throw new Error(`Replicate prediction failed: ${status.error || 'Unknown error'}`);
      }
      
      polls++;
    }
    
    if (!result) {
      throw new Error('Replicate prediction timed out');
    }
    
    return result;
  } catch (error) {
    console.error('Error generating with Replicate:', error);
    throw error;
  }
}

export function getReplicateClient() {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
  }
  
  return {
    chat: {
      completions: {
        create: async (options: ReplicateOptions) => generateWithReplicate(options),
      },
    },
  };
}
