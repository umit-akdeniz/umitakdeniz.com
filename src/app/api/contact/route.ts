import { sendContactEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    const { name, email, subject, message } = data

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Send email
    const result = await sendContactEmail({ name, email, subject, message })

    if (result.success) {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
    } else {
      return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
