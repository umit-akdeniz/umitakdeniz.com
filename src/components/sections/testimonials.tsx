'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    nameEn: 'Ahmet Yılmaz',
    position: 'CTO, Tech Solutions Inc.',
    positionEn: 'CTO, Tech Solutions Inc.',
    content:
      'Ümit ile çalışmak gerçekten harika bir deneyimdi. Teknik becerileri kadar iletişim yeteneği de mükemmel. Projelerimizi zamanında ve kaliteli bir şekilde teslim etti.',
    contentEn:
      'Working with Ümit has been a fantastic experience. His communication skills are as excellent as his technical abilities. He delivered our projects on time and with high quality.',
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    name: 'Sarah Johnson',
    nameEn: 'Sarah Johnson',
    position: 'Product Manager, Digital Agency',
    positionEn: 'Product Manager, Digital Agency',
    content:
      "Ümit'in problem çözme yeteneği ve detaya olan dikkatı olağanüstü. Ekibimizin en değerli üyelerinden biriydi ve her zaman güvenilir çözümler üretti.",
    contentEn:
      "Ümit's problem-solving ability and attention to detail are extraordinary. He was one of our team's most valuable members and always produced reliable solutions.",
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    name: 'Mehmet Kaya',
    nameEn: 'Mehmet Kaya',
    position: 'Founder, StartUp Co.',
    positionEn: 'Founder, StartUp Co.',
    content:
      'Genç yaşına rağmen çok profesyonel ve deneyimli. Projelerimizi başarıyla tamamladı ve ekibimize büyük katkı sağladı. Kesinlikle tavsiye ederim.',
    contentEn:
      'Despite his young age, he is very professional and experienced. He successfully completed our projects and made great contributions to our team. I definitely recommend him.',
    rating: 5,
    image: '/images/testimonial-3.jpg',
  },
  {
    name: 'Emily Chen',
    nameEn: 'Emily Chen',
    position: 'UI/UX Designer',
    positionEn: 'UI/UX Designer',
    content:
      'Tasarımlarımı mükemmel bir şekilde koda dönüştürdü. Kullanıcı deneyimi konusunda da çok iyi fikirleri var. Birlikte çalışmaktan keyif aldım.',
    contentEn:
      'He perfectly converted my designs into code. He also has great ideas about user experience. I enjoyed working together.',
    rating: 5,
    image: '/images/testimonial-4.jpg',
  },
]

export function Testimonials() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Client Testimonials</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experiences from clients and business partners I've worked with
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card p-6 rounded-lg border shadow-sm"
          >
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.contentEn}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.nameEn}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.positionEn}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
