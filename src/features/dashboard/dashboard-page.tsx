"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Monitor, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession, useSignOut } from "@/features/auth/auth.hooks";

export function DashboardPage() {
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      router.push("/login");
    } catch {
      toast.error("Odjava nije uspela. Pokušajte ponovo.");
    }
  };

  if (isLoading) {
    return (
      <Flex minH="100vh" alignItems="center" justifyContent="center" bg="bg">
        <Spinner size="lg" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" flexDirection="column" bg="bg">
      <Flex
        as="header"
        px={6}
        h="16"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderColor="border"
      >
        <Flex alignItems="center" gap={3}>
          <Flex
            w="8"
            h="8"
            borderRadius="lg"
            background="linear-gradient(135deg, #4f46e5, #7c3aed)"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={Monitor} boxSize={4} color="white" />
          </Flex>
          <Text fontWeight="semibold" fontSize="sm" letterSpacing="-0.01em">
            Office Assistant
          </Text>
        </Flex>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleSignOut}
          loading={signOut.isPending}
          loadingText="Odjavljivanje..."
          color="text.muted"
          gap={2}
        >
          <Icon as={LogOut} boxSize={4} />
          Odjavi se
        </Button>
      </Flex>

      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={4}
        p={6}
      >
        <Box textAlign="center" maxW="480px">
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            letterSpacing="-0.03em"
            mb={3}
          >
            Dobrodošli
            {session?.data?.user?.name ? `, ${session.data.user.name}` : ""}
          </Heading>

          <Text color="text.muted" fontSize="md" lineHeight="1.7">
            Vaš AI radni prostor je spreman. Funkcionalnosti su u razvoju.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
