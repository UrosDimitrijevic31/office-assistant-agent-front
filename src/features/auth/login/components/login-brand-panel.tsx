"use client";

import { Box, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import {
  CalendarCheck,
  Check,
  FileText,
  Mail,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const featureIcons = [Mail, CalendarCheck, FileText, ShieldCheck];

export function LoginBrandPanel() {
  const { t } = useTranslation();
  const features = t("brand.features", { returnObjects: true }) as string[];

  return (
    <Box
      display="flex"
      w="45%"
      minH="100vh"
      flexDirection="column"
      justifyContent="space-between"
      p={12}
      position="relative"
      overflow="hidden"
      background="linear-gradient(160deg, #111827 0%, #1e1b4b 48%, #312e81 100%)"
      color="white"
    >
      <Box
        position="absolute"
        inset="0"
        background="radial-gradient(circle at 20% 15%, rgba(99,102,241,0.28), transparent 32%), radial-gradient(circle at 85% 75%, rgba(168,85,247,0.18), transparent 30%)"
      />

      <Flex alignItems="center" gap={3} zIndex={1}>
        <Flex
          w="10"
          h="10"
          borderRadius="xl"
          bg="rgba(255,255,255,0.08)"
          border="1px solid rgba(255,255,255,0.12)"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Monitor} boxSize={5} />
        </Flex>

        <Text fontWeight="semibold" fontSize="md" letterSpacing="-0.02em">
          {t("brand.name")}
        </Text>
      </Flex>

      <VStack alignItems="flex-start" gap={8} zIndex={1} maxW="430px">
        <VStack alignItems="flex-start" gap={4}>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.14em"
            color="rgba(255,255,255,0.55)"
            fontWeight="semibold"
          >
            Corporate AI Workspace
          </Text>

          <Heading
            fontSize={{ md: "4xl", xl: "5xl" }}
            lineHeight="1.05"
            letterSpacing="-0.04em"
            fontWeight="bold"
          >
            {t("brand.tagline")}
          </Heading>

          <Text color="rgba(255,255,255,0.68)" fontSize="md" lineHeight="1.8">
            {t("brand.description")}
          </Text>
        </VStack>

        <VStack alignItems="stretch" gap={3} w="full">
          {features.map((feature, index) => {
            const FeatureIcon = featureIcons[index] ?? Check;

            return (
              <Flex
                key={feature}
                alignItems="center"
                gap={3}
                p={3}
                borderRadius="xl"
                bg="rgba(255,255,255,0.06)"
                border="1px solid rgba(255,255,255,0.08)"
              >
                <Flex
                  w="8"
                  h="8"
                  borderRadius="lg"
                  bg="rgba(255,255,255,0.08)"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Icon
                    as={FeatureIcon}
                    boxSize={4}
                    color="rgba(255,255,255,0.86)"
                  />
                </Flex>

                <Text
                  color="rgba(255,255,255,0.82)"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  {feature}
                </Text>
              </Flex>
            );
          })}
        </VStack>
      </VStack>

      <Flex zIndex={1} justifyContent="space-between" alignItems="center">
        <Text color="rgba(255,255,255,0.38)" fontSize="xs">
          {t("brand.copyright")}
        </Text>

        <Flex alignItems="center" gap={2} color="rgba(255,255,255,0.48)">
          <Icon as={ShieldCheck} boxSize={4} />
          <Text fontSize="xs">Secure workspace</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
