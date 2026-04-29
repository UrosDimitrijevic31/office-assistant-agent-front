"use client";

import { Badge, Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { CalendarCheck, Check, Mail, Ticket, X } from "lucide-react";
import type { ActionIntent, PendingApproval } from "../agent.types";

interface PendingApprovalsSectionProps {
  approvals: PendingApproval[];
}

const intentConfig: Record<
  ActionIntent,
  { label: string; icon: React.ElementType }
> = {
  schedule_meeting: { label: "Zakazivanje sastanka", icon: CalendarCheck },
  send_email: { label: "Slanje emaila", icon: Mail },
  create_ticket: { label: "Kreiranje tiketa", icon: Ticket },
};

export function PendingApprovalsSection({
  approvals,
}: PendingApprovalsSectionProps) {
  return (
    <Box>
      <Flex alignItems="center" gap={2} mb={3}>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="text.muted"
          letterSpacing="0.06em"
        >
          NA ČEKANJU
        </Text>

        {approvals.length > 0 && (
          <Badge colorPalette="orange" variant="subtle" fontSize="xs" px={1.5}>
            {approvals.length}
          </Badge>
        )}
      </Flex>

      {approvals.length === 0 ? (
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
            Nema akcija koje čekaju odobrenje.
          </Text>
        </Box>
      ) : (
        <VStack gap={2} alignItems="stretch">
          {approvals.map((approval) => (
            <PendingApprovalItem key={approval.id} approval={approval} />
          ))}
        </VStack>
      )}
    </Box>
  );
}

function PendingApprovalItem({ approval }: { approval: PendingApproval }) {
  const { label, icon: IntentIcon } = intentConfig[approval.intent];
  const title =
    typeof approval.preview.title === "string"
      ? approval.preview.title
      : undefined;

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border"
      borderLeftWidth="3px"
      borderLeftColor="purple.500"
      borderRadius="xl"
      p={3}
    >
      <Flex alignItems="center" gap={2} mb={2}>
        <Icon as={IntentIcon} boxSize={3.5} color="purple.500" flexShrink={0} />
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="purple.600"
          _dark={{ color: "purple.300" }}
        >
          {label}
        </Text>
        <Text fontSize="xs" color="text.muted" ml="auto" flexShrink={0}>
          #{approval.id.slice(0, 6)}
        </Text>
      </Flex>

      {title && (
        <Text
          fontSize="xs"
          fontWeight="medium"
          mb={2}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {title}
        </Text>
      )}

      <Flex gap={1.5}>
        <Button
          size="xs"
          colorPalette="green"
          flex="1"
          disabled
          borderRadius="lg"
        >
          <Icon as={Check} boxSize={3} />
          Odobri
        </Button>
        <Button
          size="xs"
          colorPalette="red"
          variant="outline"
          flex="1"
          disabled
          borderRadius="lg"
        >
          <Icon as={X} boxSize={3} />
          Odbij
        </Button>
      </Flex>
    </Box>
  );
}
