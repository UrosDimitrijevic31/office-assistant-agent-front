"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";

import { registerSchema, type RegisterFormValues } from "../register-schema";
import { RegisterHeader } from "./register-header";
import { useSignUp } from "@/features/auth/auth.hooks";

export function RegisterFormPanel() {
  const router = useRouter();
  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Nalog je uspešno kreiran.");
      router.push("/login");
    } catch {
      toast.error(
        "Registracija nije uspela. Proverite podatke i pokušajte ponovo.",
      );
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
      <Box w="full" maxW="420px">
        <RegisterHeader />

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={5}>
            <FieldRoot w="full" invalid={!!errors.name}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Ime i prezime
              </FieldLabel>

              <Input
                {...register("name")}
                placeholder="Uroš Dimitrijević"
                size="lg"
                bg="bg.surface"
                borderColor="border"
                borderRadius="lg"
              />

              <FieldErrorText fontSize="xs">
                {errors.name?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot w="full" invalid={!!errors.email}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Email adresa
              </FieldLabel>

              <Input
                {...register("email")}
                type="email"
                placeholder="ime@kompanija.com"
                size="lg"
                bg="bg.surface"
                borderColor="border"
                borderRadius="lg"
              />

              <FieldErrorText fontSize="xs">
                {errors.email?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot w="full" invalid={!!errors.password}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Lozinka
              </FieldLabel>

              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                size="lg"
                bg="bg.surface"
                borderColor="border"
                borderRadius="lg"
              />

              <FieldErrorText fontSize="xs">
                {errors.password?.message}
              </FieldErrorText>
            </FieldRoot>

            <FieldRoot w="full" invalid={!!errors.confirmPassword}>
              <FieldLabel fontSize="sm" fontWeight="medium">
                Potvrdite lozinku
              </FieldLabel>

              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                size="lg"
                bg="bg.surface"
                borderColor="border"
                borderRadius="lg"
              />

              <FieldErrorText fontSize="xs">
                {errors.confirmPassword?.message}
              </FieldErrorText>
            </FieldRoot>

            <Button
              type="submit"
              w="full"
              size="lg"
              loading={signUp.isPending}
              loadingText="Kreiranje naloga..."
              borderRadius="lg"
              fontWeight="semibold"
              mt={1}
              color="white"
              bg="gray.900"
              _hover={{ bg: "gray.800" }}
            >
              Kreirajte nalog
            </Button>
          </VStack>
        </form>

        <Text textAlign="center" mt={6} color="text.muted" fontSize="sm">
          Već imate nalog?{" "}
          <Link
            href="/login"
            style={{
              color: "#7c3aed",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Prijavite se
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
