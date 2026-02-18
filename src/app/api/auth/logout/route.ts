import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getSession();
    const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "unknown";

    if (session && session.user) {
        await prisma.auditLog.create({
            data: {
                action: 'LOGOUT',
                adminId: session.user.id,
                details: 'Admin logged out successfully',
                ipAddress: ip,
                status: 'SUCCESS'
            }
        });
    }

    await clearSession();
    return NextResponse.json({ success: true });
}
