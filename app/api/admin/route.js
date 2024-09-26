import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST(req) {
    const { username, password } = await req.json();

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ message: "Logged in successfully" });
        response.headers.set('Set-Cookie', cookie.serialize('token', process.env.ADMIN_TOKEN, {
            maxAge: 60 * 60, // 1 saat
            sameSite: 'strict',
            path: '/',
        }));
        return response;
    } else {
        return NextResponse.json({ message: "Wrong Credentials" }, { status: 400 });
    }
}

export async function PUT(req) {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.set('Set-Cookie', cookie.serialize('token', '', {
        maxAge: -1,
        path: '/',
    }));
    return response;
}
