"use client";

import "@/i18n/config";
import { Toaster } from "sonner";
import { AppChakraProvider } from "./chakra-provider";
import { QueryProvider } from "./query-provider";
import { AppearanceProvider } from "./appearance-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppChakraProvider>
      <QueryProvider>
        <AppearanceProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AppearanceProvider>
      </QueryProvider>
    </AppChakraProvider>
  );
}
