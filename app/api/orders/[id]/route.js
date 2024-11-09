import Order from "@/models/Order";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order, { status: 200 });
    } catch (err) {
        console.error("Error fetching order:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};

export async function DELETE(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const result = await Order.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Order deleted' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ message: 'Error deleting order' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const body = await req.json(); // req.body yerine req.json() kullanıyoruz
        const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order updated', order: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
    }
}