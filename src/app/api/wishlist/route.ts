import dbConnect from "@/database/databaseConfig";
import Wishlist from "@/models/Wishlist";
import { wishlistProductSchema } from "@/validations/wishlistSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = wishlistProductSchema.parse(body);
        const newWishList = await Wishlist.create(validatedData);
        return NextResponse.json({ wishlist: newWishList, message: "Product added to wishlist", result: true }, { status: 201 })
    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const wishlist = await Wishlist.find({})
            .populate("user")
            .populate("products");
        return NextResponse.json({ wishlist, message: "Wishlist fetched successfully", result: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, result: false })
    }
}