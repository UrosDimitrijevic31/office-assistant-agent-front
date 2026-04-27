"use client";

import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegisterReturn;
  showPassword: boolean;
  onToggle: () => void;
  ariaLabel: string;
}

export function PasswordInput({
  register,
  showPassword,
  onToggle,
  ariaLabel,
}: PasswordInputProps) {
  return (
    <Box w="full" position="relative">
      <Input
        {...register}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        size="lg"
        bg="bg.surface"
        pr="12"
        borderColor="border"
        borderRadius="lg"
        _hover={{ borderColor: "purple.300" }}
        _focusVisible={{
          borderColor: "purple.500",
          boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.12)",
          outline: "none",
        }}
      />

      <IconButton
        type="button"
        aria-label={ariaLabel}
        onClick={onToggle}
        variant="ghost"
        size="sm"
        position="absolute"
        right="2"
        top="50%"
        transform="translateY(-50%)"
        color="text.muted"
      >
        <Icon as={showPassword ? EyeOff : Eye} boxSize={4} />
      </IconButton>
    </Box>
  );
}
