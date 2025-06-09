import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const album = await prisma.album.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    return NextResponse.json(album)
  } catch (error) {
    console.error('Error fetching album:', error)
    return NextResponse.json({ error: 'Failed to fetch album' }, { status: 500 })
  }
}
