/**
 * 21st.dev API client for semantic UI component search and prompt generation
 */

interface ComponentSearchParams {
  search: string;
  page?: number;
  per_page?: number;
}

interface ComponentUser {
  name: string;
  username: string;
  image_url: string;
}

interface ComponentData {
  name: string;
  description: string;
  code: string;
  install_command: string;
}

interface SearchResultItem {
  name: string;
  preview_url: string;
  video_url: string;
  demo_id: number;
  component_data: ComponentData;
  component_user_data: ComponentUser;
  usage_count: number;
}

interface PaginationMetadata {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

interface SearchResponseMetadata {
  plan: string;
  requests_remaining: number;
  pagination: PaginationMetadata;
}

interface SearchResponse {
  results: SearchResultItem[];
  metadata: SearchResponseMetadata;
}

interface GeneratePromptParams {
  prompt_type: 'sitebrew' | 'v0' | 'lovable' | 'bolt' | 'extended' | 'replit' | 'magic_patterns';
  demo_id: string | number;
}

interface GeneratePromptResponse {
  prompt: string;
}

export class SemanticUIApi {
  private apiKey: string;
  private baseUrl = 'https://api.21st.dev';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Search for UI components using natural language
   */
  async searchComponents(params: ComponentSearchParams): Promise<SearchResponse> {
    const response = await fetch(`${this.baseUrl}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to search components');
    }

    return response.json();
  }

  /**
   * Generate a prompt for a specific component
   */
  async generatePrompt(params: GeneratePromptParams): Promise<GeneratePromptResponse> {
    const response = await fetch(`${this.baseUrl}/api/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate prompt');
    }

    return response.json();
  }
}

/**
 * Create a new instance of the 21st.dev API client
 */
export function getSemanticUIApiClient(apiKey?: string): SemanticUIApi {
  const key = apiKey || process.env.SEMANTIC_UI_API_KEY || '';
  if (!key) {
    throw new Error('SEMANTIC_UI_API_KEY is not set in environment variables');
  }
  
  return new SemanticUIApi(key);
}
