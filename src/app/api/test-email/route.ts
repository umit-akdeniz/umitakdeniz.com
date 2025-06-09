import { sendContactEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Email Test',
      message: 'This is a test message to verify the email configuration is working properly.',
    }

    const result = await sendContactEmail(testData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email test endpoint. Use POST to send test email.',
    config: {
      smtp_host: process.env.SMTP_HOST || 'Not configured',
      smtp_port: process.env.SMTP_PORT || 'Not configured',
      smtp_user: process.env.SMTP_USER || 'Not configured',
      email_from: process.env.EMAIL_FROM || 'Not configured',
      email_to: process.env.EMAIL_TO || 'Not configured',
      site_url: process.env.SITE_URL || 'Not configured',
    },
  })
}
