"use client";

import { Badge, Box, Button, Flex, Icon, Separator, Text } from "@chakra-ui/react";
import {
  CalendarCheck,
  CalendarDays,
  Check,
  Clock,
  Mail,
  MapPin,
  Pencil,
  Ticket,
  Users,
  X,
} from "lucide-react";
import type { ActionIntent } from "../agent.types";

interface ApprovalPreviewCardProps {
  approvalId: string;
  intent: ActionIntent;
  preview: Record<string, unknown>;
}

// ─── Meeting card ────────────────────────────────────────────────────────────

function MeetingCard({ preview }: { preview: Record<string, unknown> }) {
  const title = typeof preview.title === "string" ? preview.title : "Sastanak";
  const start = typeof preview.start === "string" ? preview.start : null;
  const end = typeof preview.end === "string" ? preview.end : null;
  const participants = Array.isArray(preview.participants)
    ? (preview.participants as unknown[]).filter((p): p is string => typeof p === "string")
    : [];
  const location = typeof preview.location === "string" ? preview.location : null;

  return (
    <>
      {/* Header */}
      <Flex gap={3} alignItems="flex-start" p={4} pb={3}>
        <Flex
          w={9}
          h={9}
          borderRadius="lg"
          bg="purple.50"
          _dark={{ bg: "rgba(124,58,237,0.12)" }}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={CalendarCheck} boxSize={4} color="purple.500" />
        </Flex>

        <Box flex="1" minW={0}>
          <Text fontSize="sm" fontWeight="semibold" mb={2.5}>
            {title}
          </Text>

          <Flex direction="column" gap={1.5}>
            {start && (
              <Flex alignItems="center" gap={2}>
                <Icon as={CalendarDays} boxSize={3.5} color="text.muted" flexShrink={0} />
                <Text fontSize="xs" color="text.muted">
                  {formatDate(start)}
                </Text>
                {end && (
                  <>
                    <Icon as={Clock} boxSize={3.5} color="text.muted" flexShrink={0} />
                    <Text fontSize="xs" color="text.muted">
                      {formatTime(start)} – {formatTime(end)}{" "}
                      <Box as="span" color="text.subtle">({formatDuration(start, end)})</Box>
                    </Text>
                  </>
                )}
              </Flex>
            )}

            {participants.length > 0 && (
              <Flex alignItems="flex-start" gap={2}>
                <Icon as={Users} boxSize={3.5} color="text.muted" flexShrink={0} mt="1px" />
                <Text fontSize="xs" color="text.muted">
                  {participants.join(", ")}
                </Text>
              </Flex>
            )}

            {location && (
              <Flex alignItems="center" gap={2}>
                <Icon as={MapPin} boxSize={3.5} color="text.muted" flexShrink={0} />
                <Text fontSize="xs" color="text.muted">{location}</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>

      <Separator borderColor="border" />

      <Flex gap={2} px={4} py={3} justifyContent="flex-end">
        <Button size="sm" variant="outline" borderRadius="lg" disabled>
          <Icon as={X} boxSize={3.5} />
          Odbij
        </Button>
        <Button
          size="sm"
          borderRadius="lg"
          disabled
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          color="white"
          _hover={{ opacity: 0.9 }}
        >
          <Icon as={Check} boxSize={3.5} />
          Odobri
        </Button>
      </Flex>
    </>
  );
}

// ─── Email card ──────────────────────────────────────────────────────────────

function EmailCard({ preview }: { preview: Record<string, unknown> }) {
  const to = typeof preview.to === "string" ? preview.to : null;
  const subject = typeof preview.subject === "string" ? preview.subject : "E-mail";
  const body = typeof preview.body === "string" ? preview.body : null;

  return (
    <>
      <Flex gap={3} alignItems="flex-start" p={4} pb={3}>
        <Flex
          w={9}
          h={9}
          borderRadius="lg"
          bg="green.50"
          _dark={{ bg: "rgba(22,163,74,0.1)" }}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={Mail} boxSize={4} color="green.500" />
        </Flex>

        <Box flex="1" minW={0}>
          <Text fontSize="sm" fontWeight="semibold" mb={2.5}>
            {subject}
          </Text>
          <Flex direction="column" gap={1.5}>
            {to && (
              <Flex alignItems="center" gap={2}>
                <Icon as={Mail} boxSize={3.5} color="text.muted" flexShrink={0} />
                <Text fontSize="xs" color="text.muted">{to}</Text>
              </Flex>
            )}
            {body && (
              <Text fontSize="xs" color="text.muted" lineHeight="1.6" noOfLines={3}>
                {body}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>

      <Separator borderColor="border" />

      <Flex gap={2} px={4} py={3} justifyContent="flex-end">
        <Button size="sm" variant="outline" borderRadius="lg" disabled>
          <Icon as={X} boxSize={3.5} />
          Odbij
        </Button>
        <Button
          size="sm"
          borderRadius="lg"
          disabled
          background="linear-gradient(135deg, #16a34a, #15803d)"
          color="white"
        >
          <Icon as={Check} boxSize={3.5} />
          Pošalji mejl
        </Button>
      </Flex>
    </>
  );
}

// ─── Ticket card ─────────────────────────────────────────────────────────────

const PRIORITY_MAP: Record<string, { label: string; color: "red" | "orange" | "green" }> = {
  low: { label: "Nizak", color: "green" },
  medium: { label: "Srednji", color: "orange" },
  high: { label: "Visok", color: "red" },
  critical: { label: "Kritičan", color: "red" },
};

function TicketCard({ preview }: { preview: Record<string, unknown> }) {
  const title = typeof preview.title === "string" ? preview.title : "Tiket";
  const description = typeof preview.description === "string" ? preview.description : null;
  const priority = typeof preview.priority === "string" ? PRIORITY_MAP[preview.priority] : null;
  const type = typeof preview.type === "string" ? preview.type : null;
  const assignee = typeof preview.assignee === "string" ? preview.assignee : null;

  return (
    <>
      <Flex gap={3} alignItems="flex-start" p={4} pb={3}>
        <Flex
          w={9}
          h={9}
          borderRadius="lg"
          bg="orange.50"
          _dark={{ bg: "rgba(234,88,12,0.1)" }}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={Ticket} boxSize={4} color="orange.500" />
        </Flex>

        <Box flex="1" minW={0}>
          <Flex alignItems="center" gap={2} mb={2.5} flexWrap="wrap">
            <Text fontSize="sm" fontWeight="semibold">{title}</Text>
            {priority && (
              <Badge colorPalette={priority.color} variant="subtle" borderRadius="full" fontSize="xs">
                {priority.label}
              </Badge>
            )}
          </Flex>

          <Flex direction="column" gap={1.5}>
            <Flex gap={4} flexWrap="wrap">
              {type && (
                <Text fontSize="xs" color="text.muted">
                  <Box as="span" fontWeight="medium" color="text">Tip: </Box>{type}
                </Text>
              )}
              {assignee && (
                <Text fontSize="xs" color="text.muted">
                  <Box as="span" fontWeight="medium" color="text">Dodeljeno: </Box>{assignee}
                </Text>
              )}
            </Flex>
            {description && (
              <Text fontSize="xs" color="text.muted" lineHeight="1.6" noOfLines={3}>
                <Box as="span" fontWeight="medium" color="text">Opis: </Box>{description}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>

      <Separator borderColor="border" />

      <Flex gap={2} px={4} py={3} justifyContent="flex-end">
        <Button size="sm" variant="outline" borderRadius="lg" disabled>
          <Icon as={Pencil} boxSize={3.5} />
          Izmeni
        </Button>
        <Button size="sm" variant="outline" colorPalette="red" borderRadius="lg" disabled>
          <Icon as={X} boxSize={3.5} />
          Otkaži
        </Button>
        <Button
          size="sm"
          borderRadius="lg"
          disabled
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          color="white"
        >
          <Icon as={Check} boxSize={3.5} />
          Kreiraj tiket
        </Button>
      </Flex>
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function ApprovalPreviewCard({ intent, preview }: ApprovalPreviewCardProps) {
  return (
    <Box
      mt={3}
      bg="bg"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      {intent === "schedule_meeting" && <MeetingCard preview={preview} />}
      {intent === "send_email" && <EmailCard preview={preview} />}
      {intent === "create_ticket" && <TicketCard preview={preview} />}
    </Box>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const date = new Date(iso);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Sutra, ${date.toLocaleDateString("sr-Latn-RS", { day: "numeric", month: "long", year: "numeric" })}`;
  }
  return date.toLocaleDateString("sr-Latn-RS", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" });
}

function formatDuration(start: string, end: string): string {
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}
