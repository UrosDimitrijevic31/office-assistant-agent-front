"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { MessageList } from "./message-list";
import { EmptyChatState } from "./empty-chat-state";
import type { ChatMessage } from "../agent.types";

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatPanel({ messages, isLoading }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      bg="bg.surface"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border"
      minH={0}
    >
      <Flex
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="border"
        alignItems="center"
        gap={2}
        flexShrink={0}
      >
        <Box
          w="2"
          h="2"
          borderRadius="full"
          bg={isLoading ? "orange.400" : "green.400"}
          flexShrink={0}
        />
        <Text fontSize="xs" fontWeight="medium" color="text.muted">
          {isLoading ? "Asistent odgovara..." : "Razgovor"}
        </Text>
      </Flex>

      <Box flex="1" overflowY="auto" px={4} py={4} display="flex" flexDirection="column">
        {messages.length === 0 && !isLoading ? (
          <EmptyChatState />
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
    <Flex alignItems="flex-end" gap={2.5} mt={4}>
      <Flex
        w="7"
        h="7"
        borderRadius="full"
        background="linear-gradient(135deg, #4f46e5, #7c3aed)"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={Bot} boxSize={3.5} color="white" />
      </Flex>

      <Flex
        px={4}
        py={3}
        bg="bg"
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
