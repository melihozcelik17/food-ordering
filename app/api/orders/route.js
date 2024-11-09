import Order from "@/models/Order";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const orders = await Order.find();
        return NextResponse.json(orders, { status: 200 });
    } catch (err) {
        console.error("Error fetching orders:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const newOrder = await Order.create(body);
        return NextResponse.json(newOrder, { status: 201 });
    } catch (err) {
        console.error("Error creating order:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
