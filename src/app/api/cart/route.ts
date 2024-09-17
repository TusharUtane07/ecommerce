import dbConnect from "@/database/databaseConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { userId, productId, quantity, price } = await request.json();

        if (!userId || !productId || !quantity || !price) {
            return NextResponse.json({ result: false, message: "All fields (userId, productId, quantity, price) are required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Convert productId to string to match with existing products in cart
            const existingProduct = cart.products.find(p => String(p.product) === String(productId));
            if (existingProduct) {
                return NextResponse.json({ result: false, message: "Product already in cart" }, { status: 409 });
            }

            // Add new product to the cart if it's not already present
            cart.products.push({ product: productId, quantity, price });
            await cart.save();
        } else {
            // Create a new cart with the product
            await Cart.create({ user: userId, products: [{ product: productId, quantity, price }] });
        }

        return NextResponse.json({ message: "Product added to cart", result: true }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}
export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ result: false, message: "User ID is required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return NextResponse.json({ result: false, message: "Cart is empty" }, { status: 404 });
        }

        return NextResponse.json({ cart, result: true, message: "Cart fetched successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}
