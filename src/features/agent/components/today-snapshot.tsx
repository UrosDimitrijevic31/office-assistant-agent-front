"use client";

import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { CalendarCheck, Mail, Ticket } from "lucide-react";
import type { PendingApproval } from "../agent.types";

interface TodaySnapshotProps {
  pendingApprovals: PendingApproval[];
}

export function TodaySnapshot({ pendingApprovals }: TodaySnapshotProps) {
  const meetings = pendingApprovals.filter(
    (a) => a.intent === "schedule_meeting",
  ).length;
  const emails = pendingApprovals.filter(
    (a) => a.intent === "send_email",
  ).length;
  const tickets = pendingApprovals.filter(
    (a) => a.intent === "create_ticket",
  ).length;

  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color="text.muted"
        letterSpacing="0.06em"
        mb={3}
      >
        DANAS
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        <StatCard icon={CalendarCheck} label="Sastanci" value={meetings} />
        <StatCard icon={Mail} label="Mejlovi" value={emails} />
        <StatCard icon={Ticket} label="Tiketi" value={tickets} />
      </Grid>
    </Box>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

function StatCard({ icon: StatIcon, label, value }: StatCardProps) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      p={3}
      textAlign="center"
    >
      <Flex justifyContent="center" mb={1.5}>
        <Icon as={StatIcon} boxSize={4} color="purple.500" />
      </Flex>
      <Text
        fontSize="xl"
        fontWeight="bold"
        letterSpacing="-0.02em"
        lineHeight="1"
        mb={0.5}
      >
        {value}
      </Text>
      <Text fontSize="xs" color="text.muted">
        {label}
      </Text>
    </Box>
  );
}
