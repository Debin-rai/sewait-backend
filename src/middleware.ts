import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE_NAME, updateSession } from "@/lib/auth";

// Protected routes pattern
const SECRET_ADMIN_PATH = "/sewait-portal-99";
const PROTECTED_ROUTES = [SECRET_ADMIN_PATH];
const AUTH_ROUTES = [`${SECRET_ADMIN_PATH}/login`];

// Allowed IP Addresses (Worldlink Communications - Koshi, Nepal)
const ALLOWED_IPS = [
    "27.34.111.188",                        // IPv4
    "2400:1a00:4ba6:69c0:cc9:9005:147:1872" // IPv6
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Path identification
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname === route
    );

    // --- Strict Zero Trust IP Check (applies to ALL admin routes including login) ---
    if (isProtectedRoute || isAuthRoute) {
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        if (process.env.NODE_ENV === 'production' && !ALLOWED_IPS.includes(clientIp)) {
            console.warn(`🚫 BLOCKED unauthorized admin access from IP: ${clientIp}`);
            return new NextResponse(null, { status: 404 });
        }
    }

    // 2. Auth Route Logic (Redirect to admin dashboard if already logged in)
    if (isAuthRoute) {
        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (session) {
            const payload = await decrypt(session);
            if (payload && payload.user?.role === "ADMIN") {
                const url = request.nextUrl.clone();
                url.pathname = SECRET_ADMIN_PATH;
                return NextResponse.redirect(url);
            }
        }
        return NextResponse.next();
    }

    // 3. Protected Route Logic (Redirect to login if not logged in or not admin)
    if (isProtectedRoute) {
        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = `${SECRET_ADMIN_PATH}/login`;
            return NextResponse.redirect(url);
        }

        const payload = await decrypt(session);
        if (!payload || payload.user?.role !== "ADMIN") {
            const url = request.nextUrl.clone();
            url.pathname = `${SECRET_ADMIN_PATH}/login`;
            return NextResponse.redirect(url);
        }

        // Sliding Expiration: Refresh the session cookie on activity
        return await updateSession(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    ],
};
