import * as z from "zod";

export const cartProductSchema = z.object({
    user: z.string().min(1, { message: "User is required" }),
    products: z.array(z.object({
        product: z.string().min(1, { message: "Product ID is required" }),
        quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        price: z.number().min(0, { message: "Price must be at least 0" })
    })),
});
