"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";

export function EmptyChatState() {
  return (
    <Flex
      flex="1"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={10}
      textAlign="center"
    >
      <Icon as={MessageSquare} boxSize={7} color="text.muted" opacity={0.4} />
      <Text fontSize="sm" color="text.muted">
        Ovde će se prikazivati razgovor
      </Text>
      <Text fontSize="xs" color="text.muted" opacity={0.7}>
        Pošaljite poruku ili izaberite brzu akciju iznad
      </Text>
    </Flex>
  );
}
