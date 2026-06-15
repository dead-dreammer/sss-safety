import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../lib/prisma', () => ({
    prisma: {
        user: { findUnique: vi.fn() },
    },
}));

vi.mock('bcryptjs', () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn(),
    },
}));

vi.mock('@next-auth/prisma-adapter', () => ({
    PrismaAdapter: vi.fn().mockReturnValue({}),
}));

import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { authOptions } from '../../lib/auth';

const credentialsProvider = (authOptions.providers[0] as any).options;

describe('authOptions JWT callback', () => {
    const jwtCallback = authOptions.callbacks!.jwt!;

    beforeEach(() => vi.clearAllMocks());

    it('sets token.id from user on initial sign-in', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ role: 'admin' } as any);
        const result = await jwtCallback({ token: {}, user: { id: 'user-1' } } as any);
        expect(result.id).toBe('user-1');
    });

    it('syncs role from DB on every call', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ role: 'admin' } as any);
        const result = await jwtCallback({ token: { id: 'user-1' } } as any);
        expect(result.role).toBe('admin');
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { id: 'user-1' },
            select: { role: true },
        });
    });

    it('defaults role to "user" when DB user not found', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
        const result = await jwtCallback({ token: { id: 'user-1' } } as any);
        expect(result.role).toBe('user');
    });

    it('reflects DB role change without re-login', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ role: 'admin' } as any);
        const token = { id: 'user-1', role: 'user' };
        const result = await jwtCallback({ token } as any);
        expect(result.role).toBe('admin');
    });

    it('returns token unchanged when no id present', async () => {
        const token = { sub: 'abc' };
        const result = await jwtCallback({ token } as any);
        expect(result).toEqual(token);
        expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });
});

describe('authOptions session callback', () => {
    const sessionCallback = authOptions.callbacks!.session!;

    it('populates session.user with id and role from token', async () => {
        const session = { user: { name: 'Alice', email: 'alice@test.com' }, expires: '' };
        const token = { id: 'user-1', role: 'admin' };
        const result = await sessionCallback({ session, token } as any);
        expect((result.user as any).id).toBe('user-1');
        expect((result.user as any).role).toBe('admin');
    });

    it('returns session unchanged when session.user is absent', async () => {
        const session = { expires: '' };
        const token = { id: 'user-1', role: 'admin' };
        const result = await sessionCallback({ session, token } as any);
        expect(result).toEqual(session);
    });
});

describe('CredentialsProvider authorize', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returns null when credentials are not provided', async () => {
        const result = await credentialsProvider.authorize(null);
        expect(result).toBeNull();
    });

    it('returns null when email is missing', async () => {
        const result = await credentialsProvider.authorize({ password: 'pass' });
        expect(result).toBeNull();
    });

    it('returns null when password is missing', async () => {
        const result = await credentialsProvider.authorize({ email: 'a@b.com' });
        expect(result).toBeNull();
    });

    it('returns null when user does not exist in the database', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
        const result = await credentialsProvider.authorize({ email: 'unknown@b.com', password: 'pass' });
        expect(result).toBeNull();
    });

    it('returns null when user has no passwordHash (e.g. OAuth account)', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: '1', email: 'a@b.com', passwordHash: null } as any);
        const result = await credentialsProvider.authorize({ email: 'a@b.com', password: 'pass' });
        expect(result).toBeNull();
    });

    it('returns null when password does not match', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: '1', email: 'a@b.com', passwordHash: 'hash' } as any);
        vi.mocked(bcrypt.compare).mockResolvedValue(false as any);
        const result = await credentialsProvider.authorize({ email: 'a@b.com', password: 'wrong' });
        expect(result).toBeNull();
    });

    it('returns user object with role when credentials are valid', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({
            id: '1', name: 'Alice', email: 'a@b.com', passwordHash: 'hash', role: 'admin',
        } as any);
        vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
        const result = await credentialsProvider.authorize({ email: 'a@b.com', password: 'correct' });
        expect(result).toEqual({ id: '1', name: 'Alice', email: 'a@b.com', role: 'admin' });
    });

    it('defaults role to "user" when role is not set on the db record', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({
            id: '1', name: 'Bob', email: 'b@b.com', passwordHash: 'hash',
        } as any);
        vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
        const result = await credentialsProvider.authorize({ email: 'b@b.com', password: 'correct' });
        expect((result as any).role).toBe('user');
    });
});
