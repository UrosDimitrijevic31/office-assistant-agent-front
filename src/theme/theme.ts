import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          500: { value: "#2563eb" },
          600: { value: "#1d4ed8" },
          700: { value: "#1e40af" },
        },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: "#f8fafc", _dark: "#020617" } },
          surface: { value: { base: "#ffffff", _dark: "#0f172a" } },
          muted: { value: { base: "#f1f5f9", _dark: "#111827" } },
        },

        text: {
          DEFAULT: { value: { base: "#0f172a", _dark: "#f8fafc" } },
          muted: { value: { base: "#64748b", _dark: "#94a3b8" } },
          inverse: { value: { base: "#ffffff", _dark: "#020617" } },
        },

        border: {
          DEFAULT: { value: { base: "#e2e8f0", _dark: "#1e293b" } },
        },

        action: {
          primary: { value: { base: "#2563eb", _dark: "#3b82f6" } },
          primaryHover: { value: { base: "#1d4ed8", _dark: "#60a5fa" } },
        },

        status: {
          success: { value: { base: "#16a34a", _dark: "#22c55e" } },
          warning: { value: { base: "#f59e0b", _dark: "#fbbf24" } },
          error: { value: { base: "#dc2626", _dark: "#f87171" } },
          info: { value: { base: "#2563eb", _dark: "#60a5fa" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
