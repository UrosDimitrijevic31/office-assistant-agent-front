"use client";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { CalendarCheck, Mail, MessageSquare, Ticket } from "lucide-react";

interface EmptyChatStateProps {
  onSend: (message: string) => void;
}

const suggestions = [
  { label: "Zakaži sastanak", icon: CalendarCheck },
  { label: "Pošalji email", icon: Mail },
  { label: "Kreiraj tiket", icon: Ticket },
] as const;

export function EmptyChatState({ onSend }: EmptyChatStateProps) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      gap={8}
      textAlign="center"
    >
      <Box>
        <Flex
          w="16"
          h="16"
          borderRadius="2xl"
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb={5}
        >
          <Icon as={MessageSquare} boxSize={7} color="white" />
        </Flex>

        <Text
          fontSize="xl"
          fontWeight="bold"
          letterSpacing="-0.02em"
          mb={2}
        >
          Šta mogu da uradim za vas?
        </Text>

        <Text
          color="text.muted"
          fontSize="sm"
          maxW="380px"
          lineHeight="1.75"
        >
          Vaš AI asistent za kancelariju. Zakazujte sastanke, šaljite emailove
          i kreirajte tikete glasom ili tekstom.
        </Text>
      </Box>

      <Flex gap={3} flexWrap="wrap" justifyContent="center">
        {suggestions.map(({ label, icon: SuggestionIcon }) => (
          <Box
            key={label}
            as="button"
            onClick={() => onSend(label)}
            px={4}
            py={3}
            bg="bg.surface"
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            cursor="pointer"
            transition="all 0.15s"
            _hover={{
              borderColor: "purple.300",
              bg: "purple.50",
            }}
            _dark={{
              _hover: {
                bg: "rgba(124,58,237,0.1)",
                borderColor: "purple.700",
              },
            }}
          >
            <Flex alignItems="center" gap={2}>
              <Icon as={SuggestionIcon} boxSize={4} color="purple.500" />
              <Text fontSize="sm" fontWeight="medium">
                {label}
              </Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
