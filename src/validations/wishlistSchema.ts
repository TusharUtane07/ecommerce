import * as z from "zod";

export const wishlistProductSchema = z.object({
    user: z.string().min(1, { message: "User is required" }),
    products: z.array(z.string().min(1, { message: "Product ID is required" })),
});
