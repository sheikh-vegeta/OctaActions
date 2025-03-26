/**
 * Code optimizer for correcting AI-generated UI code
 * Uses AST manipulation to fix common issues in generated code
 */

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

interface OptimizationOptions {
  framework: 'react' | 'nextjs' | 'svelte';
  uiLibrary: 'shadcn' | 'nextui' | 'flowbite';
  fixImports?: boolean;
  fixIcons?: boolean;
}

const SHADCN_COMPONENT_PREFIX = '@/components/ui/';
const NEXTUI_COMPONENT_PREFIX = '@nextui-org/react';
const FLOWBITE_COMPONENT_PREFIX = 'flowbite-react';

const LUCIDE_ICONS_LIST = [
  // Common icons that are frequently used
  'AlertCircle', 'ArrowRight', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
  'ChevronUp', 'ChevronsUpDown', 'Circle', 'Copy', 'CreditCard', 'Download', 'Edit',
  'Eye', 'EyeOff', 'File', 'FileText', 'Folder', 'Globe', 'HelpCircle', 'Home',
  'Image', 'Info', 'Laptop', 'Loader', 'Lock', 'LucideProps', 'Mail', 'Menu',
  'MessageSquare', 'Minus', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package',
  'PanelLeft', 'PanelRight', 'Plus', 'Search', 'Settings', 'Share', 'ShoppingCart',
  'Slash', 'Smartphone', 'Sun', 'Tablet', 'Terminal', 'Trash', 'Trash2', 'Upload',
  'User', 'Users', 'Volume2', 'Wallet', 'X', 'Zap'
];

/**
 * Get the correct import source for a component based on the UI library
 */
function getImportSource(componentName: string, uiLibrary: string): string {
  switch (uiLibrary) {
    case 'shadcn':
      return `${SHADCN_COMPONENT_PREFIX}${componentName.toLowerCase()}`;
    case 'nextui':
      return NEXTUI_COMPONENT_PREFIX;
    case 'flowbite':
      return FLOWBITE_COMPONENT_PREFIX;
    default:
      return `${SHADCN_COMPONENT_PREFIX}${componentName.toLowerCase()}`;
  }
}

/**
 * Check if an icon name exists in the Lucide icon set
 */
function isValidLucideIcon(iconName: string): boolean {
  return LUCIDE_ICONS_LIST.includes(iconName);
}

/**
 * Optimize AI-generated UI code by fixing common issues
 */
export function optimizeUICode(code: string, options: OptimizationOptions): string {
  const { framework, uiLibrary, fixImports = true, fixIcons = true } = options;
  
  try {
    // Parse the code into an AST
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    const usedComponents = new Set<string>();
    const usedIcons = new Set<string>();
    const invalidIcons = new Set<string>();
    
    // Traverse the AST to collect used components and icons
    traverse(ast, {
      JSXOpeningElement(path) {
        const name = path.node.name;
        
        if (t.isJSXIdentifier(name)) {
          // Check if it's potentially a component (starts with uppercase)
          if (/^[A-Z]/.test(name.name)) {
            usedComponents.add(name.name);
          }
          
          // Check if it's potentially an icon
          if (fixIcons && /Icon$/.test(name.name) || LUCIDE_ICONS_LIST.some(icon => icon === name.name)) {
            const iconName = name.name.replace(/Icon$/, '');
            if (isValidLucideIcon(iconName)) {
              usedIcons.add(iconName);
            } else {
              invalidIcons.add(name.name);
            }
          }
        }
      },
    });
    
    // Fix imports if needed
    if (fixImports) {
      traverse(ast, {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          
          // Fix UI component imports
          if (source.includes('/ui/') || source.includes('nextui') || source.includes('flowbite')) {
            const specifiers = path.node.specifiers;
            
            specifiers.forEach(specifier => {
              if (t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
                const componentName = specifier.imported.name;
                if (usedComponents.has(componentName)) {
                  // Update the import source to the correct path
                  path.node.source.value = getImportSource(componentName, uiLibrary);
                }
              }
            });
          }
          
          // Fix icon imports
          if (fixIcons && source === 'lucide-react') {
            const newSpecifiers = path.node.specifiers.filter(specifier => {
              if (t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
                const iconName = specifier.imported.name;
                return usedIcons.has(iconName) || !invalidIcons.has(iconName);
              }
              return true;
            });
            
            path.node.specifiers = newSpecifiers;
          }
        },
      });
    }
    
    // Generate the optimized code
    const output = generate(ast, { retainLines: true });
    return output.code;
  } catch (error) {
    console.error('Error optimizing UI code:', error);
    return code; // Return the original code if optimization fails
  }
}

/**
 * Extract component imports from UI code
 */
export function extractComponentImports(code: string): { name: string; source: string }[] {
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    const imports: { name: string; source: string }[] = [];
    
    traverse(ast, {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        
        path.node.specifiers.forEach(specifier => {
          if (t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
            imports.push({
              name: specifier.imported.name,
              source,
            });
          }
        });
      },
    });
    
    return imports;
  } catch (error) {
    console.error('Error extracting component imports:', error);
    return [];
  }
}
