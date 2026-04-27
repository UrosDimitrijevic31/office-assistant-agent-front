"use client";

import "@/i18n/config";
import { AppChakraProvider } from "./chakra-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <AppChakraProvider>{children}</AppChakraProvider>;
}
