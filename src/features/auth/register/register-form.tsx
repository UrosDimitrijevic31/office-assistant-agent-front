"use client";

import { Flex } from "@chakra-ui/react";
import { LoginBrandPanel } from "@/features/auth/login/components/login-brand-panel";
import { RegisterFormPanel } from "./components/register-form-panel";

export function RegisterForm() {
  return (
    <Flex minH="100vh" w="full">
      <LoginBrandPanel />
      <RegisterFormPanel />
    </Flex>
  );
}
