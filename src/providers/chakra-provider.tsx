import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme/theme";

export function AppChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
