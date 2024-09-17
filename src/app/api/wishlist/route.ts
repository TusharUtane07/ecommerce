import dbConnect from "@/database/databaseConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Wishlist from "@/models/Wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { userId, productId } = await request.json();

        if (!userId || !productId) {
            return NextResponse.json({ result: false, message: "User ID and Product ID are required" }, { status: 400 });
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            if (wishlist.products.includes(productId)) {
                return NextResponse.json({ result: false, message: "Item already in wishlist" }, { status: 409 });
            }
            wishlist.products.push(productId);
            await wishlist.save();
        } else {
            await Wishlist.create({ user: userId, products: [productId] });
        }

        return NextResponse.json({ message: "Product added to wishlist", result: true }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}



// Updated GET to fetch wishlist for a specific user
export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ result: false, message: "User ID is required" }, { status: 400 });
        }

        await dbConnect();
        const wishlist = await Wishlist.findOne({ user: userId })
            .populate("user")
            .populate("products");

        if (!wishlist) {
            return NextResponse.json({ result: false, message: "No wishlist found for this user" }, { status: 404 });
        }

        return NextResponse.json({ wishlist, message: "Wishlist fetched successfully", result: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, result: false });
    }
}
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();
        const { userId, productId } = await request.json();

        if (!userId || !productId) {
            return NextResponse.json({ result: false, message: "User ID and Product ID are required" }, { status: 400 });
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(
                (product) => String(product) !== productId
            );
            await wishlist.save();

            return NextResponse.json({ message: "Product removed from wishlist", result: true }, { status: 200 });
        } else {
            return NextResponse.json({ result: false, message: "No wishlist found for this user" }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}
