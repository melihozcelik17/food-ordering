import Product from "@/models/Product";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (err) {
        console.error("Error fetching product:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};

export async function DELETE(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
