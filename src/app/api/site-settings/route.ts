import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keys = searchParams.get("keys")?.split(",") || [];

    try {
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: { in: keys }
            }
        });

        const result: Record<string, string> = {};
        settings.forEach(s => {
            result[s.key] = s.value;
        });

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || (session.user as any).role !== "SUPER_ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { key, value, group } = await request.json();

        const setting = await prisma.siteSetting.upsert({
            where: { key },
            update: { value, updatedAt: new Date() },
            create: { key, value, group: group || "GENERAL" }
        });

        return NextResponse.json(setting);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
    }
}
