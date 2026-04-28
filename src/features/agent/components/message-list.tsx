import { VStack } from "@chakra-ui/react";
import { MessageBubble } from "./message-bubble";
import type { ChatMessage } from "../agent.types";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <VStack gap={4} alignItems="stretch">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </VStack>
  );
}
