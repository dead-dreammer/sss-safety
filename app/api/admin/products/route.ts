import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') return null;
    return session;
}

export async function GET() {
    if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { title, price, category, tags, image } = await req.json();

    if (!title || price == null || !category || !image) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const product = await prisma.product.create({
        data: { title, price: Number(price), category, tags: tags ?? [], image },
    });

    return NextResponse.json(product, { status: 201 });
}
