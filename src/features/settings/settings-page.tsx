"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, Code2, Moon, Monitor, Sun, Type } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  useAppearanceStore,
  type FontFamily,
  type FontSize,
} from "@/store/appearance.store";

interface OptionCardProps {
  label: string;
  description?: string;
  icon: React.ElementType;
  isSelected: boolean;
  onClick: () => void;
}

function OptionCard({
  label,
  description,
  icon: IconComp,
  isSelected,
  onClick,
}: OptionCardProps) {
  return (
    <Box
      as="button"
      onClick={onClick}
      p={4}
      borderRadius="xl"
      borderWidth="2px"
      borderColor={isSelected ? "purple.500" : "border"}
      bg={isSelected ? "purple.50" : "bg.surface"}
      _dark={{ bg: isSelected ? "rgba(124,58,237,0.12)" : "bg.surface" }}
      cursor="pointer"
      transition="all 0.15s"
      textAlign="left"
      w="full"
    >
      <Icon
        as={IconComp}
        boxSize={5}
        mb={2}
        color={isSelected ? "purple.500" : "text.muted"}
      />
      <Text
        fontWeight="semibold"
        fontSize="sm"
        color={isSelected ? "purple.600" : "text"}
        _dark={{ color: isSelected ? "purple.300" : "text" }}
      >
        {label}
      </Text>
      {description && (
        <Text fontSize="xs" color="text.muted" mt={0.5}>
          {description}
        </Text>
      )}
    </Box>
  );
}

interface SizeCardProps {
  label: string;
  sample: string;
  isSelected: boolean;
  onClick: () => void;
}

function SizeCard({ label, sample, isSelected, onClick }: SizeCardProps) {
  return (
    <Box
      as="button"
      onClick={onClick}
      p={4}
      borderRadius="xl"
      borderWidth="2px"
      borderColor={isSelected ? "purple.500" : "border"}
      bg={isSelected ? "purple.50" : "bg.surface"}
      _dark={{ bg: isSelected ? "rgba(124,58,237,0.12)" : "bg.surface" }}
      cursor="pointer"
      transition="all 0.15s"
      textAlign="left"
      w="full"
    >
      <Text
        fontWeight="bold"
        color={isSelected ? "purple.500" : "text.muted"}
        mb={1}
        lineHeight="1"
        fontSize={sample}
      >
        Aa
      </Text>
      <Text
        fontWeight="semibold"
        fontSize="xs"
        color={isSelected ? "purple.600" : "text"}
        _dark={{ color: isSelected ? "purple.300" : "text" }}
      >
        {label}
      </Text>
    </Box>
  );
}

export function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { fontFamily, fontSize, setFontFamily, setFontSize } =
    useAppearanceStore();

  useEffect(() => setMounted(true), []);

  return (
    <Box maxW="640px" mx="auto" px={6} py={8}>
      <Flex alignItems="center" gap={3} mb={8}>
        <Link href="/dashboard">
          <IconButton variant="ghost" size="sm" aria-label="Back" borderRadius="lg">
            <Icon as={ArrowLeft} boxSize={4} />
          </IconButton>
        </Link>
        <Heading fontSize="xl" fontWeight="bold" letterSpacing="-0.02em">
          Settings
        </Heading>
      </Flex>

      {/* Theme */}
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={6}
        mb={4}
      >
        <Text fontWeight="semibold" fontSize="sm" mb={5} color="text.muted">
          THEME
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          <OptionCard
            label="Light"
            icon={Sun}
            isSelected={mounted && theme === "light"}
            onClick={() => setTheme("light")}
          />
          <OptionCard
            label="Dark"
            icon={Moon}
            isSelected={mounted && theme === "dark"}
            onClick={() => setTheme("dark")}
          />
          <OptionCard
            label="System"
            icon={Monitor}
            isSelected={!mounted || theme === "system"}
            onClick={() => setTheme("system")}
          />
        </Grid>
      </Box>

      {/* Font family */}
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={6}
        mb={4}
      >
        <Text fontWeight="semibold" fontSize="sm" mb={5} color="text.muted">
          FONT
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          <OptionCard
            label="Sans-serif"
            description="Clean, modern"
            icon={Type}
            isSelected={fontFamily === "sans"}
            onClick={() => setFontFamily("sans" as FontFamily)}
          />
          <OptionCard
            label="Serif"
            description="Classic, editorial"
            icon={Type}
            isSelected={fontFamily === "serif"}
            onClick={() => setFontFamily("serif" as FontFamily)}
          />
          <OptionCard
            label="Monospace"
            description="Code-style"
            icon={Code2}
            isSelected={fontFamily === "mono"}
            onClick={() => setFontFamily("mono" as FontFamily)}
          />
        </Grid>
      </Box>

      {/* Font size */}
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={6}
      >
        <Text fontWeight="semibold" fontSize="sm" mb={5} color="text.muted">
          FONT SIZE
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          <SizeCard
            label="Small"
            sample="14px"
            isSelected={fontSize === "sm"}
            onClick={() => setFontSize("sm" as FontSize)}
          />
          <SizeCard
            label="Medium"
            sample="16px"
            isSelected={fontSize === "md"}
            onClick={() => setFontSize("md" as FontSize)}
          />
          <SizeCard
            label="Large"
            sample="18px"
            isSelected={fontSize === "lg"}
            onClick={() => setFontSize("lg" as FontSize)}
          />
        </Grid>
      </Box>
    </Box>
  );
}
