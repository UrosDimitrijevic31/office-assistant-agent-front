import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontFamily = "sans" | "serif" | "mono";
export type FontSize = "sm" | "md" | "lg";

interface AppearanceState {
  fontFamily: FontFamily;
  fontSize: FontSize;
  setFontFamily: (f: FontFamily) => void;
  setFontSize: (s: FontSize) => void;
}

export const fontFamilyMap: Record<FontFamily, string> = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Courier New", Courier, monospace',
};

export const fontSizeMap: Record<FontSize, string> = {
  sm: "14px",
  md: "16px",
  lg: "18px",
};

export const useAppearanceStore = create<AppearanceState>()(
  persist(
    (set) => ({
      fontFamily: "sans",
      fontSize: "md",
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    { name: "office-appearance" },
  ),
);
