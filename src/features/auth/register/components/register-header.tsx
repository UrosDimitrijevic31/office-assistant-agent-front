"use client";

import { Heading, Text, VStack } from "@chakra-ui/react";

export function RegisterHeader() {
  return (
    <VStack alignItems="flex-start" gap={1} mb={8}>
      <Heading fontSize="2xl" fontWeight="bold" color="text">
        Kreirajte nalog
      </Heading>

      <Text color="text.muted" fontSize="sm">
        Unesite podatke za pristup Office Assistant platformi.
      </Text>
    </VStack>
  );
}
