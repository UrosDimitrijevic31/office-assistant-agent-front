"use client";

import { Badge, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { CalendarCheck, Check, Mail, Ticket, X } from "lucide-react";
import type { AgentIntent, ApprovalPreview } from "../agent.types";

interface ApprovalPreviewCardProps {
  approvalId: string;
  intent: AgentIntent;
  preview: ApprovalPreview;
}

const intentConfig: Record<
  AgentIntent,
  { label: string; icon: React.ElementType }
> = {
  schedule_meeting: { label: "Zakazivanje sastanka", icon: CalendarCheck },
  send_email: { label: "Slanje emaila", icon: Mail },
  create_ticket: { label: "Kreiranje tiketa", icon: Ticket },
  unknown: { label: "Akcija", icon: Check },
};

export function ApprovalPreviewCard({
  approvalId,
  intent,
  preview,
}: ApprovalPreviewCardProps) {
  const { label, icon: IntentIcon } = intentConfig[intent] ?? intentConfig.unknown;

  return (
    <Box
      mt={3}
      p={4}
      bg="bg"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      borderLeftWidth="3px"
      borderLeftColor="purple.500"
    >
      <Flex alignItems="center" gap={2} mb={3}>
        <Icon as={IntentIcon} boxSize={4} color="purple.500" />
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="purple.600"
          _dark={{ color: "purple.300" }}
        >
          {label}
        </Text>
        <Text fontSize="xs" color="text.muted" ml="auto">
          #{approvalId.slice(0, 8)}
        </Text>
      </Flex>

      {preview.title && (
        <Box mb={2}>
          <Text fontSize="xs" color="text.muted" fontWeight="medium" mb={0.5}>
            Naziv
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {preview.title}
          </Text>
        </Box>
      )}

      {preview.participants && preview.participants.length > 0 && (
        <Box mb={3}>
          <Text fontSize="xs" color="text.muted" fontWeight="medium" mb={1}>
            Učesnici
          </Text>
          <Flex flexWrap="wrap" gap={1}>
            {preview.participants.map((p) => (
              <Badge key={p} colorPalette="purple" variant="subtle" fontSize="xs">
                {p}
              </Badge>
            ))}
          </Flex>
        </Box>
      )}

      <Flex
        gap={2}
        mt={3}
        pt={3}
        borderTopWidth="1px"
        borderColor="border"
      >
        <Button
          size="sm"
          colorPalette="green"
          borderRadius="lg"
          flex="1"
          disabled
        >
          <Icon as={Check} boxSize={3.5} />
          Odobri
        </Button>
        <Button
          size="sm"
          colorPalette="red"
          variant="outline"
          borderRadius="lg"
          flex="1"
          disabled
        >
          <Icon as={X} boxSize={3.5} />
          Odbij
        </Button>
      </Flex>
    </Box>
  );
}
