import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Get GitHub Token from SystemConfig
        const config = await prisma.systemConfig.findUnique({
            where: { key: 'API_GITHUB' }
        });

        if (!config || !config.value) {
            return NextResponse.json({ error: 'GitHub Token not configured' }, { status: 400 });
        }

        // 2. Fetch Notifications from GitHub API
        const response = await fetch('https://api.github.com/notifications', {
            headers: {
                'Authorization': `token ${config.value}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'SewaIT-Admin-Portal'
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: error.message || 'GitHub API error' }, { status: response.status });
        }

        const notifications = await response.json();

        // 3. Transform data for UI
        const transformed = notifications.map((n: any) => ({
            id: n.id,
            title: n.subject.title,
            type: n.subject.type,
            repo: n.repository.full_name,
            updatedAt: n.updated_at,
            url: n.subject.url.replace('api.github.com/repos', 'github.com'),
            source: 'GITHUB'
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("GitHub Notifications Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
