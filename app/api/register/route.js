import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const user = await User.findOne({ email: body.email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const newUser = new User(body);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);

        await newUser.save();
        return NextResponse.json(newUser, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
