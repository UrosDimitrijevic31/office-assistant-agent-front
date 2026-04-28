"use client";

import "@/i18n/config";
import { Toaster } from "sonner";
import { AppChakraProvider } from "./chakra-provider";
import { QueryProvider } from "./query-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppChakraProvider>
      <QueryProvider>
        {children}
        <Toaster richColors position="top-right" />
      </QueryProvider>
    </AppChakraProvider>
  );
}
