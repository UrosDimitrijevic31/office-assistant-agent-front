"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { toast } from "sonner";
import { ChatWindow } from "./chat-window";
import { ChatInput } from "./chat-input";
import { useSendMessage } from "../agent.hooks";
import type { ChatMessage } from "../agent.types";

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sendMessage = useSendMessage();

  const handleSend = async (content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage.mutateAsync(content);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
        isError: response.status === "error",
        approval:
          response.status === "needs_approval"
            ? {
                approvalId: response.data.approvalId,
                intent: response.intent,
                preview: response.data.preview,
              }
            : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (response.status === "error") {
        toast.error(response.data?.error ?? response.message);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Došlo je do greške. Pokušajte ponovo.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
      toast.error("Nije moguće poslati poruku.");
    }
  };

  return (
    <Flex flex="1" flexDirection="column" overflow="hidden" bg="bg">
      <ChatWindow
        messages={messages}
        isLoading={sendMessage.isPending}
        onSend={handleSend}
      />
      <ChatInput onSend={handleSend} isLoading={sendMessage.isPending} />
    </Flex>
  );
}
