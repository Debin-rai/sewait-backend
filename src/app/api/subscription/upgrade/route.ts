import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Authentication required" }, { status: 401 });
        }

        // Mock payment verification: simulate a successful transaction
        // In a real app, you would verify eSewa/Khalti tokens here.

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                subscriptionStatus: "PREMIUM",
                subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            }
        });

        // Log the upgrade
        await prisma.auditLog.create({
            data: {
                action: 'SUBSCRIPTION_UPGRADE',
                details: `User ${user.email} upgraded to PREMIUM`,
                status: 'SUCCESS'
            }
        });

        return NextResponse.json({
            success: true,
            message: "Welcome to Premium!",
            user: { subscriptionStatus: user.subscriptionStatus }
        });
    } catch (error) {
        console.error("Upgrade Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
