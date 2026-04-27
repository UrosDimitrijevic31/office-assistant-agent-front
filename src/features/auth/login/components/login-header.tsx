"use client";

import { Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function LoginHeader() {
  const { t } = useTranslation();

  return (
    <VStack alignItems="flex-start" gap={1} mb={8}>
      <Heading fontSize="2xl" fontWeight="bold" color="text">
        {t("login.title")}
      </Heading>

      <Text color="text.muted" fontSize="sm">
        {t("login.subtitle")}
      </Text>
    </VStack>
  );
}
