import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch daily analytics for charts (last 30 days)
        const daily = await prisma.dailyAnalytic.findMany({
            orderBy: { date: 'desc' },
            take: 100
        });

        const visitors = await prisma.visitorAnalytic.findMany({
            orderBy: { hits: 'desc' }
        });

        return NextResponse.json({ daily, visitors });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path, device } = body;

        if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        // Normalize date to midnight UTC
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        // 1. Update Daily Analytic (for charts)
        await prisma.dailyAnalytic.upsert({
            where: {
                path_date: {
                    path,
                    date
                }
            },
            update: { hits: { increment: 1 } },
            create: { path, date, hits: 1 }
        });

        // 2. Update Visitor Analytic (for totals)
        await prisma.visitorAnalytic.upsert({
            where: { id: path }, // We use path as ID for visitor totals for simplicity
            update: {
                hits: { increment: 1 },
                device: device || 'desktop',
                updatedAt: new Date()
            },
            create: {
                id: path,
                path,
                device: device || 'desktop',
                hits: 1
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics recorded error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
