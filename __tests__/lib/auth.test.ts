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

    it('adds id and role to token when user signs in', async () => {
        const token = {};
        const user = { id: 'user-1', role: 'admin' };
        const result = await jwtCallback({ token, user } as any);
        expect(result.id).toBe('user-1');
        expect(result.role).toBe('admin');
    });

    it('defaults role to "user" when not specified on the user object', async () => {
        const token = {};
        const user = { id: 'user-2' };
        const result = await jwtCallback({ token, user } as any);
        expect(result.role).toBe('user');
    });

    it('passes token through unchanged when no user (token refresh)', async () => {
        const token = { id: 'user-1', role: 'admin', sub: 'user-1' };
        const result = await jwtCallback({ token } as any);
        expect(result).toEqual(token);
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
