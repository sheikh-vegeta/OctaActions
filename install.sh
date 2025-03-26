#!/bin/bash

echo "Installing OctaActions dependencies..."

# Check if bun is installed
if command -v bun &> /dev/null; then
    echo "Using Bun package manager"
    bun install
else
    # Check if npm is installed
    if command -v npm &> /dev/null; then
        echo "Using NPM package manager"
        npm install
    else
        echo "Error: Neither Bun nor NPM is installed. Please install one of these package managers."
        exit 1
    fi
fi

# Create .env.local template if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local template..."
    cat > .env.local << EOL
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
AUTH0_SECRET=

# Site Info
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=OctaActions

# AI Services
HUGGING_FACE_TOKEN=
GROQ_API_KEY=
ELEVENLABS_API_KEY=
NVIDIA_API_KEY=
OPENROUTER_API_KEY=

# GitHub
GITHUB_TOKEN=
EOL
    echo ".env.local template created. Please fill in your API keys."
fi

echo "Installation complete! Run 'bun dev' or 'npm run dev' to start the development server."
