"use client";

import { Grid } from "@chakra-ui/react";
import { CalendarCheck, Mail, Ticket } from "lucide-react";
import { QuickActionCard } from "./quick-action-card";

const QUICK_ACTIONS = [
  {
    icon: CalendarCheck,
    title: "Zakaži sastanak",
    description: "Organizujte sastanak sa kolegama ili klijentima.",
    examplePrompt: "Zakaži sastanak sa Markom sutra u 10h.",
  },
  {
    icon: Mail,
    title: "Pošalji mejl",
    description: "Pripremite profesionalni mejl uz pomoć AI asistenta.",
    examplePrompt: "Napiši mejl klijentu sa kratkim statusom projekta.",
  },
  {
    icon: Ticket,
    title: "Kreiraj tiket",
    description: "Prijavite grešku ili zadatak direktno iz razgovora.",
    examplePrompt: "Kreiraj tiket za problem sa login formom.",
  },
] as const;

interface QuickActionsGridProps {
  onSelect: (prompt: string) => void;
}

export function QuickActionsGrid({ onSelect }: QuickActionsGridProps) {
  return (
    <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={3}>
      {QUICK_ACTIONS.map((action) => (
        <QuickActionCard
          key={action.title}
          icon={action.icon}
          title={action.title}
          description={action.description}
          examplePrompt={action.examplePrompt}
          onSelect={onSelect}
        />
      ))}
    </Grid>
  );
}
