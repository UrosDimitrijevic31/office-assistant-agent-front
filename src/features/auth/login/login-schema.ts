import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Unesite ispravnu email adresu."),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
