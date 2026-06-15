import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error('Usage: pnpm tsx prisma/promote-admin.ts <email>');
        process.exit(1);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.error(`No user found with email: ${email}`);
        process.exit(1);
    }

    await prisma.user.update({ where: { email }, data: { role: 'admin' } });
    console.log(`✓ ${email} is now an admin. Sign out and back in to refresh your session.`);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
