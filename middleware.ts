// Admin route protection is handled by app/admin/layout.tsx via getServerSession.
// API route protection is handled by requireAdmin() in each route handler.
// This file is intentionally empty — no Edge Runtime JWT decoding needed.

export const config = { matcher: [] };
