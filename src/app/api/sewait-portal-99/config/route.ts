import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    try {
        const configs = await prisma.systemConfig.findMany();
        // Convert to easy-to-use object
        const configMap = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
        return NextResponse.json(configMap);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json(); // { key: value, key2: value2 }

        const updates = Object.entries(body).map(([key, value]) => {
            return prisma.systemConfig.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            });
        });

        await Promise.all(updates);

        // --- Audit Log ---
        await prisma.systemLog.create({
            data: {
                action: 'UPDATE_SYSTEM_CONFIG',
                admin: session.user?.email || 'unknown',
                details: `Updated keys: ${Object.keys(body).join(', ')}`,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Config update error:", error);
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
