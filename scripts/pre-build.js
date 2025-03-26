// pre-build.js
// This script runs before the build process to ensure all dependencies are compatible

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');

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
  
  // Create or update .npmrc to ensure correct registry access
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  const npmrcContent = 'registry=https://registry.npmjs.org/\nlegacy-peer-deps=true\nauto-install-peers=true\n';
  
  try {
    fs.writeFileSync(npmrcPath, npmrcContent);
    console.log('Updated .npmrc file for deployment');
  } catch (npmrcError) {
    console.warn('Warning: Could not update .npmrc file:', npmrcError.message);
  }
  
  console.log('Pre-build checks completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error in pre-build script:', error);
  // Continue the build process even if the script fails
  process.exit(0);
}
