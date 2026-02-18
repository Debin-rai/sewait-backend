import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: {
                    startsWith: 'MODULE_'
                }
            }
        });

        const configMap = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

        return NextResponse.json(configMap, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch public config' }, { status: 500 });
    }
}
