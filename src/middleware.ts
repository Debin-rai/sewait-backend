import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE_NAME } from "@/lib/auth";

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

    // 1. Check if the route is the secret admin path
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // 2. Except for the login page (which is the auth page)
    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname === route
    );

    // --- Strict Zero Trust IP Check ---
    if (isProtectedRoute && process.env.NODE_ENV === 'production') {
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
        if (!ALLOWED_IPS.includes(clientIp)) {
            console.warn(`Blocked unauthorized access to admin from IP: ${clientIp}`);
            return new NextResponse(null, { status: 404 }); // Return 404 to make path look non-existent
        }
    }

    const response = NextResponse.next();

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
}

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
}

return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public assets)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    ],
};
