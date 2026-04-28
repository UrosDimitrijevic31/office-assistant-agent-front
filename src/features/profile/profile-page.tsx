"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  useSession,
  useUpdateUser,
  useChangeEmail,
  useChangePassword,
} from "@/features/auth/auth.hooks";

const infoSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 karaktera."),
  email: z.string().email("Unesite ispravnu email adresu."),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Unesite trenutnu lozinku."),
    newPassword: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera."),
    confirmPassword: z.string().min(1, "Potvrdite novu lozinku."),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Lozinke se ne poklapaju.",
    path: ["confirmPassword"],
  });

type InfoValues = z.infer<typeof infoSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.data?.user;

  const updateUser = useUpdateUser();
  const changeEmail = useChangeEmail();
  const changePassword = useChangePassword();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const infoForm = useForm<InfoValues>({
    resolver: zodResolver(infoSchema),
    values: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSaveInfo = async (data: InfoValues) => {
    try {
      const nameChanged = data.name !== user?.name;
      const emailChanged = data.email !== user?.email;

      await Promise.all([
        nameChanged ? updateUser.mutateAsync({ name: data.name }) : null,
        emailChanged
          ? changeEmail.mutateAsync({ newEmail: data.email })
          : null,
      ]);

      if (emailChanged) {
        toast.success(
          "Promene sačuvane. Proverite email za potvrdu nove adrese.",
        );
      } else {
        toast.success("Profil je ažuriran.");
      }
    } catch {
      toast.error("Nije moguće sačuvati promene.");
    }
  };

  const onChangePassword = async (data: PasswordValues) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: false,
      });
      toast.success("Lozinka je promenjena.");
      passwordForm.reset();
    } catch {
      toast.error("Promena lozinke nije uspela. Proverite trenutnu lozinku.");
    }
  };

  const isSavingInfo =
    updateUser.isPending || changeEmail.isPending || infoForm.formState.isSubmitting;

  return (
    <Box maxW="640px" mx="auto" px={6} py={8}>
      <Flex alignItems="center" gap={3} mb={8}>
        <Link href="/dashboard">
          <IconButton variant="ghost" size="sm" aria-label="Back" borderRadius="lg">
            <Icon as={ArrowLeft} boxSize={4} />
          </IconButton>
        </Link>
        <Heading fontSize="xl" fontWeight="bold" letterSpacing="-0.02em">
          Profile
        </Heading>
      </Flex>

      {/* Personal information */}
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={6}
        mb={4}
      >
        <Text fontWeight="semibold" fontSize="sm" mb={5} color="text.muted">
          PERSONAL INFORMATION
        </Text>

        <form onSubmit={infoForm.handleSubmit(onSaveInfo)}>
          <VStack gap={4} alignItems="stretch">
            <FieldRoot invalid={!!infoForm.formState.errors.name}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Full name
              </FieldLabel>
              <Input
                {...infoForm.register("name")}
                size="lg"
                bg="bg"
                borderColor="border"
                borderRadius="lg"
              />
              <FieldErrorText fontSize="xs">
                {infoForm.formState.errors.name?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot invalid={!!infoForm.formState.errors.email}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Email address
              </FieldLabel>
              <Input
                {...infoForm.register("email")}
                type="email"
                size="lg"
                bg="bg"
                borderColor="border"
                borderRadius="lg"
              />
              <FieldErrorText fontSize="xs">
                {infoForm.formState.errors.email?.message}
              </FieldErrorText>
            </FieldRoot>

            <Button
              type="submit"
              alignSelf="flex-end"
              loading={isSavingInfo}
              loadingText="Saving..."
              bg="gray.900"
              color="white"
              _hover={{ bg: "gray.800" }}
              borderRadius="lg"
              size="md"
            >
              Save changes
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Change password */}
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={6}
      >
        <Text fontWeight="semibold" fontSize="sm" mb={5} color="text.muted">
          CHANGE PASSWORD
        </Text>

        <form onSubmit={passwordForm.handleSubmit(onChangePassword)}>
          <VStack gap={4} alignItems="stretch">
            <FieldRoot invalid={!!passwordForm.formState.errors.currentPassword}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Current password
              </FieldLabel>
              <Box position="relative">
                <Input
                  {...passwordForm.register("currentPassword")}
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  size="lg"
                  bg="bg"
                  pr="12"
                  borderColor="border"
                  borderRadius="lg"
                />
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Toggle"
                  position="absolute"
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  color="text.muted"
                  onClick={() => setShowCurrent((v) => !v)}
                >
                  <Icon as={showCurrent ? EyeOff : Eye} boxSize={4} />
                </IconButton>
              </Box>
              <FieldErrorText fontSize="xs">
                {passwordForm.formState.errors.currentPassword?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot invalid={!!passwordForm.formState.errors.newPassword}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                New password
              </FieldLabel>
              <Box position="relative">
                <Input
                  {...passwordForm.register("newPassword")}
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  size="lg"
                  bg="bg"
                  pr="12"
                  borderColor="border"
                  borderRadius="lg"
                />
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Toggle"
                  position="absolute"
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  color="text.muted"
                  onClick={() => setShowNew((v) => !v)}
                >
                  <Icon as={showNew ? EyeOff : Eye} boxSize={4} />
                </IconButton>
              </Box>
              <FieldErrorText fontSize="xs">
                {passwordForm.formState.errors.newPassword?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot invalid={!!passwordForm.formState.errors.confirmPassword}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Confirm new password
              </FieldLabel>
              <Box position="relative">
                <Input
                  {...passwordForm.register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  size="lg"
                  bg="bg"
                  pr="12"
                  borderColor="border"
                  borderRadius="lg"
                />
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Toggle"
                  position="absolute"
                  right="2"
                  top="50%"
                  transform="translateY(-50%)"
                  color="text.muted"
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  <Icon as={showConfirm ? EyeOff : Eye} boxSize={4} />
                </IconButton>
              </Box>
              <FieldErrorText fontSize="xs">
                {passwordForm.formState.errors.confirmPassword?.message}
              </FieldErrorText>
            </FieldRoot>

            <Button
              type="submit"
              alignSelf="flex-end"
              loading={changePassword.isPending}
              loadingText="Updating..."
              bg="gray.900"
              color="white"
              _hover={{ bg: "gray.800" }}
              borderRadius="lg"
              size="md"
            >
              Update password
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
