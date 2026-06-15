import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.passwordHash) return null;

                const valid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!valid) return null;

                return { id: user.id, name: user.name, email: user.email, role: (user as any).role ?? 'user' };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            if (token.id) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string },
                    select: { role: true },
                });
                token.role = dbUser?.role ?? 'user';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { id?: string; role?: string }).id = token.id as string;
                (session.user as { id?: string; role?: string }).role = token.role as string;
            }
            return session;
        },
    },
};
