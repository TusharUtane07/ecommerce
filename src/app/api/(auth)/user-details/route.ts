import dbConnect from "@/database/databaseConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user,
            result: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, message: "No User Found", result: false }, { status: 400 });
    }
}