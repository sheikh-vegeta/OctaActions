// pre-build.js
// This script runs before the build process to ensure all dependencies are compatible

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(process.cwd(), 'package.json');

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check for incompatible dependencies
  const compatibilityChecks = [
    { name: '@modelcontextprotocol/server-filesystem', minVersion: '0.3.0' },
  ];
  
  let hasChanges = false;
  
  // Update any incompatible dependencies
  compatibilityChecks.forEach(check => {
    if (packageJson.dependencies[check.name]) {
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
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('Updated package.json with compatible dependency versions');
    
    // Optionally run install again
    console.log('Running npm install to update dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  } else {
    console.log('All dependencies are compatible. No changes needed.');
  }
  
  // Create or update .npmrc to ensure correct registry access
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  const npmrcContent = 'registry=https://registry.npmjs.org/\nlegacy-peer-deps=true\nENGINE_STRICT=false\n';
  
  fs.writeFileSync(npmrcPath, npmrcContent);
  console.log('Updated .npmrc file for deployment');
  
  process.exit(0);
} catch (error) {
  console.error('Error in pre-build script:', error);
  process.exit(1);
}
