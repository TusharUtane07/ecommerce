import dbConnect from "@/database/databaseConfig";
import Product from "@/models/Product";
import { productValidationSchema } from "@/validations/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const validatedData = productValidationSchema.parse(body);
        const newProduct = await Product.create(validatedData);
        return NextResponse.json({ product: newProduct, message: "Product added successfully", result: true }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ result: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({});
        return NextResponse.json({ products, message: "Products fetched successfully", result: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, result: false })
    }
}