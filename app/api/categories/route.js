
import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find();
        return NextResponse.json(categories, { status: 200 });
    } catch (err) {
        console.error("Error fetching categorys:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();  // Next.js'te req.json() ile body parse edilir
        const newCategory = await Category.create(body);
        return NextResponse.json(newCategory, { status: 201 });
    } catch (err) {
        console.error("Error creating category:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
