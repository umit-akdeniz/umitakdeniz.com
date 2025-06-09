#!/bin/bash

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed database (only if needed)
if [ "$1" = "--seed" ]; then
  echo "🌱 Seeding database..."
  npm run db:seed
fi

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Deployment process completed!"