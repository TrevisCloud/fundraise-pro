#!/usr/bin/env node
/**
 * Sync Theme Script
 *
 * This script reads lib/theme-config.ts and updates app/globals.css
 * Run: npm run theme:sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Read theme-config.ts and extract the hex values
const themeConfigPath = path.join(projectRoot, 'lib/theme-config.ts');
const themeConfigContent = fs.readFileSync(themeConfigPath, 'utf-8');

// Parse hex colors from the config using regex
function extractColors(section) {
  const sectionMatch = themeConfigContent.match(new RegExp(`${section}:\\s*{([^}]+)}`, 's'));
  if (!sectionMatch) return {};

  const sectionContent = sectionMatch[1];
  const colorMatches = sectionContent.matchAll(/(\w+):\s*["']#([A-Fa-f0-9]{6})["']/g);

  const colors = {};
  for (const match of colorMatches) {
    colors[match[1]] = `#${match[2]}`;
  }
  return colors;
}

const lightColors = extractColors('light');
const darkColors = extractColors('dark');

console.log('📖 Read theme config:');
console.log('  Light colors:', Object.keys(lightColors).length);
console.log('  Dark colors:', Object.keys(darkColors).length);

// Generate CSS
function toCSSVar(camelCase) {
  return camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
}

const generateCSSVars = (colors) => {
  return Object.entries(colors)
    .map(([key, value]) => `  --${toCSSVar(key)}: ${value};`)
    .join('\n');
};

const lightVars = generateCSSVars(lightColors);
const darkVars = generateCSSVars(darkColors);

// Read current globals.css
const globalsPath = path.join(projectRoot, 'app/globals.css');
let globalsContent = fs.readFileSync(globalsPath, 'utf-8');

// Replace light mode colors (between :root { and first closing })
const rootPattern = /(:root\s*\{)([\s\S]*?)(\/\*\s*Design Tokens\s*\*\/)/;
const newRootContent = `$1
  /* COLORS - Auto-synced from lib/theme-config.ts */
  /* Run: npm run theme:sync after editing theme-config.ts */

${lightVars}

  $3`;

globalsContent = globalsContent.replace(rootPattern, newRootContent);

// Replace dark mode colors (between .dark { and first closing })
const darkPattern = /(\.dark\s*\{)([\s\S]*?)(\}[\s\S]*?@layer base)/;
const newDarkContent = `$1
  /* Dark Mode Colors - Auto-synced from lib/theme-config.ts */

${darkVars}
$3`;

globalsContent = globalsContent.replace(darkPattern, newDarkContent);

// Write updated globals.css
fs.writeFileSync(globalsPath, globalsContent, 'utf-8');

console.log('✅ Theme synced successfully!');
console.log('📁 Updated: app/globals.css');
console.log('');
console.log('💡 Colors from lib/theme-config.ts are now active!');
console.log('   Restart your dev server to see changes.');
