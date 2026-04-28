"use client";

import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

export function PreferencesPage() {
  return (
    <Box maxW="640px" mx="auto" px={6} py={8}>
      <Flex alignItems="center" gap={3} mb={8}>
        <Link href="/dashboard">
          <IconButton variant="ghost" size="sm" aria-label="Back" borderRadius="lg">
            <Icon as={ArrowLeft} boxSize={4} />
          </IconButton>
        </Link>
        <Heading fontSize="xl" fontWeight="bold" letterSpacing="-0.02em">
          Preferences
        </Heading>
      </Flex>

      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={10}
        textAlign="center"
      >
        <Flex
          w="14"
          h="14"
          borderRadius="2xl"
          background="linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.12))"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb={4}
        >
          <Icon as={Brain} boxSize={6} color="purple.500" />
        </Flex>

        <Heading fontSize="lg" fontWeight="bold" letterSpacing="-0.02em" mb={2}>
          AI Preferences
        </Heading>

        <Text color="text.muted" fontSize="sm" lineHeight="1.7" maxW="340px" mx="auto">
          Custom AI rules, agent prompts, and behavior overrides will be
          configurable here. Coming soon.
        </Text>
      </Box>
    </Box>
  );
}
