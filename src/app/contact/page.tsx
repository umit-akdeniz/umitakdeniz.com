'use client'

import { Button } from '@/components/ui/button'
import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  Code,
  Coffee,
  ExternalLink,
  FileText,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Phone,
  Send,
  Twitter,
  User,
  Users,
  Video,
  Youtube,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('Your message has been sent successfully! I will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Connection error. Please check your internet connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">umit@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+90 555 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">Istanbul, Turkey</p>
                </div>
              </div>
            </div>

            {/* Social Media & Professional Networks */}
            <div className="space-y-8">
              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Social Media
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <a
                    href="https://twitter.com/umitakdeniz"
                    className="group relative w-12 h-12 bg-gradient-to-r from-black to-gray-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://instagram.com/umitakdeniz"
                    className="group relative w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com/in/umitakdeniz"
                    className="group relative w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://github.com/umitakdeniz"
                    className="group relative w-12 h-12 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Academic & Research */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Profiles
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://orcid.org/0000-0000-0000-0000"
                    className="group flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ORCID"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-white font-medium text-sm">ORCID</span>
                  </a>
                  <a
                    href="https://scholar.google.com/citations?user=umitakdeniz"
                    className="group flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Google Scholar"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-white font-medium text-sm">Google Scholar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Send Message</h2>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div
                className={`p-4 rounded-lg mb-6 ${
                  submitStatus === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
