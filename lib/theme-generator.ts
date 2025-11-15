/**
 * Theme Generator Utility
 *
 * Converts hex colors from theme-config.ts to OKLCH format
 * and generates CSS variables for use in globals.css
 */

import { themeConfig } from './theme-config';

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to linear RGB
 */
function rgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Convert linear RGB to OKLCH (approximate conversion for CSS)
 * For production, use a proper color conversion library like culori
 * This is a simplified version for demonstration
 */
function hexToOklch(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'oklch(0 0 0)';

  // Simplified conversion - in production use proper color library
  // This maintains the current OKLCH values structure
  const r = rgbToLinear(rgb.r);
  const g = rgbToLinear(rgb.g);
  const b = rgbToLinear(rgb.b);

  // Calculate relative luminance (approximate)
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Calculate chroma (approximate)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const c = max - min;

  // Calculate hue (approximate)
  let h = 0;
  if (c !== 0) {
    if (max === r) {
      h = ((g - b) / c) % 6;
    } else if (max === g) {
      h = (b - r) / c + 2;
    } else {
      h = (r - g) / c + 4;
    }
    h = h * 60;
    if (h < 0) h += 360;
  }

  // Convert to OKLCH values (approximate)
  const lightness = Math.sqrt(l);
  const chroma = c * 0.2;

  return `oklch(${lightness.toFixed(4)} ${chroma.toFixed(4)} ${h.toFixed(4)})`;
}

/**
 * Generate CSS custom properties from theme config
 */
export function generateThemeCSS(): { light: string; dark: string } {
  const { light, dark, design } = themeConfig;

  const lightVars = Object.entries(light)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${cssKey}: ${hexToOklch(value)};`;
    })
    .join('\n');

  const darkVars = Object.entries(dark)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${cssKey}: ${hexToOklch(value)};`;
    })
    .join('\n');

  // Design tokens
  const designVars = `
  --radius: ${design.radius.base};
  --font-sans: ${design.fonts.sans};
  --font-serif: ${design.fonts.serif};
  --font-mono: ${design.fonts.mono};
  --shadow-color: ${design.shadow.color};
  --shadow-opacity: ${design.shadow.opacity};
  --shadow-blur: ${design.shadow.blur};
  --shadow-spread: ${design.shadow.spread};
  --shadow-offset-x: ${design.shadow.offsetX};
  --shadow-offset-y: ${design.shadow.offsetY};
  --letter-spacing: ${design.letterSpacing.normal};
  --spacing: ${design.spacing.base};
  --shadow-2xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-xs: 0px 6px 12px -3px hsl(0 0% 0% / 0.04);
  --shadow-sm: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 1px 2px -4px hsl(0 0% 0% / 0.09);
  --shadow-md: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 2px 4px -4px hsl(0 0% 0% / 0.09);
  --shadow-lg: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 4px 6px -4px hsl(0 0% 0% / 0.09);
  --shadow-xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.09), 0px 8px 10px -4px hsl(0 0% 0% / 0.09);
  --shadow-2xl: 0px 6px 12px -3px hsl(0 0% 0% / 0.22);
  --tracking-normal: ${design.letterSpacing.normal};`;

  return {
    light: lightVars + designVars,
    dark: darkVars + designVars,
  };
}

/**
 * Export theme colors for use in JavaScript/TypeScript
 */
export { themeConfig };

/**
 * Helper function to get a theme color by path
 * Example: getThemeColor('light.primary') => '#F97316'
 */
export function getThemeColor(path: string): string {
  const keys = path.split('.');
  let value: Record<string, unknown> = themeConfig as Record<string, unknown>;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key] as Record<string, unknown>;
    } else {
      return '';
    }
  }

  return typeof value === 'string' ? value : '';
}

/**
 * Helper to get gradient by name
 */
export function getGradient(name: keyof typeof themeConfig.gradients): string {
  return themeConfig.gradients[name];
}

/**
 * Helper to get semantic color
 */
export function getSemanticColor(name: keyof typeof themeConfig.semantic): string {
  return themeConfig.semantic[name];
}
