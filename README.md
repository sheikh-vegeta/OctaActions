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

- Support for multiple language models:
  - GPT-4o and GPT-4o Mini
  - Qwen models (72B, 7B)
  - Llama 3 models
  - DeepSeek V3
  - Claude models
  - Anthropic's R1 1776
- AI-powered code generation and assistance
- Multilingual AI responses

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

# AI Services
HUGGING_FACE_TOKEN=hf_xxx
GROQ_API_KEY=gsk_xxx
ELEVENLABS_API_KEY=xx

# GitHub
GITHUB_TOKEN=ghp_xxx
```

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
- HuggingFace, Groq, and OpenAI for AI features

## দোয়েল (Doyel) - Bengali Language Support

OctaActions is powered by দোয়েল (Doyel), the national bird of Bangladesh, symbolizing our commitment to providing accessible technology for Bengali speakers. The platform provides a comprehensive Bengali language interface with custom font integration.