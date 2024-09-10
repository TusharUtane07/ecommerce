import dbConnect from "@/database/databaseConfig";
import Product from "@/models/Product";
import { productValidationSchema } from "@/validations/productSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    try {
        await dbConnect();
        const productId = params.productId;
        console.log(productId + "proudct id");
        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ result: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ product, result: true, message: "Product fetched successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ result: false, message: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    try {
        await dbConnect();
        const productId = params.productId;
        const body = await request.json();

        const validatedData = productValidationSchema.parse(body);

        const updatedProduct = await Product.findByIdAndUpdate(productId, validatedData, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ result: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ product: updatedProduct, message: "Product updated successfully", result: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ result: false, message: error.message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        await dbConnect();
        const productId = params.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId);

        if (!deleteProduct) {
            return NextResponse.json({ result: false, message: "Product not found" });
        }

        return NextResponse.json({ result: true, message: "Product deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ result: false, message: error.message }, { status: 400 });
    }
}