// Environment variable validation for production

export function validateEnv() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM',
    'EMAIL_TO',
    'NEXTAUTH_SECRET',
    'SITE_URL',
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  // Validate URL format
  try {
    new URL(process.env.SITE_URL!)
  } catch {
    throw new Error('SITE_URL must be a valid URL')
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(process.env.EMAIL_FROM!)) {
    throw new Error('EMAIL_FROM must be a valid email address')
  }
  if (!emailRegex.test(process.env.EMAIL_TO!)) {
    throw new Error('EMAIL_TO must be a valid email address')
  }

  console.log('✅ Environment variables validated successfully')
}

// Call validation in production
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}
