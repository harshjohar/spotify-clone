import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET! });

    const { pathname } = req.nextUrl;
    // allow
    // 1) if the token exists
    // 2) Its a request to next-auth session & provider fetching
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    // redirect them to login
    if (!token && pathname !== "/login") {
        return NextResponse.redirect("/login");
    }
}
