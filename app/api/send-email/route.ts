import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate form data
        if (!name || !email || !subject || !message) {
            return Response.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        // Send email to your inbox
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'sarthaknawali2007@gmail.com',
            replyTo: email,
            subject: ` New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Message from Your Portfolio</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                        <p><strong>Message:</strong></p>
                        <p style="line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
                </div>
            `,
        });

        // Send confirmation email to the user
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Thank You!</h2>
                    <p>Hi ${escapeHtml(name)},</p>
                    <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your message:</strong></p>
                        <p style="line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
                    </div>
                    <p>Best regards,</p>
                    <p>Sarthak Nawali</p>
                </div>
            `,
        });

        return Response.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email error:', error);
        return Response.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}
