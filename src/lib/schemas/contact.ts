import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  reasons: z.array(z.string()).min(1, "Please select at least one reason"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const reasonOptions = [
  { id: "contribution", label: "Contribution" },
  { id: "membership", label: "Membership" },
  { id: "event", label: "Event participation" },
  { id: "others", label: "Others" },
] as const;
