import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next-auth', () => ({ getServerSession: vi.fn() }));
vi.mock('../../../lib/auth', () => ({ authOptions: {} }));
vi.mock('../../../lib/prisma', () => ({
    prisma: {
        product: {
            findMany: vi.fn(),
            create: vi.fn(),
        },
    },
}));

import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { GET, POST } from '../../../app/api/admin/products/route';

const adminSession = { user: { role: 'admin', email: 'admin@test.com' } };
const userSession = { user: { role: 'user', email: 'user@test.com' } };

function makePostReq(body: object) {
    return new NextRequest('http://localhost/api/admin/products', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
}

describe('GET /api/admin/products', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns 403 when unauthenticated', async () => {
        vi.mocked(getServerSession).mockResolvedValue(null);
        const res = await GET();
        expect(res.status).toBe(403);
        expect(await res.json()).toMatchObject({ error: 'Forbidden' });
    });

    it('returns 403 for non-admin user', async () => {
        vi.mocked(getServerSession).mockResolvedValue(userSession as any);
        const res = await GET();
        expect(res.status).toBe(403);
    });

    it('returns products list for admin', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const products = [{ id: '1', title: 'Helmet', price: 49.99, category: 'PPE', tags: [], image: 'h.jpg' }];
        vi.mocked(prisma.product.findMany).mockResolvedValue(products as any);
        const res = await GET();
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(products);
    });
});

describe('POST /api/admin/products', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns 403 when unauthenticated', async () => {
        vi.mocked(getServerSession).mockResolvedValue(null);
        const res = await POST(makePostReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }));
        expect(res.status).toBe(403);
    });

    it('returns 403 for non-admin', async () => {
        vi.mocked(getServerSession).mockResolvedValue(userSession as any);
        const res = await POST(makePostReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }));
        expect(res.status).toBe(403);
    });

    it('returns 400 when title is missing', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const res = await POST(makePostReq({ price: 10, category: 'C', image: 'i.jpg' }));
        expect(res.status).toBe(400);
        expect(await res.json()).toMatchObject({ error: 'Missing required fields.' });
    });

    it('returns 400 when price is missing', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const res = await POST(makePostReq({ title: 'T', category: 'C', image: 'i.jpg' }));
        expect(res.status).toBe(400);
    });

    it('returns 400 when category is missing', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const res = await POST(makePostReq({ title: 'T', price: 10, image: 'i.jpg' }));
        expect(res.status).toBe(400);
    });

    it('returns 400 when image is missing', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const res = await POST(makePostReq({ title: 'T', price: 10, category: 'C' }));
        expect(res.status).toBe(400);
    });

    it('creates product and returns 201', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const created = { id: '1', title: 'Helmet', price: 49.99, category: 'PPE', tags: [], image: 'h.jpg' };
        vi.mocked(prisma.product.create).mockResolvedValue(created as any);
        const res = await POST(makePostReq({ title: 'Helmet', price: 49.99, category: 'PPE', image: 'h.jpg' }));
        expect(res.status).toBe(201);
        expect(await res.json()).toEqual(created);
        expect(prisma.product.create).toHaveBeenCalledWith({
            data: { title: 'Helmet', price: 49.99, category: 'PPE', tags: [], image: 'h.jpg' },
        });
    });

    it('defaults tags to empty array when not provided', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        vi.mocked(prisma.product.create).mockResolvedValue({ id: '1' } as any);
        await POST(makePostReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }));
        expect(prisma.product.create).toHaveBeenCalledWith(
            expect.objectContaining({ data: expect.objectContaining({ tags: [] }) })
        );
    });
});
