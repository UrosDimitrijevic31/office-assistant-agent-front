"use client";

import { type KeyboardEvent } from "react";
import { Box, Flex, Icon, IconButton, Textarea } from "@chakra-ui/react";
import { Send } from "lucide-react";

interface AiComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  isLoading: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

export function AiComposer({ value, onChange, onSend, isLoading, inputRef }: AiComposerProps) {
  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <Flex
      alignItems="flex-end"
      gap={3}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      px={4}
      py={3}
      transition="border-color 0.15s, box-shadow 0.15s"
      _focusWithin={{
        borderColor: "purple.400",
        boxShadow: "0 0 0 3px rgba(124,58,237,0.1)",
      }}
    >
      <Textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Napišite zahtev, npr. zakaži sastanak sutra u 10h sa Markom..."
        resize="none"
        border="none"
        p={0}
        rows={2}
        flex="1"
        fontSize="sm"
        lineHeight="1.75"
        bg="transparent"
        _placeholder={{ color: "text.muted" }}
        _focusVisible={{ boxShadow: "none", outline: "none" }}
        disabled={isLoading}
        style={{ overflow: "hidden", minHeight: "48px" }}
      />

      <IconButton
        aria-label="Pošalji poruku"
        onClick={handleSend}
        disabled={!canSend}
        size="md"
        borderRadius="xl"
        flexShrink={0}
        loading={isLoading}
        background={canSend ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : undefined}
        color={canSend ? "white" : undefined}
        transition="all 0.15s"
      >
        <Icon as={Send} boxSize={4} />
      </IconButton>
    </Flex>
  );
}
