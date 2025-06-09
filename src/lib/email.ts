import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, subject, message } = data

    // Email to you (site owner)
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #007acc; border-radius: 4px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px;">
            This email was sent from your portfolio contact form at ${process.env.SITE_URL}
          </p>
        </div>
      `,
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my portfolio website. I've received your message about "${subject}" and will get back to you as soon as possible.</p>
          
          <div style="background: #f0f8ff; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #007acc;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #555;">"${message}"</p>
          </div>
          
          <p>I typically respond within 24-48 hours. In the meantime, feel free to check out my latest projects and articles on my website.</p>
          
          <p>Best regards,<br>
          <strong>Ümit Akdeniz</strong><br>
          Software Engineer & Physicist</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px;">
            This is an automated response from ${process.env.SITE_URL}
          </p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
