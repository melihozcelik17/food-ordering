import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await dbConnect();
        const users = await User.find();
        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const newUser = await User.create(body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (err) {
        console.error("Error creating user:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
