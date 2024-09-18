import dbConnect from "@/database/databaseConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { productId, quantity } = await request.json();

        const userId = await getDataFromToken(request);

        if (!userId || !productId || !quantity) {
            return NextResponse.json({ result: false, message: "All fields (userId, productId, quantity) are required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            const existingProduct = cart.products.find(p => String(p.product) === String(productId));
            if (existingProduct) {
                return NextResponse.json({ result: false, message: "Product already in cart" }, { status: 409 });
            }

            cart.products.push({ product: productId, quantity });
            await cart.save();
        } else {
            await Cart.create({ user: userId, products: [{ product: productId, quantity }] });
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

export async function PATCH(request: NextRequest) {
    try {
        await dbConnect();
        const { productId, quantity } = await request.json();

        const userId = await getDataFromToken(request);

        if (!userId || !productId || !quantity) {
            return NextResponse.json({ result: false, message: "User ID, Product ID and quantity are required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({ result: false, message: "Cart not found" }, { status: 404 });
        }

        const product = cart.products.find((p) => String(p.product) === String(productId));

        if (!product) {
            return NextResponse.json({ result: false, message: "Product not found in cart" }, { status: 404 });
        }

        product.quantity = quantity;
        await cart.save();

        return NextResponse.json({ result: true, message: "Product updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const { productId } = await request.json();

        const userId = await getDataFromToken(request);


        if (!userId || !productId) {
            return NextResponse.json({ result: false, message: "User ID and Product ID are required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({ result: false, message: "Cart not found" }, { status: 404 });
        }

        const productIndex = cart.products.findIndex((p) => String(p.product) === String(productId));

        if (productIndex === -1) {
            return NextResponse.json({ result: false, message: "Product not found in cart" }, { status: 404 });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        return NextResponse.json({ result: true, message: "Product removed from cart" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}
