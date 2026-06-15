import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') return null;
    return session;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { title, price, category, tags, image } = await req.json();

    const product = await prisma.product.update({
        where: { id: params.id },
        data: { title, price: Number(price), category, tags: tags ?? [], image },
    });

    return NextResponse.json(product);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await prisma.product.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
}
