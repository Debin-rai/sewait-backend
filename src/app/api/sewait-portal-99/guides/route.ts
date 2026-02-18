import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, slug, category, department, content, status, icon } = body;

        // --- Audit Log ---
        console.log(`[AUDIT] Admin (${session.user?.email}) created GUIDE: ${title}`);

        const guide = await prisma.guide.create({
            data: {
                title,
                slug,
                category,
                department,
                content,
                status: status || "Draft",
                icon,
            },
        });

        return NextResponse.json(guide);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const guide = await prisma.guide.findUnique({
                where: { id }
            });
            if (!guide) return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
            return NextResponse.json(guide);
        }

        const guides = await prisma.guide.findMany({
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json(guides);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, title, slug, category, department, content, status, icon } = body;

        console.log(`[AUDIT] Admin (${session.user?.email}) updated GUIDE ID: ${id}`);

        const guide = await prisma.guide.update({
            where: { id },
            data: {
                title,
                slug,
                category,
                department,
                content,
                status,
                icon,
            },
        });

        return NextResponse.json(guide);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update guide' }, { status: 500 });
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

        console.log(`[AUDIT] Admin (${session.user?.email}) deleted GUIDE ID: ${id}`);

        await prisma.guide.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete guide' }, { status: 500 });
    }
}
