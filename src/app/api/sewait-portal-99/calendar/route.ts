import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month'); // e.g. "2081-01"

        const days = await prisma.calendarDay.findMany({
            where: {
                bsDate: month ? { startsWith: month } : undefined
            },
            include: { events: true },
            orderBy: { bsDate: 'asc' }
        });

        return NextResponse.json(days);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { bsDate, adDate, tithi, name, type, isPublicHoliday } = body;

        // Upsert the day
        const day = await prisma.calendarDay.upsert({
            where: { bsDate },
            update: { tithi, adDate: new Date(adDate) },
            create: { bsDate, adDate: new Date(adDate), tithi }
        });

        // Add the event
        const event = await prisma.calendarEvent.create({
            data: {
                name,
                type,
                isPublicHoliday: !!isPublicHoliday,
                dayId: day.id
            }
        });

        // --- Audit Log ---
        await prisma.auditLog.create({
            data: {
                action: 'CALENDAR_EVENT_CREATE',
                adminId: session.user.id,
                details: `Created event: ${name} on ${bsDate}`,
                status: 'SUCCESS'
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Calendar event error:", error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, type, isPublicHoliday } = body;

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const event = await prisma.calendarEvent.update({
            where: { id },
            data: {
                name,
                type,
                isPublicHoliday: !!isPublicHoliday
            }
        });

        // --- Audit Log ---
        await prisma.auditLog.create({
            data: {
                action: 'CALENDAR_EVENT_UPDATE',
                adminId: session.user.id,
                details: `Updated event: ${name}`,
                status: 'SUCCESS'
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const event = await prisma.calendarEvent.delete({ where: { id } });

        // --- Audit Log ---
        await prisma.auditLog.create({
            data: {
                action: 'CALENDAR_EVENT_DELETE',
                adminId: session.user.id,
                details: `Deleted event: ${event.name}`,
                status: 'SUCCESS'
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
