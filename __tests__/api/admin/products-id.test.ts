import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('next-auth', () => ({ getServerSession: vi.fn() }));
vi.mock('../../../lib/auth', () => ({ authOptions: {} }));
vi.mock('../../../lib/prisma', () => ({
    prisma: {
        product: {
            update: vi.fn(),
            delete: vi.fn(),
        },
    },
}));

import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { PUT, DELETE } from '../../../app/api/admin/products/[id]/route';

const adminSession = { user: { role: 'admin', email: 'admin@test.com' } };
const userSession = { user: { role: 'user', email: 'user@test.com' } };
const routeParams = { params: { id: 'product-123' } };

function makePutReq(body: object) {
    return new NextRequest('http://localhost/api/admin/products/product-123', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
}

function makeDeleteReq() {
    return new NextRequest('http://localhost/api/admin/products/product-123', { method: 'DELETE' });
}

describe('PUT /api/admin/products/[id]', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns 403 when unauthenticated', async () => {
        vi.mocked(getServerSession).mockResolvedValue(null);
        const res = await PUT(makePutReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }), routeParams);
        expect(res.status).toBe(403);
        expect(await res.json()).toMatchObject({ error: 'Forbidden' });
    });

    it('returns 403 for non-admin', async () => {
        vi.mocked(getServerSession).mockResolvedValue(userSession as any);
        const res = await PUT(makePutReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }), routeParams);
        expect(res.status).toBe(403);
    });

    it('updates product and returns it', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        const updated = { id: 'product-123', title: 'Updated Helmet', price: 59.99, category: 'PPE', tags: ['safety'], image: 'h.jpg' };
        vi.mocked(prisma.product.update).mockResolvedValue(updated as any);
        const res = await PUT(
            makePutReq({ title: 'Updated Helmet', price: 59.99, category: 'PPE', tags: ['safety'], image: 'h.jpg' }),
            routeParams
        );
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual(updated);
        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: 'product-123' },
            data: expect.objectContaining({ title: 'Updated Helmet', price: 59.99 }),
        });
    });

    it('defaults tags to empty array when not provided', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        vi.mocked(prisma.product.update).mockResolvedValue({ id: 'product-123' } as any);
        await PUT(makePutReq({ title: 'T', price: 10, category: 'C', image: 'i.jpg' }), routeParams);
        expect(prisma.product.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: expect.objectContaining({ tags: [] }) })
        );
    });
});

describe('DELETE /api/admin/products/[id]', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns 403 when unauthenticated', async () => {
        vi.mocked(getServerSession).mockResolvedValue(null);
        const res = await DELETE(makeDeleteReq(), routeParams);
        expect(res.status).toBe(403);
    });

    it('returns 403 for non-admin', async () => {
        vi.mocked(getServerSession).mockResolvedValue(userSession as any);
        const res = await DELETE(makeDeleteReq(), routeParams);
        expect(res.status).toBe(403);
    });

    it('deletes product and returns success', async () => {
        vi.mocked(getServerSession).mockResolvedValue(adminSession as any);
        vi.mocked(prisma.product.delete).mockResolvedValue({} as any);
        const res = await DELETE(makeDeleteReq(), routeParams);
        expect(res.status).toBe(200);
        expect(await res.json()).toMatchObject({ success: true });
        expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 'product-123' } });
    });
});
