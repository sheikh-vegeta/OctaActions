import OpenAI from 'openai';
import { getOpenRouterClient } from './openrouter';
import { getNvidiaAIClient } from './nvidia-ai';
import { getReplicateClient } from './replicate';

type UIFramework = 'shadcn' | 'nextui' | 'tailwind' | 'chakra' | 'mantine';
type UIComponentType = 'form' | 'card' | 'table' | 'dashboard' | 'landing' | 'auth' | 'custom';

interface UIGenerationOptions {
  prompt: string;
  framework: UIFramework;
  componentType?: UIComponentType;
  responsive?: boolean;
  darkMode?: boolean;
  provider?: 'openai' | 'openrouter' | 'nvidia' | 'replicate';
  modelId?: string;
  temperature?: number;
  image?: string; // Base64 encoded image
}

const defaultPromptTemplate = (options: UIGenerationOptions) => `
Generate a ${options.responsive ? 'responsive ' : ''}${options.framework} UI component for ${options.componentType || 'custom'} based on this description: 

${options.prompt}

${options.darkMode ? 'Ensure it supports dark mode.' : ''}
Return ONLY the code with no explanations. The component should use proper TypeScript typing and follow best practices.
`;

const defaultSystemPrompt = `You are an expert UI developer specializing in React components. 
You create clean, accessible, and well-structured code following these guidelines:

1. Use TypeScript with proper typing
2. Follow modern React best practices with hooks
3. Create reusable components with clear props interfaces
4. Write responsive designs using appropriate CSS techniques
5. Follow accessibility guidelines
6. Use proper component structure and organization

Your output should be complete, ready-to-use React components that can be copied directly into a project.
Include all necessary imports, type definitions, and exports.`;

export async function generateUIComponent(options: UIGenerationOptions): Promise<string> {
  const { provider = 'openai', modelId, temperature = 0.7 } = options;
  const prompt = defaultPromptTemplate(options);
  const systemPrompt = defaultSystemPrompt;

  try {
    let result = '';
    
    if (provider === 'openai') {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      const response = await openai.chat.completions.create({
        model: modelId || 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature,
      });
      
      result = response.choices[0].message.content || '';
    } else if (provider === 'openrouter') {
      const openrouter = getOpenRouterClient();
      
      const response = await openrouter.chat.completions.create({
        model: modelId || 'openai/gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature,
      });
      
      result = response.choices[0].message.content || '';
    } else if (provider === 'nvidia') {
      const nvidia = getNvidiaAIClient();
      
      const response = await nvidia.chat.completions.create({
        model: modelId || 'meta/codellama-70b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature,
      });
      
      result = response.choices[0].message.content || '';
    } else if (provider === 'replicate') {
      // Implement Replicate integration if API key is available
      if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
      }
      
      const replicate = getReplicateClient();
      // Use type assertion to match the actual Replicate API structure
      const response = await replicate.chat.completions.create({
        model: modelId || 'replicate/llama-7b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature,
      } as any);
      
      // Use optional chaining and provide a fallback
      result = response?.choices?.[0]?.message?.content || '';
    }
    
    return result;
  } catch (error) {
    console.error('Error generating UI component:', error);
    throw error;
  }
}

export async function analyzeUIImage(imageBase64: string, provider: string = 'openai'): Promise<string> {
  try {
    let result = '';
    
    if (provider === 'openai') {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert UI analyzer. Given an image of a UI design, describe the components, layout, colors, and interactions in detail so that a developer could recreate it.'
          },
          { 
            role: 'user', 
            content: [
              { type: 'text', text: 'Analyze this UI design and provide a detailed description:' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          },
        ],
        temperature: 0.3,
      });
      
      result = response.choices[0].message.content || '';
    } else {
      throw new Error(`Provider ${provider} not supported for image analysis`);
    }
    
    return result;
  } catch (error) {
    console.error('Error analyzing UI image:', error);
    throw error;
  }
}

export async function generateComponentFromAnalysis(analysis: string, framework: UIFramework): Promise<string> {
  const options: UIGenerationOptions = {
    prompt: analysis,
    framework,
    responsive: true,
    darkMode: true,
  };
  
  return generateUIComponent(options);
}
