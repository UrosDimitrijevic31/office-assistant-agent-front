"use client";

import { Flex } from "@chakra-ui/react";
import { LoginBrandPanel } from "./components/login-brand-panel";
import { LoginFormPanel } from "./components/login-form-panel";

export function LoginForm() {
  return (
    <Flex minH="100vh">
      <LoginBrandPanel />
      <LoginFormPanel />
    </Flex>
  );
}
