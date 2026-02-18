import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    try {
        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                take: limit,
                skip: skip,
                orderBy: { createdAt: "desc" },
                include: {
                    admin: {
                        select: {
                            name: true,
                            role: true,
                        }
                    }
                }
            }),
            prisma.auditLog.count()
        ]);

        return NextResponse.json({
            logs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Fetch Logs Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
