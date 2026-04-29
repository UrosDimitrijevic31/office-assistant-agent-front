"use client";

import { Box, Flex, Icon, Text } from "@chakra-ui/react";

interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  examplePrompt: string;
  onSelect: (prompt: string) => void;
}

export function QuickActionCard({
  icon: CardIcon,
  title,
  description,
  examplePrompt,
  onSelect,
}: QuickActionCardProps) {
  return (
    <Box
      as="button"
      onClick={() => onSelect(examplePrompt)}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="xl"
      p={4}
      textAlign="left"
      w="full"
      cursor="pointer"
      transition="all 0.15s"
      _hover={{
        borderColor: "purple.300",
        bg: "purple.50",
        _dark: { bg: "rgba(124,58,237,0.08)", borderColor: "purple.700" },
      }}
    >
      <Flex
        w="8"
        h="8"
        borderRadius="lg"
        bg="purple.50"
        _dark={{ bg: "rgba(124,58,237,0.12)" }}
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <Icon as={CardIcon} boxSize={4} color="purple.500" />
      </Flex>

      <Text fontWeight="semibold" fontSize="sm" mb={1}>
        {title}
      </Text>

      <Text fontSize="xs" color="text.muted" lineHeight="1.6" mb={3}>
        {description}
      </Text>

      <Box
        bg="bg"
        _dark={{ bg: "rgba(0,0,0,0.2)" }}
        borderRadius="lg"
        px={3}
        py={2}
      >
        <Text
          fontSize="xs"
          color="text.muted"
          fontStyle="italic"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          &ldquo;{examplePrompt}&rdquo;
        </Text>
      </Box>
    </Box>
  );
}
