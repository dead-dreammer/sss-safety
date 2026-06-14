export interface StoredUser {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
}

// In-memory store for development. Replace with a real database (Prisma, etc.) for production.
export const users: StoredUser[] = [];
