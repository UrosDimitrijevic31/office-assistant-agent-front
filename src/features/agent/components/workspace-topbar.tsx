"use client";

import { Badge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { UserMenu } from "@/features/dashboard/components/user-menu";

export function WorkspaceTopbar() {
  return (
    <Flex
      as="header"
      px={6}
      h="14"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg.surface"
      flexShrink={0}
    >
      <Flex alignItems="center" gap={3}>
        <Flex
          w="7"
          h="7"
          borderRadius="lg"
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon as={Bot} boxSize={3.5} color="white" />
        </Flex>

        <Box>
          <Text
            fontWeight="semibold"
            fontSize="sm"
            letterSpacing="-0.01em"
            lineHeight="1.3"
          >
            Office Assistant
          </Text>
          <Text fontSize="xs" color="text.muted" lineHeight="1.3">
            AI Workspace
          </Text>
        </Box>
      </Flex>

      <Flex alignItems="center" gap={3}>
        <Badge colorPalette="green" variant="subtle" fontSize="xs" px={2} py={1}>
          <Flex alignItems="center" gap={1.5}>
            <Box w="1.5" h="1.5" borderRadius="full" bg="green.500" flexShrink={0} />
            AI spreman
          </Flex>
        </Badge>

        <UserMenu />
      </Flex>
    </Flex>
  );
}
