@echo off
echo Installing OctaActions dependencies...

:: Check if bun is installed
where bun >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Using Bun package manager
    bun install
) else (
    :: Check if npm is installed
    where npm >nul 2>nul
    if %ERRORLEVEL% == 0 (
        echo Using NPM package manager
        npm install
    ) else (
        echo Error: Neither Bun nor NPM is installed. Please install one of these package managers.
        exit /b 1
    )
)

:: Create .env.local template if it doesn't exist
if not exist .env.local (
    echo Creating .env.local template...
    (
        echo # Authentication
        echo NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
        echo CLERK_SECRET_KEY=
        echo.
        echo NEXT_PUBLIC_AUTH0_DOMAIN=
        echo NEXT_PUBLIC_AUTH0_CLIENT_ID=
        echo NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
        echo AUTH0_SECRET=
        echo.
        echo # Site Info
        echo NEXT_PUBLIC_SITE_URL=http://localhost:3000
        echo NEXT_PUBLIC_SITE_NAME=OctaActions
        echo.
        echo # AI Services
        echo HUGGING_FACE_TOKEN=
        echo GROQ_API_KEY=
        echo ELEVENLABS_API_KEY=
        echo NVIDIA_API_KEY=
        echo OPENROUTER_API_KEY=
        echo.
        echo # GitHub
        echo GITHUB_TOKEN=
    ) > .env.local
    echo .env.local template created. Please fill in your API keys.
)

echo Installation complete! Run 'bun dev' or 'npm run dev' to start the development server.
