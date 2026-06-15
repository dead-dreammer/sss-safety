import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
    const mockSendMail = vi.fn().mockResolvedValue({});
    const mockCreateTransport = vi.fn().mockReturnValue({ sendMail: mockSendMail });
    return { mockSendMail, mockCreateTransport };
});

vi.mock('nodemailer', () => ({
    default: { createTransport: mockCreateTransport },
}));

import { POST } from '../../app/api/contact/route';

function makeReq(body: object) {
    return new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });
}

const validBody = { name: 'Alice', email: 'alice@example.com', subject: 'Order query', message: 'Hello there' };

describe('POST /api/contact', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSendMail.mockResolvedValue({});
        process.env.SMTP_HOST = 'smtp.test.com';
        process.env.SMTP_USER = 'noreply@test.com';
        process.env.SMTP_PASS = 'secret';
    });

    afterEach(() => {
        delete process.env.SMTP_HOST;
        delete process.env.SMTP_USER;
        delete process.env.SMTP_PASS;
        delete process.env.SMTP_PORT;
        delete process.env.CONTACT_EMAIL;
    });

    it('returns 400 when name is missing', async () => {
        const res = await POST(makeReq({ email: 'a@b.com', subject: 'S', message: 'M' }));
        expect(res.status).toBe(400);
        expect(await res.json()).toMatchObject({ error: 'All fields are required.' });
    });

    it('returns 400 when email is missing', async () => {
        const res = await POST(makeReq({ name: 'A', subject: 'S', message: 'M' }));
        expect(res.status).toBe(400);
    });

    it('returns 400 when subject is missing', async () => {
        const res = await POST(makeReq({ name: 'A', email: 'a@b.com', message: 'M' }));
        expect(res.status).toBe(400);
    });

    it('returns 400 when message is missing', async () => {
        const res = await POST(makeReq({ name: 'A', email: 'a@b.com', subject: 'S' }));
        expect(res.status).toBe(400);
    });

    it('returns 500 when SMTP_HOST is not set', async () => {
        delete process.env.SMTP_HOST;
        const res = await POST(makeReq(validBody));
        expect(res.status).toBe(500);
        expect(await res.json()).toMatchObject({ error: 'Email service is not configured.' });
    });

    it('returns 500 when SMTP_USER is not set', async () => {
        delete process.env.SMTP_USER;
        const res = await POST(makeReq(validBody));
        expect(res.status).toBe(500);
    });

    it('returns 500 when SMTP_PASS is not set', async () => {
        delete process.env.SMTP_PASS;
        const res = await POST(makeReq(validBody));
        expect(res.status).toBe(500);
    });

    it('sends email and returns ok on success', async () => {
        const res = await POST(makeReq(validBody));
        expect(res.status).toBe(200);
        expect(await res.json()).toMatchObject({ ok: true });
        expect(mockSendMail).toHaveBeenCalledTimes(1);
    });

    it('sets correct email subject with [Contact] prefix', async () => {
        await POST(makeReq(validBody));
        expect(mockSendMail).toHaveBeenCalledWith(
            expect.objectContaining({ subject: '[Contact] Order query' })
        );
    });

    it('sets replyTo to the sender', async () => {
        await POST(makeReq(validBody));
        expect(mockSendMail).toHaveBeenCalledWith(
            expect.objectContaining({ replyTo: '"Alice" <alice@example.com>' })
        );
    });

    it('uses CONTACT_EMAIL as recipient when set', async () => {
        process.env.CONTACT_EMAIL = 'sales@company.com';
        await POST(makeReq(validBody));
        expect(mockSendMail).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'sales@company.com' })
        );
    });

    it('falls back to SMTP_USER as recipient when CONTACT_EMAIL is not set', async () => {
        await POST(makeReq(validBody));
        expect(mockSendMail).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'noreply@test.com' })
        );
    });

    it('uses port 465 with secure=true when SMTP_PORT is 465', async () => {
        process.env.SMTP_PORT = '465';
        await POST(makeReq(validBody));
        expect(mockCreateTransport).toHaveBeenCalledWith(
            expect.objectContaining({ port: 465, secure: true })
        );
    });

    it('uses port 587 with secure=false by default', async () => {
        await POST(makeReq(validBody));
        expect(mockCreateTransport).toHaveBeenCalledWith(
            expect.objectContaining({ port: 587, secure: false })
        );
    });
});
