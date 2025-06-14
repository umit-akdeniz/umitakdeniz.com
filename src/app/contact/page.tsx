'use client'

import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  GraduationCap,
  BookOpen,
} from 'lucide-react'

export default function ContactPage() {
  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:umit@akdeniz.dev',
      username: 'umit@akdeniz.dev',
      color: 'from-blue-500 to-blue-600',
      description: 'Direct email communication',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/umit-akdeniz',
      username: '@umit-akdeniz',
      color: 'from-gray-800 to-gray-900',
      description: 'Source code and projects',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/umitakdeniz',
      username: '/in/umitakdeniz',
      color: 'from-blue-600 to-blue-700',
      description: 'Professional networking',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/umitakdeniz',
      username: '@umitakdeniz',
      color: 'from-black to-gray-800',
      description: 'Thoughts and updates',
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.com/users/umitakdeniz',
      username: 'umitakdeniz',
      color: 'from-indigo-500 to-purple-600',
      description: 'Real-time chat',
    },
    {
      name: 'Google Scholar',
      icon: GraduationCap,
      url: 'https://scholar.google.com/citations?user=umitakdeniz',
      username: 'Ümit Akdeniz',
      color: 'from-blue-500 to-blue-600',
      description: 'Academic publications and citations',
    },
    {
      name: 'ResearchGate',
      icon: BookOpen,
      url: 'https://www.researchgate.net/profile/Umit-Akdeniz',
      username: 'Ümit Akdeniz',
      color: 'from-teal-500 to-green-600',
      description: 'Research network and collaboration',
    },
  ]

  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect for research collaborations, academic discussions, and professional
            opportunities in theoretical physics.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {contactLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/30"
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {link.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">{link.description}</p>

                  <p className="text-sm font-mono text-primary/80 group-hover:text-primary transition-colors">
                    {link.username}
                  </p>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for research collaborations and academic opportunities
          </div>
        </div>
      </div>
    </div>
  )
}
