"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { MessageList } from "./message-list";
import { EmptyChatState } from "./empty-chat-state";
import type { ChatMessage } from "../agent.types";

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export function ChatWindow({ messages, isLoading, onSend }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  return (
    <Box flex="1" overflowY="auto" px={4} py={6}>
      <Box maxW="760px" mx="auto">
        {messages.length === 0 && !isLoading ? (
          <EmptyChatState onSend={onSend} />
        ) : (
          <MessageList messages={messages} />
        )}

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </Box>
    </Box>
  );
}

function TypingIndicator() {
  return (
    <Flex alignItems="flex-end" gap={3} mt={4}>
      <AiAvatar />
      <Flex
        px={4}
        py={3}
        bg="bg.surface"
        borderRadius="2xl 2xl 2xl 4px"
        borderWidth="1px"
        borderColor="border"
        alignItems="center"
        gap={2}
      >
        <Spinner size="xs" color="purple.500" />
        <Text fontSize="xs" color="text.muted">
          Asistent kuca...
        </Text>
      </Flex>
    </Flex>
  );
}

export function AiAvatar() {
  return (
    <Box
      w="8"
      h="8"
      borderRadius="full"
      background="linear-gradient(135deg, #4f46e5, #7c3aed)"
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="9px"
      color="white"
      fontWeight="bold"
      letterSpacing="-0.3px"
    >
      AI
    </Box>
  );
}
