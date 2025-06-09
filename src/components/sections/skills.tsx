'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Frontend',
    titleEn: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Vue.js', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Sass/SCSS', level: 85 },
    ],
  },
  {
    title: 'Backend',
    titleEn: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Django', level: 70 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    title: 'Araçlar & Diğer',
    titleEn: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Figma', level: 85 },
      { name: 'Jest', level: 80 },
      { name: 'Webpack', level: 75 },
    ],
  },
  {
    title: 'Fiziksel Beceriler',
    titleEn: 'Physical Skills',
    skills: [
      { name: 'Araba Kullanma', level: 95 },
      { name: 'Motorsiklet', level: 88 },
      { name: 'Daktilo Yazma', level: 82 },
      { name: 'Fotoğrafçılık', level: 79 },
      { name: 'Bisiklet', level: 85 },
      { name: 'Yüzme', level: 75 },
    ],
  },
  {
    title: 'Hobi & İlgi Alanları',
    titleEn: 'Hobbies & Interests',
    skills: [
      { name: 'Vintage Teknoloji', level: 92 },
      { name: 'Klasik Arabalar', level: 89 },
      { name: 'Müzik Prodüksiyonu', level: 73 },
      { name: 'Kahve Hazırlama', level: 81 },
      { name: 'Kitap Okuma', level: 87 },
      { name: 'Seyahat', level: 78 },
    ],
  },
]

export function Skills() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Skills</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Technologies I use and my proficiency levels in each
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="bg-card p-6 rounded-lg border"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">{category.titleEn}</h3>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 1,
                        ease: 'easeOut',
                      }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
