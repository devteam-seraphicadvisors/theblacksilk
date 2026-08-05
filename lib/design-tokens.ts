// Design System based on SRS specification
export const designTokens = {
  colors: {
    primary: {
      prussianBlue: "#003153",
      black: "#000000",
      white: "#FFFFFF",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  typography: {
    fontFamily: {
      heading: ["DM Serif Display", "serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  spacing: {
    section: "4rem", // 64px
    container: "1280px",
  },
} as const
