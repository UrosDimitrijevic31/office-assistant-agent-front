"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { Monitor } from "lucide-react";
import { UserMenu } from "./user-menu";
import { redirect } from "next/navigation";

export function DashboardHeader() {
  return (
    <Flex
      as="header"
      px={6}
      h="16"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg.surface"
    >
      <Flex alignItems="center" gap={3}>
        <Flex
          w="8"
          h="8"
          borderRadius="lg"
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon
            as={Monitor}
            boxSize={4}
            color="white"
            onClick={() => redirect("/chat")}
          />
        </Flex>

        <Text fontWeight="semibold" fontSize="sm" letterSpacing="-0.01em">
          Office Assistant
        </Text>
      </Flex>

      <UserMenu />
    </Flex>
  );
}
