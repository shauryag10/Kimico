import { z } from "zod";

/** Shared between the client form and the /api/contact route. */
export const contactSchema = z.object({
  enquiryType: z.enum(["distributor", "general"]),
  name: z.string().trim().min(2, "Please tell us your name"),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("That email doesn’t look right"),
  phone: z
    .string()
    .trim()
    .min(7, "Please add a phone number")
    .regex(/^[+\d\s()-]+$/, "Digits, spaces and + only"),
  country: z.string().trim().min(2, "Which country are you in?"),
  city: z.string().trim().min(2, "And which city?"),
  interests: z.array(z.string()).optional(),
  sku: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "A sentence or two helps us reply well"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
