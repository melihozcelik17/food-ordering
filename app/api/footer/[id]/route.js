import Footer from "@/models/Footer";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    try {
        const footer = await Footer.findById(id);
        if (!footer) {
            return NextResponse.json({ message: "Footer not found" }, { status: 404 });
        }
        return NextResponse.json(footer, { status: 200 });
    } catch (err) {
        console.error("Error fetching footer:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};

export async function PUT(req, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const body = await req.json();
        const updatedFooter = await Footer.findByIdAndUpdate(id, body, { new: true });

        if (!updatedFooter) {
            return NextResponse.json({ message: 'Footer not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Footer updated', footer: updatedFooter }, { status: 200 });
    } catch (error) {
        console.error("Error updating footer:", error);
        return NextResponse.json({ message: 'Error updating footer' }, { status: 500 });
    }
}
