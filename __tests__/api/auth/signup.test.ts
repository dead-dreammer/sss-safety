import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('../../../lib/prisma', () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
            create: vi.fn(),
        },
    },
}));

vi.mock('bcryptjs', () => ({
    default: {
        hash: vi.fn().mockResolvedValue('hashed-password'),
        compare: vi.fn(),
    },
}));

import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { POST } from '../../../app/api/auth/signup/route';

function makeReq(body: object) {
    return new NextRequest('http://localhost/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
}

describe('POST /api/auth/signup', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns 400 when name is missing', async () => {
        const res = await POST(makeReq({ email: 'a@b.com', password: 'pass' }));
        expect(res.status).toBe(400);
        expect(await res.json()).toMatchObject({ error: 'All fields are required.' });
    });

    it('returns 400 when email is missing', async () => {
        const res = await POST(makeReq({ name: 'Alice', password: 'pass' }));
        expect(res.status).toBe(400);
    });

    it('returns 400 when password is missing', async () => {
        const res = await POST(makeReq({ name: 'Alice', email: 'a@b.com' }));
        expect(res.status).toBe(400);
    });

    it('returns 409 when email already exists', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: '1', email: 'a@b.com' } as any);
        const res = await POST(makeReq({ name: 'Alice', email: 'a@b.com', password: 'pass' }));
        expect(res.status).toBe(409);
        expect(await res.json()).toMatchObject({ error: 'An account with that email already exists.' });
    });

    it('hashes password and creates user on success', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
        vi.mocked(prisma.user.create).mockResolvedValue({ id: '2', name: 'Alice', email: 'a@b.com' } as any);
        const res = await POST(makeReq({ name: 'Alice', email: 'a@b.com', password: 'mypassword' }));
        expect(res.status).toBe(201);
        expect(await res.json()).toMatchObject({ success: true });
        expect(bcrypt.hash).toHaveBeenCalledWith('mypassword', 12);
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: { name: 'Alice', email: 'a@b.com', passwordHash: 'hashed-password' },
        });
    });

    it('checks for existing email before creating', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
        vi.mocked(prisma.user.create).mockResolvedValue({ id: '2' } as any);
        await POST(makeReq({ name: 'Alice', email: 'new@b.com', password: 'pass' }));
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'new@b.com' } });
    });
});
