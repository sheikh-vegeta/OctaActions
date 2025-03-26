# OctaActions: AI-Powered Development Platform

OctaActions is a comprehensive browser-based development platform that combines code editing, presentation creation, and prototyping with AI integration, GitHub connectivity, and multilingual support including Bengali language.

## Key Features

### 1. Multilingual Support

- Complete Bengali language interface
- Custom font integration with Li Ador Noirrit
- Language toggle for seamless switching
- Localized UI elements and messages

### 2. Mobile Optimization

- Responsive design for all screen sizes
- Mobile-specific editor interface
- Touch-friendly controls
- Optimized layout for small screens

### 3. Enhanced AI Integration

- Support for multiple language models and providers:
  - OpenAI: GPT-4o and GPT-4o Mini
  - Anthropic: Claude 3 Opus, Sonnet, and R1 1776
  - Groq: Llama 3 (70B, 8B)
  - HuggingFace: Mixtral 8x7B, DeepSeek V3, and more
  - NVIDIA AI: Llama 3.3 Nemotron, Mistral Small, Llama 3.3 70B, CodeLlama
  - OpenRouter: Access to multiple models with a single API
  - Model Context Protocol (MCP) support for advanced tool calling
- AI-powered code generation and assistance
- Multilingual AI responses
- Interactive model playground for experimenting with different models

### 4. GitHub Integration

- Enhanced repository management
- Commit, branch, and PR workflows
- Visual diff viewer
- Seamless authentication

### 5. Authentication System

- Dual support for Clerk and Auth0
- Unified authentication provider
- Secure middleware implementation
- Environment variable configuration

### 6. Modern UI

- Beautiful Ayu and Andromeda themes
- Shadcn/UI components
- Responsive layouts
- Accessibility features

## UI Generation

OctaActions includes powerful UI generation capabilities:

### Basic UI Generator

The Basic UI Generator allows you to:

- Generate UI components from text prompts
- Analyze and convert UI mockup images into code
- Support for multiple UI frameworks (shadcn/ui, NextUI, etc.)
- Real-time preview and editing

Access it at `/ui-generator`.

### Advanced UI Generator

The Advanced UI Generator provides enhanced capabilities:

- Search a vast library of UI components
- Generate optimized code with multiple AI models
- Code optimization with AST manipulation
- GitHub integration for direct PR creation
- Support for multiple frameworks (React, Next.js, Svelte)
- Support for multiple UI libraries (shadcn/ui, NextUI, Flowbite)

Access it at `/advanced-ui-generator`.

### Environment Variables

To use all UI generation features, set these environment variables:

```
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
SEMANTIC_UI_API_KEY=your_semantic_ui_api_key
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
WEBCONTAINER_API_KEY=your_webcontainer_api_key
```

See `env.template` for all available configuration options.

## V0 Chat Component

The V0 Chat component provides a chat interface inspired by Vercel's v0.dev. Features include:

- Auto-resizing textarea for input
- Dark mode compatible UI
- Quick action buttons for common tasks
- Intuitive attachment and sending functionality

Access it at `/v0-chat`.

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

NEXT_PUBLIC_AUTH0_DOMAIN=xxx.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=xxx
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
AUTH0_SECRET=xxx

# Site Info
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=OctaActions

# AI Services
HUGGING_FACE_TOKEN=hf_xxx
GROQ_API_KEY=gsk_xxx
ELEVENLABS_API_KEY=xxx
NVIDIA_API_KEY=nvapi-xxx
OPENROUTER_API_KEY=sk-or-xxx

# GitHub
GITHUB_TOKEN=ghp_xxx
```

## Deployment

OctaActions is optimized for deployment on Vercel.

### Deployment Features

- Built-in analytics integration through the AnalyticsProvider component
- Pre-build optimization scripts to ensure dependency compatibility
- Security headers for production deployments

### Deployment Steps

1. Fork the repository and connect it to your Vercel account
2. Set the required environment variables in the Vercel dashboard
3. Enable Vercel Analytics and Speed Insights in the Vercel project settings
4. Deploy using the default settings

The application will automatically use the pre-build script to ensure dependency compatibility.

### Environment Variables for Deployment

```
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

For the complete list of environment variables, see the `env.template` file.

### Troubleshooting Deployment

If you encounter deployment issues, check the following:

1. **Missing Environment Variables**: Make sure all required variables are set in your Vercel project settings. The pre-build script will provide placeholders for the build process, but the app won't function correctly without real values.

2. **Edge Runtime Warnings**: Warnings about Edge Runtime APIs in dependencies can be safely ignored as they only affect Edge functions, not the main application.

3. **Dependency Compatibility**: The pre-build script automatically fixes incompatible dependency versions. If you still face issues, update the problematic dependencies manually in your package.json.

4. **Vercel Analytics**: Analytics must be enabled in the Vercel dashboard, not just through code. Go to Project Settings > Analytics to enable this feature.

For additional help, check the [Vercel deployment documentation](https://vercel.com/docs/deployments/overview).

## Getting Started

```bash
# Install dependencies
npm install
# or
bun install

# Run the development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

OctaActions is built with:

- Next.js App Router
- React 18
- TypeScript
- Tailwind CSS
- Clerk/Auth0 for authentication
- Monaco Editor for code editing
- Multiple AI providers:
  - OpenAI
  - Anthropic
  - HuggingFace
  - Groq
  - NVIDIA AI
  - OpenRouter
  - MCP for tool calling capabilities

## দোয়েল (Doyel) - Bengali Language Support

OctaActions is powered by দোয়েল (Doyel), the national bird of Bangladesh, symbolizing our commitment to providing accessible technology for Bengali speakers. The platform provides a comprehensive Bengali language interface with custom font integration.