"use client";

import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Brain, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession, useSignOut } from "@/features/auth/auth.hooks";

function getInitials(name?: string | null) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
}

export function UserMenu() {
  const router = useRouter();
  const { data: session } = useSession();
  const signOut = useSignOut();
  const user = session?.data?.user;

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      router.push("/login");
    } catch {
      toast.error("Odjava nije uspela.");
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Box
          as="button"
          w="9"
          h="9"
          borderRadius="full"
          background="linear-gradient(135deg, #4f46e5, #7c3aed)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          cursor="pointer"
          flexShrink={0}
          _hover={{ opacity: 0.85 }}
          transition="opacity 0.15s"
        >
          {getInitials(user?.name)}
        </Box>
      </MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent minW="220px" py={1}>
            <Flex px={3} py={2.5} flexDirection="column" gap={0.5}>
              <Text fontWeight="semibold" fontSize="sm" lineHeight="1.3">
                {user?.name ?? "—"}
              </Text>
              <Text fontSize="xs" color="text.muted">
                {user?.email ?? "—"}
              </Text>
            </Flex>

            <MenuSeparator />

            <MenuItem
              value="profile"
              cursor="pointer"
              onClick={() => router.push("/dashboard/profile")}
            >
              <Flex alignItems="center" gap={2.5}>
                <Icon as={User} boxSize={4} color="text.muted" />
                <Text fontSize="sm">Profile</Text>
              </Flex>
            </MenuItem>

            <MenuItem
              value="settings"
              cursor="pointer"
              onClick={() => router.push("/dashboard/settings")}
            >
              <Flex alignItems="center" gap={2.5}>
                <Icon as={Settings} boxSize={4} color="text.muted" />
                <Text fontSize="sm">Settings</Text>
              </Flex>
            </MenuItem>

            <MenuItem
              value="preferences"
              cursor="pointer"
              onClick={() => router.push("/dashboard/preferences")}
            >
              <Flex alignItems="center" gap={2.5}>
                <Icon as={Brain} boxSize={4} color="text.muted" />
                <Text fontSize="sm">Preferences</Text>
              </Flex>
            </MenuItem>

            <MenuSeparator />

            <MenuItem
              value="signout"
              cursor="pointer"
              color="red.500"
              onClick={handleSignOut}
            >
              <Flex alignItems="center" gap={2.5}>
                <Icon as={LogOut} boxSize={4} />
                <Text fontSize="sm">Sign out</Text>
              </Flex>
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuRoot>
  );
}
