"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Box, Flex, Icon, IconButton, Text, Textarea } from "@chakra-ui/react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <Box
      px={4}
      py={4}
      borderTopWidth="1px"
      borderColor="border"
      bg="bg.surface"
    >
      <Box maxW="760px" mx="auto">
        <Flex
          alignItems="flex-end"
          gap={3}
          bg="bg"
          borderWidth="1px"
          borderColor="border"
          borderRadius="2xl"
          px={4}
          py={3}
          transition="border-color 0.15s, box-shadow 0.15s"
          _focusWithin={{
            borderColor: "purple.400",
            boxShadow: "0 0 0 3px rgba(124,58,237,0.1)",
          }}
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Napišite poruku..."
            resize="none"
            border="none"
            p={0}
            rows={1}
            flex="1"
            fontSize="sm"
            lineHeight="1.75"
            bg="transparent"
            _placeholder={{ color: "text.muted" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
            disabled={isLoading}
            style={{ overflow: "hidden", minHeight: "24px" }}
          />

          <IconButton
            aria-label="Pošalji poruku"
            onClick={handleSend}
            disabled={!canSend}
            size="sm"
            borderRadius="xl"
            flexShrink={0}
            mb="1px"
            background={
              canSend
                ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                : undefined
            }
            color={canSend ? "white" : undefined}
            transition="all 0.15s"
          >
            <Icon as={ArrowUp} boxSize={4} />
          </IconButton>
        </Flex>

        <Text fontSize="xs" color="text.muted" textAlign="center" mt={2}>
          Enter za slanje · Shift+Enter za novi red
        </Text>
      </Box>
    </Box>
  );
}
