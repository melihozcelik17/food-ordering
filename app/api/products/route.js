import Product from "@/models/Product";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find();
        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        console.error("Error fetching products:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const newProduct = await Product.create(body);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (err) {
        console.error("Error creating product:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
