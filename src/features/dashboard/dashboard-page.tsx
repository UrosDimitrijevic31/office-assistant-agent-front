"use client";

import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useSession } from "@/features/auth/auth.hooks";

export function DashboardPage() {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return (
      <Flex flex="1" alignItems="center" justifyContent="center">
        <Spinner size="lg" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Flex flex="1" alignItems="center" justifyContent="center" p={6}>
      <Flex
        flexDirection="column"
        alignItems="center"
        gap={3}
        textAlign="center"
        maxW="480px"
      >
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          letterSpacing="-0.03em"
        >
          Dobrodošli
          {session?.data?.user?.name ? `, ${session.data.user.name}` : ""}
        </Heading>

        <Text color="text.muted" fontSize="md" lineHeight="1.7">
          Vaš AI radni prostor je spreman. Funkcionalnosti su u razvoju.
        </Text>
      </Flex>
    </Flex>
  );
}
