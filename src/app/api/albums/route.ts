import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(albums)
  } catch (error) {
    console.error('Error fetching albums:', error)
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 })
  }
}
