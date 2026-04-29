"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { toast } from "sonner";
import { CalendarCheck, Mail, Ticket } from "lucide-react";
import { AiComposer } from "./ai-composer";
import { MessageList } from "./message-list";
import { useSendMessage } from "../agent.hooks";
import type { ChatMessage, PendingApproval } from "../agent.types";

const QUICK_ACTIONS = [
  { icon: CalendarCheck, label: "Zakaži sastanak", shortcut: "⌘1", prompt: "Zakaži sastanak " },
  { icon: Mail, label: "Pošalji mejl", shortcut: "⌘2", prompt: "Pošalji mejl " },
  { icon: Ticket, label: "Kreiraj tiket", shortcut: "⌘3", prompt: "Kreiraj tiket " },
] as const;

const CONTAINER_MAX_W = "4xl";

export function ChatWorkspacePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [composerValue, setComposerValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sendMessage = useSendMessage();

  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content, createdAt: new Date().toISOString() },
    ]);
    setComposerValue("");

    try {
      const response = await sendMessage.mutateAsync(content);

      if (response.status === "needs_approval") {
        setPendingApprovals((prev) => [
          ...prev,
          { id: response.data.approvalId, intent: response.intent, preview: response.data.preview, createdAt: new Date().toISOString() },
        ]);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.message,
            createdAt: new Date().toISOString(),
            approvalId: response.data.approvalId,
            approvalData: { intent: response.intent, preview: response.data.preview },
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.message,
          createdAt: new Date().toISOString(),
          isError: response.status === "error",
        },
      ]);

      if (response.status === "error") {
        toast.error(response.data?.error ?? response.message);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Došlo je do greške. Pokušajte ponovo.", createdAt: new Date().toISOString(), isError: true },
      ]);
      toast.error("Nije moguće poslati poruku.");
    }
  };

  const handleQuickAction = (prompt: string) => {
    setComposerValue(prompt);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const quickActionChips = (
    <Flex gap={2} mt={3} flexWrap="wrap">
      {QUICK_ACTIONS.map((action) => (
        <Box
          key={action.label}
          as="button"
          onClick={() => handleQuickAction(action.prompt)}
          display="flex"
          alignItems="center"
          gap={1.5}
          px={3}
          py={1.5}
          borderWidth="1px"
          borderColor="border"
          borderRadius="full"
          fontSize="xs"
          color="text.muted"
          bg="transparent"
          cursor="pointer"
          transition="all 0.15s"
          _hover={{
            borderColor: "purple.400",
            color: "purple.600",
            bg: "purple.50",
            _dark: { bg: "rgba(124,58,237,0.08)", borderColor: "purple.600" },
          }}
        >
          <Icon as={action.icon} boxSize={3} />
          {action.label}
          <Box
            ml={1}
            px={1}
            borderRadius="sm"
            fontSize="10px"
            color="text.subtle"
            fontFamily="mono"
            lineHeight="1.8"
            bg="bg"
          >
            {action.shortcut}
          </Box>
        </Box>
      ))}
    </Flex>
  );

  // ── Empty state: heading + input centered in viewport ──────────────────────
  if (!hasMessages) {
    return (
      <Flex flex="1" direction="column" align="center" justify="center" overflow="hidden" bg="bg">
        <Box maxW={CONTAINER_MAX_W} w="full" px={6}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            letterSpacing="-0.02em"
            textAlign="center"
            mb={1}
          >
            Šta želite da završite?
          </Heading>
          <Text fontSize="sm" color="text.muted" textAlign="center" mb={6}>
            Zakažite sastanke, pošaljite mejlove ili kreirajte tikete uz pomoć AI asistenta.
          </Text>

          <AiComposer
            value={composerValue}
            onChange={setComposerValue}
            onSend={handleSend}
            isLoading={sendMessage.isPending}
            inputRef={inputRef}
          />
          {quickActionChips}
        </Box>
      </Flex>
    );
  }

  // ── Active state: scrollable messages + fixed bottom input ─────────────────
  return (
    <Flex flex="1" direction="column" overflow="hidden" bg="bg">
      {/* Scrollable messages — infinite scroll grows upward naturally */}
      <Box flex="1" overflowY="auto">
        <Box maxW={CONTAINER_MAX_W} mx="auto" px={6} pt={6} pb={4}>
          <MessageList messages={messages} />
          <div ref={bottomRef} />
        </Box>
      </Box>

      {/* Input pinned to bottom */}
      <Box flexShrink={0} borderTopWidth="1px" borderColor="border" bg="bg">
        <Box maxW={CONTAINER_MAX_W} mx="auto" px={6} py={4}>
          <AiComposer
            value={composerValue}
            onChange={setComposerValue}
            onSend={handleSend}
            isLoading={sendMessage.isPending}
            inputRef={inputRef}
          />
          {quickActionChips}
        </Box>
      </Box>
    </Flex>
  );
}
