import { z } from "zod";

export const productValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must not exceed 100 characters"),
  price: z
    .string(),
  description: z
    .string(),
  category: z
    .string(),
  brand: z
    .string(),
  imageUrl: z
    .string(),
})

export type ProductInput = z.infer<typeof productValidationSchema>;
