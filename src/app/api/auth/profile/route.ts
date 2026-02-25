import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { verifyCsrfToken } from "@/lib/csrf";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isValidCsrf = await verifyCsrfToken(request);
        if (!isValidCsrf) {
            return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
        }

        const { name } = await request.json();

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { name },
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
