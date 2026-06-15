import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to   = process.env.CONTACT_EMAIL ?? user;

    if (!host || !user || !pass) {
        console.error('Contact form: SMTP environment variables not configured.');
        return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_PORT === '465',
        auth: { user, pass },
    });

    await transporter.sendMail({
        from: `"SSS Safety Contact" <${user}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `[Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
                <h2 style="margin-bottom:4px">New Contact Form Submission</h2>
                <p style="color:#666;margin-top:0;font-size:13px">SSS Safety website</p>
                <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
                <table style="font-size:14px;border-collapse:collapse;width:100%">
                    <tr><td style="color:#888;padding:4px 0;width:80px">Name</td><td style="padding:4px 0"><strong>${name}</strong></td></tr>
                    <tr><td style="color:#888;padding:4px 0">Email</td><td style="padding:4px 0"><a href="mailto:${email}">${email}</a></td></tr>
                    <tr><td style="color:#888;padding:4px 0">Subject</td><td style="padding:4px 0">${subject}</td></tr>
                </table>
                <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
                <p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
            </div>
        `,
    });

    return NextResponse.json({ ok: true });
}
