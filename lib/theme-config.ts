/**
 * FundRaise Pro - Centralized Theme Configuration
 *
 * This file is the single source of truth for all colors, gradients, and design tokens.
 * Update hex codes here to change the entire application's theme.
 *
 * Color System: Uses hex codes which are converted to OKLCH for better color accuracy.
 * After changing values here, run: npm run dev to see changes
 */

export const themeConfig = {
  // ============================================
  // LIGHT MODE COLORS
  // ============================================
  light: {
    // Base Colors
    background: "#FAFAF9", // Main background color
    foreground: "#292524", // Main text color

    // Card & Surfaces
    card: "#FFFFFF", // Card background
    cardForeground: "#292524", // Card text color

    // Popover & Modals
    popover: "#FFFFFF", // Popover background
    popoverForeground: "#292524", // Popover text color

    // Primary Brand Color (Main action buttons, links, etc.)
    primary: "##db2727", // Orange - Main brand color
    primaryForeground: "#FFFFFF", // Text on primary color

    // Secondary Actions
    secondary: "#FEF3E2", // Light orange/cream
    secondaryForeground: "#C2410C", // Text on secondary

    // Muted/Disabled States
    muted: "#F5F5F4", // Muted background
    mutedForeground: "#78716C", // Muted text

    // Accent (Highlights, badges, etc.)
    accent: "#FDE68A", // Yellow accent
    accentForeground: "#292524", // Text on accent

    // Destructive (Errors, delete actions)
    destructive: "#DC2626", // Red for errors
    destructiveForeground: "#FFFFFF", // Text on destructive

    // Borders & Inputs
    border: "#E7E5E4", // Border color
    input: "#E7E5E4", // Input border color
    ring: "#F97316", // Focus ring color

    // Chart Colors (for data visualization)
    chart1: "#F97316", // Orange
    chart2: "#FDE68A", // Yellow
    chart3: "#FEF3C7", // Light yellow
    chart4: "#FED7AA", // Peach
    chart5: "#C2410C", // Dark orange

    // Sidebar (if using sidebar navigation)
    sidebar: "#F5F5F4", // Sidebar background
    sidebarForeground: "#292524", // Sidebar text
    sidebarPrimary: "#F97316", // Sidebar active item
    sidebarPrimaryForeground: "#FFFFFF", // Sidebar active text
    sidebarAccent: "#FDE68A", // Sidebar accent
    sidebarAccentForeground: "#292524", // Sidebar accent text
    sidebarBorder: "#E7E5E4", // Sidebar border
    sidebarRing: "#F97316", // Sidebar focus ring
  },

  // ============================================
  // DARK MODE COLORS
  // ============================================
  dark: {
    // Base Colors
    background: "#1C1917", // Dark background
    foreground: "#F5F5F4", // Light text on dark

    // Card & Surfaces
    card: "#292524", // Dark card background
    cardForeground: "#F5F5F4", // Card text

    // Popover & Modals
    popover: "#292524", // Dark popover
    popoverForeground: "#F5F5F4", // Popover text

    // Primary Brand Color
    primary: "#FB923C", // Lighter orange for dark mode
    primaryForeground: "#FFFFFF", // Text on primary

    // Secondary Actions
    secondary: "#44403C", // Dark gray
    secondaryForeground: "#F5F5F4", // Light text

    // Muted/Disabled States
    muted: "#292524", // Dark muted
    mutedForeground: "#D6D3D1", // Lighter muted text

    // Accent
    accent: "#FDE68A", // Yellow accent (same as light)
    accentForeground: "#1C1917", // Dark text on accent

    // Destructive
    destructive: "#DC2626", // Red (same as light)
    destructiveForeground: "#FFFFFF", // Text on destructive

    // Borders & Inputs
    border: "#44403C", // Darker border
    input: "#44403C", // Input border
    ring: "#F97316", // Focus ring

    // Chart Colors (adjusted for dark mode)
    chart1: "#F97316", // Orange
    chart2: "#FDE68A", // Yellow
    chart3: "#FEF3C7", // Light yellow
    chart4: "#FED7AA", // Peach
    chart5: "#C2410C", // Dark orange

    // Sidebar
    sidebar: "#1C1917", // Dark sidebar
    sidebarForeground: "#F5F5F4", // Light sidebar text
    sidebarPrimary: "#F97316", // Active item
    sidebarPrimaryForeground: "#FFFFFF", // Active text
    sidebarAccent: "#FDE68A", // Accent
    sidebarAccentForeground: "#1C1917", // Accent text
    sidebarBorder: "#44403C", // Border
    sidebarRing: "#F97316", // Focus ring
  },

  // ============================================
  // DESIGN TOKENS
  // ============================================
  design: {
    // Border Radius
    radius: {
      base: "0.625rem", // 10px - Base border radius
      sm: "0.375rem", // 6px - Small radius
      md: "0.5rem", // 8px - Medium radius
      lg: "0.625rem", // 10px - Large radius
      xl: "1rem", // 16px - Extra large radius
      full: "9999px", // Fully rounded (pills)
    },

    // Shadows
    shadow: {
      color: "#000000", // Shadow color (black)
      opacity: 0.09, // Shadow opacity
      blur: "12px", // Shadow blur
      spread: "-3px", // Shadow spread
      offsetX: "0px", // Horizontal offset
      offsetY: "6px", // Vertical offset
    },

    // Typography
    fonts: {
      sans: "Montserrat, sans-serif",
      serif: "Merriweather, serif",
      mono: "Ubuntu Mono, monospace",
    },

    // Letter Spacing
    letterSpacing: {
      normal: "0em",
      tight: "-0.025em",
      tighter: "-0.05em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },

    // Spacing
    spacing: {
      base: "0.25rem", // 4px - Base spacing unit
    },
  },

  // ============================================
  // GRADIENTS
  // ============================================
  gradients: {
    // Primary gradient for hero sections, special buttons
    primary: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",

    // Secondary gradient for backgrounds
    secondary: "linear-gradient(135deg, #FEF3E2 0%, #FAFAF9 100%)",

    // Accent gradient for highlights
    accent: "linear-gradient(135deg, #FDE68A 0%, #FEF3C7 100%)",

    // Dark gradient for dark mode
    dark: "linear-gradient(135deg, #1C1917 0%, #292524 100%)",

    // Success gradient
    success: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",

    // Warning gradient
    warning: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",

    // Error gradient
    error: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",

    // Info gradient
    info: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  },

  // ============================================
  // SEMANTIC COLORS (Status colors used throughout app)
  // ============================================
  semantic: {
    success: "#10B981", // Green for success states
    warning: "#F59E0B", // Amber for warnings
    error: "#DC2626", // Red for errors
    info: "#3B82F6", // Blue for information
  },

  // ============================================
  // CUSTOM COMPONENT COLORS
  // ============================================
  components: {
    // Button variants
    button: {
      primaryHover: "#EA580C", // Darker orange on hover
      secondaryHover: "#FDE68A", // Lighter on hover
      ghostHover: "#F5F5F4", // Light gray on hover
      destructiveHover: "#B91C1C", // Darker red on hover
    },

    // Navbar
    navbar: {
      background: "#FFFFFF",
      border: "#E7E5E4",
      activeItem: "#F97316",
      hoverItem: "#F5F5F4",
    },

    // KPI Cards (Dashboard stats cards)
    kpiCards: {
      blue: {
        bg: "#DBEAFE",
        icon: "#2563EB",
        text: "#1E40AF",
      },
      green: {
        bg: "#D1FAE5",
        icon: "#059669",
        text: "#047857",
      },
      purple: {
        bg: "#E9D5FF",
        icon: "#9333EA",
        text: "#7E22CE",
      },
      orange: {
        bg: "#FFEDD5",
        icon: "#F97316",
        text: "#EA580C",
      },
      red: {
        bg: "#FEE2E2",
        icon: "#DC2626",
        text: "#B91C1C",
      },
    },

    // Progress bars
    progress: {
      background: "#F5F5F4",
      fill: "#3B82F6",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#DC2626",
    },
  },
};

// Type exports for TypeScript autocomplete
export type ThemeConfig = typeof themeConfig;
export type LightColors = typeof themeConfig.light;
export type DarkColors = typeof themeConfig.dark;
