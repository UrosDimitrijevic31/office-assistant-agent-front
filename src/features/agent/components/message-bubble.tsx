"use client";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { ApprovalPreviewCard } from "./approval-preview-card";
import type { ChatMessage } from "../agent.types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  return isUser ? <UserMessage message={message} /> : <AssistantMessage message={message} />;
}

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      px={4}
      py={3}
    >
      <Flex gap={3} alignItems="flex-start">
        <Flex
          w={8}
          h={8}
          borderRadius="full"
          bg="purple.600"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          fontSize="xs"
          fontWeight="bold"
          color="white"
          letterSpacing="0.05em"
        >
          VI
        </Flex>

        <Box flex="1" minW={0}>
          <Flex alignItems="baseline" gap={2} mb={1}>
            <Text fontSize="sm" fontWeight="semibold">Vi</Text>
            <Text fontSize="xs" color="text.muted">{formatTime(message.createdAt)}</Text>
          </Flex>
          <Text fontSize="sm" lineHeight="1.75" whiteSpace="pre-wrap">
            {message.content}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <Flex gap={3} alignItems="flex-start">
      <Flex
        w={8}
        h={8}
        borderRadius="full"
        background="linear-gradient(135deg, #4f46e5, #7c3aed)"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={Bot} boxSize={4} color="white" />
      </Flex>

      <Box flex="1" minW={0}>
        <Flex alignItems="baseline" gap={2} mb={1}>
          <Text fontSize="sm" fontWeight="semibold">Office Assistant</Text>
          <Text fontSize="xs" color="text.muted">{formatTime(message.createdAt)}</Text>
        </Flex>

        <Text
          fontSize="sm"
          lineHeight="1.75"
          whiteSpace="pre-wrap"
          color={message.isError ? "red.500" : "text"}
          _dark={{ color: message.isError ? "red.400" : "text" }}
        >
          {message.content}
        </Text>

        {message.approvalData && message.approvalId && (
          <ApprovalPreviewCard
            approvalId={message.approvalId}
            intent={message.approvalData.intent}
            preview={message.approvalData.preview}
          />
        )}
      </Box>
    </Flex>
  );
}

export function AiAvatar() {
  return (
    <Flex
      w={8}
      h={8}
      borderRadius="full"
      background="linear-gradient(135deg, #4f46e5, #7c3aed)"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
    >
      <Icon as={Bot} boxSize={4} color="white" />
    </Flex>
  );
}

function formatTime(createdAt: string): string {
  return new Date(createdAt).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" });
}
