import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Use ImgBB for permanent hosting (Railway ephemeral disk fix)
        // Note: Using a public key for now, user should ideally set IMGBB_API_KEY in ENV
        const IMGBB_API_KEY = process.env.IMGBB_API_KEY || '6d207e02198a847aa98d0a2a901485a5'; // Fallback to a default or request from user

        const imgbbFormData = new FormData();
        imgbbFormData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: imgbbFormData,
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({
                url: result.data.url,
                thumb: result.data.thumb?.url || result.data.url,
                delete_url: result.data.delete_url
            });
        } else {
            console.error("ImgBB Error:", result);
            return NextResponse.json({ error: 'External upload failed' }, { status: 502 });
        }
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
