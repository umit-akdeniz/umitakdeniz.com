'use client'

import { motion } from 'framer-motion'
import { Building, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    titleEn: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    location: 'İstanbul, Türkiye',
    locationEn: 'Istanbul, Turkey',
    period: 'Ocak 2022 - Günümüz',
    periodEn: 'Jan 2022 - Present',
    description:
      'E-ticaret platformları ve web uygulamaları geliştirme. React, Next.js ve Node.js teknolojileri ile full-stack projeler yönetimi.',
    descriptionEn:
      'Developing e-commerce platforms and web applications. Managing full-stack projects with React, Next.js and Node.js technologies.',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    achievements: [
      'E-ticaret platformunun performansını %40 artırdım',
      '5 kişilik geliştirici ekibini yönettim',
      'CI/CD süreçlerini optimize ettim',
    ],
    achievementsEn: [
      'Improved e-commerce platform performance by 40%',
      'Led a team of 5 developers',
      'Optimized CI/CD processes',
    ],
  },
  {
    title: 'Frontend Developer',
    titleEn: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'İstanbul, Türkiye',
    locationEn: 'Istanbul, Turkey',
    period: 'Haziran 2020 - Aralık 2021',
    periodEn: 'Jun 2020 - Dec 2021',
    description:
      'React ve Vue.js ile kullanıcı arayüzleri geliştirme. Responsive tasarım ve kullanıcı deneyimi optimizasyonu.',
    descriptionEn:
      'Developing user interfaces with React and Vue.js. Responsive design and user experience optimization.',
    technologies: ['React', 'Vue.js', 'Sass', 'JavaScript', 'Figma'],
    achievements: [
      '20+ web sitesi ve uygulama geliştirdim',
      "Mobil uyumluluk oranını %95'e çıkardım",
      'Kullanıcı deneyimi testleri gerçekleştirdim',
    ],
    achievementsEn: [
      'Developed 20+ websites and applications',
      'Increased mobile compatibility rate to 95%',
      'Conducted user experience tests',
    ],
  },
  {
    title: 'Junior Developer',
    titleEn: 'Junior Developer',
    company: 'StartUp Co.',
    location: 'Ankara, Türkiye',
    locationEn: 'Ankara, Turkey',
    period: 'Eylül 2019 - Mayıs 2020',
    periodEn: 'Sep 2019 - May 2020',
    description:
      'Web geliştirme ve API entegrasyonları. JavaScript ve modern web teknolojileri ile proje geliştirme.',
    descriptionEn:
      'Web development and API integrations. Project development with JavaScript and modern web technologies.',
    technologies: ['JavaScript', 'HTML/CSS', 'REST API', 'Git', 'Bootstrap'],
    achievements: [
      'İlk profesyonel projemi tamamladım',
      'API entegrasyonları geliştirdim',
      'Agile metodolojisini öğrendim',
    ],
    achievementsEn: [
      'Completed my first professional project',
      'Developed API integrations',
      'Learned Agile methodology',
    ],
  },
]

export function Experience() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional experiences and achievements throughout my career
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background z-10"></div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}
              >
                <div className="bg-card p-6 rounded-lg border shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.titleEn}</h3>
                      <div className="flex items-center gap-2 text-primary font-medium mt-1">
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.periodEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.locationEn}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.descriptionEn}</p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.achievementsEn.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
