"use client";

import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { CheckCircle, Clock, Send } from "lucide-react";
import type { ChatMessage } from "../agent.types";

interface RecentActivitySectionProps {
  messages: ChatMessage[];
}

type ActivityType = "sent" | "received" | "approval";

interface ActivityItem {
  id: string;
  type: ActivityType;
  label: string;
  createdAt: string;
}

const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; color: string }
> = {
  sent: { icon: Send, color: "blue.500" },
  received: { icon: CheckCircle, color: "green.500" },
  approval: { icon: Clock, color: "orange.500" },
};

function deriveActivity(messages: ChatMessage[]): ActivityItem[] {
  return [...messages]
    .reverse()
    .slice(0, 5)
    .map((msg) => {
      if (msg.role === "user") {
        return {
          id: msg.id,
          type: "sent" as const,
          label: "Poslat zahtev agentu",
          createdAt: msg.createdAt,
        };
      }
      if (msg.approvalId) {
        return {
          id: msg.id,
          type: "approval" as const,
          label: "Pripremljena akcija za odobrenje",
          createdAt: msg.createdAt,
        };
      }
      return {
        id: msg.id,
        type: "received" as const,
        label: "Primljen odgovor asistenta",
        createdAt: msg.createdAt,
      };
    });
}

function formatRelativeTime(createdAt: string): string {
  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
  if (diff < 60) return "malopre";
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  return `${Math.floor(diff / 3600)}h`;
}

export function RecentActivitySection({
  messages,
}: RecentActivitySectionProps) {
  const activities = deriveActivity(messages);

  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="text.muted"
        letterSpacing="0.06em"
        mb={3}
      >
        NEDAVNA AKTIVNOST
      </Text>

      {activities.length === 0 ? (
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border"
          borderRadius="xl"
          px={4}
          py={5}
          textAlign="center"
        >
          <Text fontSize="xs" color="text.muted">
            Još nema aktivnosti.
          </Text>
        </Box>
      ) : (
        <VStack
          gap={0}
          alignItems="stretch"
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border"
          borderRadius="xl"
          overflow="hidden"
        >
          {activities.map((item, index) => {
            const { icon: ActivityIcon, color } = activityConfig[item.type];
            return (
              <Flex
                key={item.id}
                alignItems="center"
                gap={3}
                px={3}
                py={2.5}
                borderBottomWidth={index < activities.length - 1 ? "1px" : "0"}
                borderColor="border"
              >
                <Icon as={ActivityIcon} boxSize={3.5} color={color} flexShrink={0} />
                <Text
                  fontSize="xs"
                  flex="1"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Text>
                <Text fontSize="xs" color="text.muted" flexShrink={0}>
                  {formatRelativeTime(item.createdAt)}
                </Text>
              </Flex>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}
