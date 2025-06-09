import { Badge } from '@/components/ui/badge'
import { Calendar, Download, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue.js',
  'Node.js',
  'Express',
  'Python',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'AWS',
  'Git',
  'Figma',
  'Tailwind CSS',
  'Sass',
]

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Developing e-commerce platforms and web applications using modern technologies',
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2020 - 2022',
    description: 'Creating responsive user interfaces with React and Vue.js',
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Co.',
    period: '2019 - 2020',
    description: 'Web development and API integrations for various client projects',
  },
]

export default function AboutPage() {
  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground">
            My journey as a passionate developer in the world of technology
          </p>
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>umit@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>5+ years experience</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">About Me</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hello! I'm Ümit, a passionate full-stack developer with a background in physics. For
              over 5 years, I've been developing user-friendly and performant applications using
              modern web technologies. I have a continuous learning approach and focus on
              self-improvement.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              I'm meticulous about writing clean code, prioritizing user experience, and staying
              up-to-date with the latest technologies. I'm a team-oriented developer with a
              problem-solving mindset and a passion for innovation.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-6 pb-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV Download */}
        <div className="text-center">
          <Link
            href="/cv/umit-akdeniz-cv.pdf"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download CV
          </Link>
        </div>
      </div>
    </div>
  )
}
