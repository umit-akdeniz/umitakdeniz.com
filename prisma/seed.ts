import * as fs from 'fs'
import * as path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Import existing JSON data
const articlesData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'content/articles.json'), 'utf-8')
)
const projectsData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'content/projects.json'), 'utf-8')
)

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'umit@umitakdeniz.com'
  const adminName = process.env.ADMIN_NAME || 'Ümit Akdeniz'

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      role: 'ADMIN',
    },
  })

  console.log('👤 Admin user created:', adminUser.email)

  // Create blog posts
  const blogPosts = [
    {
      title: 'Kuantum Bilgisayarlar ve Geleceği',
      slug: 'kuantum-bilgisayarlar-ve-gelecegi',
      content: `# Kuantum Bilgisayarlar ve Geleceği

Kuantum bilgisayarlar, hesaplamalı fiziğin en heyecan verici alanlarından biri haline geldi. Klasik bilgisayarların binary bit sisteminin aksine, kuantum bilgisayarlar kuantum bit (qubit) kullanarak eş zamanlı olarak birden fazla durumda bulunabilirler.

## Kuantum Üstünlüğü

2019 yılında Google'ın Sycamore işlemcisi, belirli bir hesaplama için kuantum üstünlüğü gösterdi. Bu milestone, kuantum bilgisayarların pratik uygulamalara ne kadar yakın olduğunu gösteriyor.

## Gelecekteki Uygulamalar

- **Kriptografi:** Mevcut şifreleme yöntemlerini kırabilir
- **İlaç Keşfi:** Moleküler simülasyonları hızlandırabilir  
- **Optimizasyon:** Lojistik ve finansal modelleme
- **Makine Öğrenmesi:** Kuantum algoritmaları ile gelişmiş AI

Kuantum bilgisayarlar henüz erken aşamada olsa da, önümüzdeki 10-15 yıl içinde devrimsel değişikliklere sahne olacağız.`,
      excerpt:
        "Kuantum bilgisayarların gelişimi ve gelecekteki uygulamaları hakkında detaylı bir inceleme. Google'ın kuantum üstünlüğü başarısından pratik uygulamalara kadar.",
      image: '⚛️',
      tags: ['kuantum', 'teknoloji', 'gelecek', 'fizik', 'google'],
      published: true,
      publishedAt: new Date('2024-03-15'),
      authorId: adminUser.id,
    },
    {
      title: 'Modern Web Geliştirme: React ve Next.js ile Full-Stack Development',
      slug: 'modern-web-gelistirme-react-nextjs',
      content: `# Modern Web Geliştirme: React ve Next.js ile Full-Stack Development

Web geliştirme dünyası hızla evrilirken, React ve Next.js gibi modern framework'ler geliştirici deneyimini ve performansı artırıyor.

## Neden Next.js?

Next.js, React uygulamaları için production-ready özellikleri sunar:

- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)** 
- **API Routes**
- **Image Optimization**
- **Built-in CSS Support**

## Geliştirme Deneyimi

\`\`\`jsx
// Modern React component
export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to Next.js</h1>
    </div>
  )
}
\`\`\`

## TypeScript Entegrasyonu

TypeScript, büyük projelerde type safety sağlayarak development sürecini güvenli hale getiriyor.

Bu blog da Next.js, TypeScript ve modern web teknolojileri ile geliştirildi!`,
      excerpt:
        'React, Next.js ve TypeScript ile modern web uygulamaları geliştirmenin en iyi uygulamaları. SSR, SSG ve type safety konularında pratik bilgiler.',
      image: '💻',
      tags: ['web', 'react', 'nextjs', 'typescript', 'ssr'],
      published: true,
      publishedAt: new Date('2024-02-20'),
      authorId: adminUser.id,
    },
    {
      title: "Fizik ve Programlama: Computational Physics'e Giriş",
      slug: 'fizik-ve-programlama-computational-physics',
      content: `# Fizik ve Programlama: Computational Physics'e Giriş

Modern fizik araştırmalarının büyük bir kısmı computational yöntemler gerektiriyor. Python, MATLAB ve C++ gibi dilleri kullanarak fiziksel sistemleri modelleyebiliriz.

## Python ile Fizik Simülasyonları

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Harmonic oscillator simulation
def harmonic_oscillator(t, omega=1.0):
    return np.cos(omega * t)

t = np.linspace(0, 10, 1000)
x = harmonic_oscillator(t)

plt.plot(t, x)
plt.xlabel('Time')
plt.ylabel('Position')
plt.title('Harmonic Oscillator')
plt.show()
\`\`\`

## Kullandığım Araçlar

- **Python:** Genel amaçlı fizik hesaplamaları
- **MATLAB:** Sinyal işleme ve analiz
- **ROOT:** Yüksek enerji fiziği data analizi
- **GEANT4:** Monte Carlo simülasyonları

Fizik ve programlama birleşimi, karmaşık problemleri çözmenin anahtarı!`,
      excerpt:
        'Computational physics dünyasına giriş. Python, MATLAB ve diğer araçlarla fiziksel sistemlerin modellenmesi ve simülasyonu.',
      image: '🔬',
      tags: ['fizik', 'python', 'simulation', 'matlab', 'computational'],
      published: true,
      publishedAt: new Date('2024-01-10'),
      authorId: adminUser.id,
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }

  console.log('📝 Blog posts created')

  // Create products
  const products = [
    {
      title: 'Porsche 911 Carrera (1984)',
      slug: 'porsche-911-carrera-1984',
      description:
        'Classic air-cooled Porsche 911 with original G50 transmission and pristine condition',
      fullDescription:
        "This 1984 Porsche 911 Carrera represents the pinnacle of the G-body generation. Featuring the legendary 3.2-liter air-cooled flat-six engine paired with the robust G50 manual transmission, this car delivers pure driving pleasure. The Guards Red paint gleams with original luster, and the black leather interior remains in exceptional condition. Recent maintenance includes full engine service, suspension refresh, and brake system overhaul. This is not just a car; it's a piece of automotive history that continues to provide thrilling experiences on winding roads.",
      category: 'vehicles',
      type: 'Sports Car',
      status: 'Owned',
      price: '€65,000',
      year: '1984',
      condition: 'Excellent',
      location: 'Private Garage, İstanbul',
      acquired: '2019',
      image: '🏎️',
      color: 'from-red-500 to-orange-600',
      specs: {
        engine: '3.2L Air-Cooled Flat-Six',
        transmission: '5-Speed Manual G50',
        power: '231 HP',
        torque: '284 Nm',
        acceleration: '0-100 km/h: 5.4 seconds',
        topSpeed: '245 km/h',
        weight: '1,210 kg',
        fuelType: 'Petrol',
        drive: 'RWD',
      },
      history:
        'Purchased from a collector in Germany who had owned it for 15 years. The car has complete service records and has never been in an accident. It spent most of its life garaged and was only driven on weekends. All original parts, matching numbers.',
      authorId: adminUser.id,
    },
    {
      title: 'Apple Lisa Computer (1983)',
      slug: 'apple-lisa-computer-1983',
      description:
        'First personal computer with graphical user interface - revolutionary piece of computing history',
      fullDescription:
        'The Apple Lisa was revolutionary - the first personal computer to feature a graphical user interface with windows, icons, and a mouse. This particular unit has been meticulously restored to full working condition. The 12-inch monochrome CRT display is crisp, all peripherals function perfectly, and the original Lisa Office System software suite runs flawlessly. This computer represents a pivotal moment in computing history, bridging the gap between command-line interfaces and the modern desktop metaphor we use today.',
      category: 'computers',
      type: 'Personal Computer',
      status: 'Restored',
      price: '$8,500',
      year: '1983',
      condition: 'Fully Functional',
      location: 'Home Office',
      acquired: '2021',
      image: '💻',
      color: 'from-gray-400 to-gray-600',
      specs: {
        cpu: 'Motorola 68000 @ 5MHz',
        ram: '1MB (upgradeable to 2MB)',
        storage: '5MB ProFile Hard Drive',
        display: "12'' Monochrome CRT",
        resolution: '720 × 364 pixels',
        os: 'Lisa Office System',
        connectivity: 'Serial ports, Mouse',
        weight: '22 kg',
      },
      history:
        'Acquired from a former Apple engineer who worked on the Lisa project. The computer was stored in climate-controlled conditions and required minimal restoration work. All original manuals and software disks are included.',
      authorId: adminUser.id,
    },
    {
      title: 'Underwood Champion Typewriter (1936)',
      slug: 'underwood-champion-typewriter-1936',
      description: 'Authentic pre-war portable typewriter in working condition with original case',
      fullDescription:
        'This 1936 Underwood Champion represents the golden age of mechanical typewriters. Built during the Depression era, this machine was designed for portability without sacrificing the quality Underwood was known for. The typewriter features the classic elite typeface and produces crisp, clean text. All mechanical functions work perfectly, from the ribbon advance to the bell mechanism. The original carrying case is included and shows minimal wear.',
      category: 'typewriters',
      type: 'Portable Typewriter',
      status: 'Functional',
      price: '$420',
      year: '1936',
      condition: 'Very Good',
      location: 'Study Room',
      acquired: '2020',
      image: '⌨️',
      color: 'from-amber-600 to-yellow-700',
      specs: {
        manufacturer: 'Underwood Corporation',
        model: 'Champion',
        typeface: 'Elite (12 characters per inch)',
        mechanism: 'Typebar',
        features: 'Shift key, Bell, Backspace',
        case: 'Original leather carrying case',
        weight: '4.5 kg',
      },
      history:
        'Found at an estate sale in Beyoğlu. Previous owner was a journalist who used it throughout the 1940s and 1950s. Professionally cleaned and serviced in 2020.',
      authorId: adminUser.id,
    },
    {
      title: 'Leica M3 Camera (1955)',
      slug: 'leica-m3-camera-1955',
      description: 'Legendary 35mm rangefinder camera - the pinnacle of mechanical precision',
      fullDescription:
        'The Leica M3, introduced in 1954, is widely considered the finest rangefinder camera ever made. This 1955 example showcases the incredible German engineering and precision that made Leica the choice of professional photographers worldwide. The rangefinder is perfectly calibrated, the shutter is accurate at all speeds, and the chrome body shows minimal wear. Equipped with the legendary Leitz Summicron 50mm f/2 lens.',
      category: 'cameras',
      type: 'Rangefinder Camera',
      status: 'Mint Condition',
      price: '$3,200',
      year: '1955',
      condition: 'Mint',
      location: 'Camera Collection',
      acquired: '2022',
      image: '📷',
      color: 'from-silver-400 to-gray-500',
      specs: {
        format: '35mm film',
        shutter: '1 second to 1/1000s + B',
        viewfinder: 'Brightline rangefinder',
        lens: 'Leitz Summicron 50mm f/2',
        filmAdvance: 'Single stroke lever',
        construction: 'All-metal body',
        weight: '585g',
      },
      history:
        'Purchased from a collector in Berlin. Camera was owned by a photojournalist who covered Europe in the 1960s. Recently serviced by Leica Camera AG.',
      authorId: adminUser.id,
    },
    {
      title: 'Tesla Model S Plaid (2021)',
      slug: 'tesla-model-s-plaid-2021',
      description:
        'Cutting-edge electric performance sedan with tri-motor setup and ludicrous acceleration',
      fullDescription:
        'The Tesla Model S Plaid represents the pinnacle of electric vehicle performance and technology. With its tri-motor all-wheel-drive system producing over 1000 horsepower, this sedan can accelerate from 0-100 km/h in under 2.1 seconds while maintaining a range of over 600 kilometers. The minimalist interior features a 17-inch touchscreen, premium sound system, and full self-driving capability. This particular example is in Pearl White with the premium interior package.',
      category: 'vehicles',
      type: 'Electric Sedan',
      status: 'Daily Driver',
      price: '$129,990',
      year: '2021',
      condition: 'Excellent',
      location: 'Home Garage',
      acquired: '2021',
      image: '⚡',
      color: 'from-blue-500 to-purple-600',
      specs: {
        motors: 'Tri-Motor All-Wheel Drive',
        power: '1020 HP',
        acceleration: '0-100 km/h: 2.1s',
        topSpeed: '322 km/h',
        range: '628 km (WLTP)',
        charging: 'Supercharger V3 compatible',
        autopilot: 'Full Self-Driving Capability',
      },
      history:
        'Ordered directly from Tesla in 2021. First owner, all service records available. Software always kept up to date with latest Tesla features.',
      authorId: adminUser.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('🛍️ Products created')

  // Create albums
  const albums = [
    {
      title: 'Focus & Flow',
      slug: 'focus-and-flow',
      description: 'Deep work and concentration playlist for coding sessions',
      fullDescription:
        'This carefully curated playlist is designed for deep focus and sustained concentration during coding sessions.',
      genre: 'Electronic/Ambient',
      duration: '2h 34m',
      tracks: 28,
      image: '🎵',
      color: 'from-blue-500 to-purple-600',
      spotifyUrl: 'https://spotify.com/playlist/focus-flow',
      youtubeUrl: 'https://youtube.com/playlist?list=focus-flow',
      mood: 'Focused, Calm, Productive',
      created: 'January 2023',
      lastUpdated: 'March 2024',
      totalPlays: '1,247',
      followers: '89',
      featured: [
        { title: 'Weightless', artist: 'Marconi Union', duration: '8:08' },
        { title: 'Avril 14th', artist: 'Aphex Twin', duration: '2:04' },
        { title: 'Ryo', artist: 'Ólafur Arnalds', duration: '3:47' },
      ],
      authorId: adminUser.id,
    },
  ]

  for (const album of albums) {
    await prisma.album.upsert({
      where: { slug: album.slug },
      update: {},
      create: album,
    })
  }

  console.log('🎵 Albums created')

  // Create photos
  const photos = [
    {
      title: 'Quantum Physics Lab Setup',
      slug: 'quantum-physics-lab-setup',
      description: 'Our quantum computing research laboratory with state-of-the-art equipment',
      fullDescription:
        'This photograph captures our cutting-edge quantum physics laboratory during a late-night research session.',
      category: 'lab',
      location: 'University Physics Department',
      date: new Date('2024-02-15'),
      image: '🔬',
      color: 'from-blue-500 to-cyan-600',
      likes: 42,
      camera: 'Canon EOS R5',
      lens: 'RF 24-70mm f/2.8',
      settings: 'f/2.8, 1/60s, ISO 3200',
      tags: ['quantum', 'physics', 'laboratory', 'research', 'science'],
      story:
        'This image was taken during a breakthrough moment in our quantum error correction experiment.',
      technical: {
        equipment: 'Dilution Refrigerator, Laser Systems',
        temperature: '10 millikelvin',
        researchFocus: 'Quantum Error Correction',
        collaboration: 'University Physics Dept',
        duration: '18-month project',
      },
      authorId: adminUser.id,
    },
  ]

  for (const photo of photos) {
    await prisma.photo.upsert({
      where: { slug: photo.slug },
      update: {},
      create: photo,
    })
  }

  console.log('📸 Photos created')

  // Create articles from JSON data
  for (const articleData of articlesData) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        title: articleData.title,
        slug: articleData.slug,
        description: articleData.description,
        category: articleData.category,
        journal: articleData.journal || '',
        status: articleData.status,
        type: 'research',
        citations: articleData.citations,
        doi: articleData.doi || '',
        arxiv: articleData.arxiv || '',
        authors: articleData.authors,
        keywords: [],
        publishedAt: new Date(articleData.publishedAt),
        authorId: adminUser.id,
      },
    })
  }

  console.log('📄 Articles created from JSON data')

  // Create projects from JSON data
  for (const projectData of projectsData) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: {
        title: projectData.title,
        slug: projectData.slug,
        description: projectData.description,
        image: projectData.image,
        technologies: projectData.technologies,
        githubUrl: projectData.githubUrl,
        demoUrl: projectData.demoUrl,
        featured: projectData.featured,
        published: true,
        publishedAt: new Date(projectData.publishedAt),
        authorId: adminUser.id,
      },
    })
  }

  console.log('🚀 Projects created from JSON data')

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
