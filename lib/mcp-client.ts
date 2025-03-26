import { spawn } from 'child_process';
import OpenAI from 'openai';

export async function createMCPClient({
  command = 'npx',
  args = [],
  env = {},
  model = 'anthropic/claude-3-7-sonnet',
  apiKey,
  baseURL = 'https://openrouter.ai/api/v1',
}: {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  model?: string;
  apiKey: string;
  baseURL?: string;
}) {
  // Create OpenAI client
  const openai = new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://octaactions.vercel.app',
      'X-Title': 'OctaActions',
    },
  });

  // Create a simple protocol to communicate with the MCP server
  const process = spawn(command, args, { env: { ...process.env, ...env } });
  
  // Store available tools
  let availableTools: any[] = [];
  
  // Helper function to send a command and get a response
  const sendCommand = (command: string, payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const request = JSON.stringify({ command, payload });
      
      // Send command to the server
      process.stdin.write(request + '\n');
      
      // Set up a listener for the response
      const dataHandler = (data: Buffer) => {
        try {
          const response = JSON.parse(data.toString());
          process.stdout.removeListener('data', dataHandler);
          resolve(response);
        } catch (error) {
          // If it's not JSON, continue listening
          // This handles cases where server might output debug info
        }
      };
      
      process.stdout.on('data', dataHandler);
      
      // Handle errors
      const errorHandler = (data: Buffer) => {
        const error = data.toString();
        console.error('MCP Server Error:', error);
        reject(new Error(error));
      };
      
      process.stderr.on('data', errorHandler);
    });
  };

  // Helper function to convert tool definitions to OpenAI tool definitions
  const convertToolFormat = (tool: any) => ({
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description || '',
      parameters: {
        type: 'object',
        properties: tool.parameters?.properties || {},
        required: tool.parameters?.required || [],
      },
    },
  });

  // Initialize and list available tools
  const initialize = async () => {
    try {
      await sendCommand('initialize', {});
      const toolsResponse = await sendCommand('listTools', {});
      availableTools = toolsResponse.tools || [];
      return availableTools;
    } catch (error) {
      console.error('Failed to initialize MCP client:', error);
      throw error;
    }
  };

  // List available tools
  const listTools = async () => {
    if (availableTools.length === 0) {
      await initialize();
    }
    return availableTools;
  };

  // Call a tool
  const callTool = async (name: string, args: any) => {
    try {
      return await sendCommand('callTool', { name, args });
    } catch (error) {
      console.error(`Error calling tool ${name}:`, error);
      throw error;
    }
  };

  // Process a query
  const processQuery = async (query: string, options: any = {}) => {
    const messages = [{ role: 'user' as const, content: query }];
    const tools = await listTools();
    const availableOpenAITools = tools.map(convertToolFormat);

    try {
      // Get the initial response
      const response = await openai.chat.completions.create({
        model,
        tools: availableOpenAITools,
        messages,
        ...options,
        stream: false,
      });

      const content = response.choices[0].message;
      let finalText = [];

      // Handle tool calls
      if (content.tool_calls && content.tool_calls.length > 0) {
        const toolCall = content.tool_calls[0];
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments || '{}');

        try {
          // Call the tool
          finalText.push(`[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`);
          const result = await callTool(toolName, toolArgs);

          // Add tool result to messages
          messages.push({
            role: 'assistant',
            content: null,
            tool_calls: [{
              id: toolCall.id,
              type: 'function',
              function: {
                name: toolName,
                arguments: toolCall.function.arguments,
              }
            }]
          });
          
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name: toolName,
            content: typeof result === 'string' ? result : JSON.stringify(result),
          });

          // Get the final response
          const finalResponse = await openai.chat.completions.create({
            model,
            messages,
            max_tokens: options.max_tokens || 1000,
          });

          finalText.push(finalResponse.choices[0].message.content || '');
        } catch (error) {
          finalText.push(`Error calling tool: ${error.message}`);
        }
      } else {
        finalText.push(content.content || '');
      }

      return finalText.join('\n');
    } catch (error) {
      console.error('Error processing query:', error);
      throw error;
    }
  };

  // Cleanup
  const cleanup = async () => {
    process.kill();
  };

  // Initialize on creation
  await initialize();

  return {
    listTools,
    callTool,
    processQuery,
    cleanup,
  };
}

// Example usage
/*
const mcpClient = await createMCPClient({
  command: 'npx',
  args: [
    '-y',
    '@modelcontextprotocol/server-filesystem',
    '/path/to/directory',
  ],
  apiKey: process.env.OPENROUTER_API_KEY,
});

const result = await mcpClient.processQuery('List all files in the directory');
console.log(result);

await mcpClient.cleanup();
*/
