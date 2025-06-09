import { NextResponse } from 'next/server'

export function handleApiError(error: unknown, context = 'API') {
  console.error(`${context} Error:`, error)

  if (error instanceof Error) {
    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
}

export function validateRequest(data: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing required field: ${field}`
    }
  }
  return null
}

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}
