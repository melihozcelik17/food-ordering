import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const footer = await Footer.find();
        return NextResponse.json(footer, { status: 200 });
    } catch (err) {
        console.error("Error fetching footer:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const newFooter = await Footer.create(body);
        return NextResponse.json(newFooter, { status: 201 });
    } catch (err) {
        console.error("Error creating footer:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
