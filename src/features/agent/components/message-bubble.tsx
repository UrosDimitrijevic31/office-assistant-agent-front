"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { ApprovalPreviewCard } from "./approval-preview-card";
import { AiAvatar } from "./chat-window";
import type { ChatMessage } from "../agent.types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <Flex
      justifyContent={isUser ? "flex-end" : "flex-start"}
      alignItems="flex-end"
      gap={3}
    >
      {!isUser && <AiAvatar />}

      <Box maxW={{ base: "88%", md: "72%" }}>
        <Box
          px={4}
          py={3}
          borderRadius={isUser ? "2xl 2xl 4px 2xl" : "2xl 2xl 2xl 4px"}
          bg={
            isUser
              ? "gray.900"
              : message.isError
                ? "red.50"
                : "bg.surface"
          }
          borderWidth={isUser ? "0" : "1px"}
          borderColor={message.isError ? "red.200" : "border"}
          _dark={{
            bg: isUser
              ? "gray.100"
              : message.isError
                ? "rgba(220,38,38,0.08)"
                : "bg.surface",
          }}
        >
          <Text
            fontSize="sm"
            lineHeight="1.75"
            whiteSpace="pre-wrap"
            color={
              isUser ? "white" : message.isError ? "red.700" : "text"
            }
            _dark={{
              color: isUser
                ? "gray.900"
                : message.isError
                  ? "red.400"
                  : "text",
            }}
          >
            {message.content}
          </Text>
        </Box>

        {message.approval && (
          <ApprovalPreviewCard
            approvalId={message.approval.approvalId}
            intent={message.approval.intent}
            preview={message.approval.preview}
          />
        )}

        <Text
          fontSize="xs"
          color="text.muted"
          mt={1}
          textAlign={isUser ? "right" : "left"}
        >
          {formatTime(message.timestamp)}
        </Text>
      </Box>
    </Flex>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("sr-RS", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
