import z from "zod";

export const recentLeadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  intent: z.string(),
  createdAt: z.string(),
});
