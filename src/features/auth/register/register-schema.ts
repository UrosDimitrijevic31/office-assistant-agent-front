import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Ime mora imati najmanje 2 karaktera."),
    email: z.string().email("Unesite ispravnu email adresu."),
    password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera."),
    confirmPassword: z.string().min(8, "Potvrdite lozinku."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
