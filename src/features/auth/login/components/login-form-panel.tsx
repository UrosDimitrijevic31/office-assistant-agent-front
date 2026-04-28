"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Button,
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { loginSchema, type LoginFormValues } from "../login-schema";
import { LoginHeader } from "./login-header";
import { MobileLogo } from "./mobile-logo";
import { PasswordInput } from "./password-input";
import { useSignIn } from "@/features/auth/auth.hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginFormPanel() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn.mutateAsync({ email: data.email, password: data.password });
      router.push("/dashboard");
    } catch {
      toast.error("Prijava nije uspela. Proverite email i lozinku.");
    }
  };

  return (
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="center"
      bg="bg"
      p={{ base: 6, md: 12 }}
    >
      <Box w="full" maxW="400px">
        <MobileLogo />
        <LoginHeader />

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={5}>
            <FieldRoot w="full" invalid={!!errors.email}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                {t("login.emailLabel")}
              </FieldLabel>

              <Input
                {...register("email")}
                type="email"
                placeholder={t("login.emailPlaceholder")}
                size="lg"
                bg="bg.surface"
                borderColor="border"
                borderRadius="lg"
                _hover={{ borderColor: "purple.300" }}
                _focusVisible={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.12)",
                  outline: "none",
                }}
              />

              <FieldErrorText fontSize="xs">
                {errors.email?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot w="full" invalid={!!errors.password}>
              <Flex w="full" justifyContent="space-between" alignItems="center">
                <FieldLabel fontSize="sm" fontWeight="medium" mb={0}>
                  {t("login.passwordLabel")}
                </FieldLabel>

                <Link
                  href="/forgot-password"
                  style={{
                    fontSize: "12px",
                    color: "#7c3aed",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {t("login.forgotPassword")}
                </Link>
              </Flex>

              <PasswordInput
                register={register("password")}
                showPassword={showPassword}
                onToggle={() => setShowPassword((value) => !value)}
                ariaLabel={
                  showPassword
                    ? t("login.hidePassword")
                    : t("login.showPassword")
                }
              />

              <FieldErrorText fontSize="xs">
                {errors.password?.message}
              </FieldErrorText>
            </FieldRoot>

            <Button
              type="submit"
              w="full"
              size="lg"
              loading={signIn.isPending}
              loadingText={t("login.submitting")}
              borderRadius="lg"
              fontWeight="semibold"
              mt={1}
              color="white"
              bgGradient="linear(135deg, #4f46e5 0%, #7c3aed 100%)"
            >
              {t("login.submit")}
            </Button>
          </VStack>
        </form>

        <Text textAlign="center" mt={6} color="text.muted" fontSize="sm">
          {t("login.noAccount")}{" "}
          <Link
            href="/register"
            style={{
              color: "#7c3aed",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {t("login.createOne")}
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
