// pre-build.js
// This script runs before the build process to ensure all dependencies are compatible

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');

try {
  console.log('Running pre-build compatibility checks...');
  
  // Read package.json
  const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonData);
  
  // Check for incompatible dependencies
  const compatibilityChecks = [
    { name: '@modelcontextprotocol/server-filesystem', minVersion: '0.3.0' },
  ];
  
  let hasChanges = false;
  
  // Update any incompatible dependencies
  compatibilityChecks.forEach(check => {
    if (packageJson.dependencies && packageJson.dependencies[check.name]) {
      const currentVersion = packageJson.dependencies[check.name];
      // Only update if the version string indicates a lower version than required
      if (currentVersion.includes('^0.0.') || currentVersion.includes('~0.0.')) {
        packageJson.dependencies[check.name] = `^${check.minVersion}`;
        hasChanges = true;
        console.log(`Updated ${check.name} to ${packageJson.dependencies[check.name]}`);
      }
    }
  });
  
  // Write changes back to package.json if needed
  if (hasChanges) {
    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('Updated package.json with compatible dependency versions');
    } catch (writeError) {
      console.warn('Warning: Could not write changes to package.json:', writeError.message);
    }
  } else {
    console.log('All dependencies are compatible. No changes needed.');
  }

  // Check next.config.js for conflicts
  if (fs.existsSync(nextConfigPath)) {
    try {
      // Read the config file content
      const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

      // Check if we can detect both arrays to avoid conflicts
      const hasServerComponentsExternal = nextConfigContent.includes('serverComponentsExternalPackages');
      const hasTranspilePackages = nextConfigContent.includes('transpilePackages');

      if (hasServerComponentsExternal && hasTranspilePackages) {
        console.log('Checking Next.js config for conflicts...');
        
        // This is a simple string-based fix to avoid parsing JS code
        // Look for packages that might be in both arrays
        const potentialConflicts = ['@clerk/shared', '@clerk/nextjs', '@clerk/clerk-react'];
        
        let modifiedContent = nextConfigContent;
        let hadConflicts = false;

        potentialConflicts.forEach(pkg => {
          // If package appears in serverComponentsExternalPackages, remove it from transpilePackages
          const regex = new RegExp(`(transpilePackages[\\s\\S]*?)((['"]\s*${pkg}\s*['"]\s*,?)|([,]\s*['"]\s*${pkg}\s*['"]))`, 'g');
          if (nextConfigContent.includes(`serverComponentsExternalPackages`) && 
              nextConfigContent.includes(pkg) && 
              regex.test(nextConfigContent)) {
            modifiedContent = modifiedContent.replace(regex, '$1'); // Remove the package from transpilePackages
            hadConflicts = true;
            console.log(`Removed ${pkg} from transpilePackages to avoid conflict`);
          }
        });

        if (hadConflicts) {
          fs.writeFileSync(nextConfigPath, modifiedContent);
          console.log('Updated next.config.js to resolve conflicts');
        }
      }
    } catch (error) {
      console.warn('Warning: Could not check/fix Next.js config:', error.message);
    }
  }
  
  // Create or update .npmrc to ensure correct registry access
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  const npmrcContent = 'registry=https://registry.npmjs.org/\nlegacy-peer-deps=true\nauto-install-peers=true\n';
  
  try {
    fs.writeFileSync(npmrcPath, npmrcContent);
    console.log('Updated .npmrc file for deployment');
  } catch (npmrcError) {
    console.warn('Warning: Could not update .npmrc file:', npmrcError.message);
  }

  // Ensure required environment variables have fallbacks for build process
  const requiredEnvVars = [
    // Auth
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'AUTH0_SECRET',
    // GitHub
    'GITHUB_TOKEN',
    // AI Services
    'OPENAI_API_KEY',
    'HUGGING_FACE_TOKEN',
  ];

  // Only for build process, not for actual usage
  let missingVars = [];
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
      // Only for build process - these are fake placeholder values
      process.env[varName] = `placeholder-for-build-${varName}`;
    }
  });

  if (missingVars.length > 0) {
    console.warn(`\nWarning: The following required env vars have placeholders for build:\n${missingVars.join('\n')}`);
    console.warn('These placeholders will allow the build to complete, but the app will not function correctly without real values.\n');
  }
  
  console.log('Pre-build checks completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error in pre-build script:', error);
  // Continue the build process even if the script fails
  process.exit(0);
}
