"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MobileLogo() {
  const { t } = useTranslation();

  return (
    <Flex display={{ md: "none" }} alignItems="center" gap={2} mb={10}>
      <Flex
        w="8"
        h="8"
        borderRadius="md"
        bgGradient="linear(135deg, #4f46e5, #a21caf)"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={Monitor} color="white" boxSize={4} />
      </Flex>

      <Text fontWeight="bold" fontSize="md" color="text">
        {t("brand.name")}
      </Text>
    </Flex>
  );
}
