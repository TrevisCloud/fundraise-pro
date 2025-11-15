/**
 * Generate Theme CSS
 *
 * This script reads theme-config.ts and generates CSS with proper OKLCH values
 * Run: node scripts/generate-theme-css.mjs
 */

import { formatHex, formatCss, converter } from 'culori';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Import theme config (we'll read it as a module)
const themeConfigPath = join(projectRoot, 'lib/theme-config.ts');

// For this script, we'll define the colors directly
// In production, you could use ts-node or compile the TS file first
const themeConfig = {
  light: {
    background: "#FAFAF9",
    foreground: "#292524",
    card: "#FFFFFF",
    cardForeground: "#292524",
    popover: "#FFFFFF",
    popoverForeground: "#292524",
    primary: "#F97316",
    primaryForeground: "#FFFFFF",
    secondary: "#FEF3E2",
    secondaryForeground: "#C2410C",
    muted: "#F5F5F4",
    mutedForeground: "#78716C",
    accent: "#FDE68A",
    accentForeground: "#292524",
    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",
    border: "#E7E5E4",
    input: "#E7E5E4",
    ring: "#F97316",
    chart1: "#F97316",
    chart2: "#FDE68A",
    chart3: "#FEF3C7",
    chart4: "#FED7AA",
    chart5: "#C2410C",
    sidebar: "#F5F5F4",
    sidebarForeground: "#292524",
    sidebarPrimary: "#F97316",
    sidebarPrimaryForeground: "#FFFFFF",
    sidebarAccent: "#FDE68A",
    sidebarAccentForeground: "#292524",
    sidebarBorder: "#E7E5E4",
    sidebarRing: "#F97316",
  },
  dark: {
    background: "#1C1917",
    foreground: "#F5F5F4",
    card: "#292524",
    cardForeground: "#F5F5F4",
    popover: "#292524",
    popoverForeground: "#F5F5F4",
    primary: "#FB923C",
    primaryForeground: "#FFFFFF",
    secondary: "#44403C",
    secondaryForeground: "#F5F5F4",
    muted: "#292524",
    mutedForeground: "#D6D3D1",
    accent: "#FDE68A",
    accentForeground: "#1C1917",
    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",
    border: "#44403C",
    input: "#44403C",
    ring: "#F97316",
    chart1: "#F97316",
    chart2: "#FDE68A",
    chart3: "#FEF3C7",
    chart4: "#FED7AA",
    chart5: "#C2410C",
    sidebar: "#1C1917",
    sidebarForeground: "#F5F5F4",
    sidebarPrimary: "#F97316",
    sidebarPrimaryForeground: "#FFFFFF",
    sidebarAccent: "#FDE68A",
    sidebarAccentForeground: "#1C1917",
    sidebarBorder: "#44403C",
    sidebarRing: "#F97316",
  },
};

// Convert hex to OKLCH
const hexToOklch = (hex) => {
  const oklch = converter('oklch');
  const color = oklch(hex);
  if (!color) return 'oklch(0 0 0)';

  const l = color.l !== undefined ? color.l.toFixed(4) : '0';
  const c = color.c !== undefined ? color.c.toFixed(4) : '0';
  const h = color.h !== undefined ? color.h.toFixed(4) : '0';

  return `oklch(${l} ${c} ${h})`;
};

// Convert object to CSS variables
const generateCSSVars = (colors, prefix = '') => {
  return Object.entries(colors)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${prefix}${cssKey}: ${hexToOklch(value)};`;
    })
    .join('\n');
};

// Generate the full CSS
const generateCSS = () => {
  const lightVars = generateCSSVars(themeConfig.light);
  const darkVars = generateCSSVars(themeConfig.dark);

  return `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
${lightVars}
  --radius: 0.625rem;
  --font-sans: Montserrat, sans-serif;
  --font-serif: Merriweather, serif;
  --font-mono: Ubuntu Mono, monospace;
  --shadow-color: hsl(0 0% 0%);
  --shadow-opacity: 0.09;
  --shadow-blur: 12px;
  --shadow-spread: -3px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 6px;
  --letter-spacing: 0em;
  --spacing: 0.25rem;
  --shadow-2xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-sm: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow-md: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 2px 4px -4px hsl(0 0% 0% / 0.09);
  --shadow-lg: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 4px 6px -4px hsl(0 0% 0% / 0.09);
  --shadow-xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 8px 10px -4px hsl(0 0% 0% / 0.09);
  --shadow-2xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.22);
  --tracking-normal: 0em;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: Montserrat, sans-serif;
  --font-mono: Ubuntu Mono, monospace;
  --font-serif: Merriweather, serif;
  --radius: 0.625rem;
  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
  --tracking-normal: var(--tracking-normal);
  --shadow-2xl: var(--shadow-2xl);
  --shadow-xl: var(--shadow-xl);
  --shadow-lg: var(--shadow-lg);
  --shadow-md: var(--shadow-md);
  --shadow: var(--shadow);
  --shadow-sm: var(--shadow-sm);
  --shadow-xs: var(--shadow-xs);
  --shadow-2xs: var(--shadow-2xs);
  --spacing: var(--spacing);
  --letter-spacing: var(--letter-spacing);
  --shadow-offset-y: var(--shadow-offset-y);
  --shadow-offset-x: var(--shadow-offset-x);
  --shadow-spread: var(--shadow-spread);
  --shadow-blur: var(--shadow-blur);
  --shadow-opacity: var(--shadow-opacity);
  --color-shadow-color: var(--shadow-color);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
    letter-spacing: var(--tracking-normal);
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@layer components {
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
}

.dark {
${darkVars}
  --radius: 0.625rem;
  --font-sans: Montserrat, sans-serif;
  --font-serif: Merriweather, serif;
  --font-mono: Ubuntu Mono, monospace;
  --shadow-color: hsl(0 0% 0%);
  --shadow-opacity: 0.09;
  --shadow-blur: 12px;
  --shadow-spread: -3px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 6px;
  --letter-spacing: 0em;
  --spacing: 0.25rem;
  --shadow-2xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-sm: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow-md: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 2px 4px -4px hsl(0 0% 0% / 0.09);
  --shadow-lg: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 4px 6px -4px hsl(0 0% 0% / 0.09);
  --shadow-xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 8px 10px -4px hsl(0 0% 0% / 0.09);
  --shadow-2xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.22);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
};

// Write the CSS file
const outputPath = join(projectRoot, 'app/globals.css');
const css = generateCSS();

fs.writeFileSync(outputPath, css, 'utf8');

console.log('✅ Theme CSS generated successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log('\n💡 To update colors:');
console.log('   1. Edit lib/theme-config.ts');
console.log('   2. Run: node scripts/generate-theme-css.mjs');
console.log('   3. Restart dev server');
