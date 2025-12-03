import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Mail, MapPin, Phone, Twitter, Linkedin, Youtube, Github } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    kurzy: [
      { label: 'OBJAVUJ-AI', href: '/course/objavuj-ai' },
      { label: 'Prompt Engineering', href: '/courses' },
      { label: 'AI pre Biznis', href: '/courses' },
      { label: t('footer.allCourses'), href: '/courses' },
    ],
    zdroje: [
      { label: 'Blog', href: '#' },
      { label: 'Dokumentacia', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Podpora', href: '#' },
    ],
    spolocnost: [
      { label: t('footer.aboutUs'), href: '#' },
      { label: 'Kariera', href: '#' },
      { label: t('footer.contact'), href: '#' },
      { label: 'Partneri', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="bg-secondary dark:bg-dark-background-secondary text-white">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                OBJAVUJ<span className="text-primary">-AI</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                           transition-colors duration-200 hover:bg-white/20"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Kurzy */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.courses')}</h4>
            <ul className="space-y-3">
              {footerLinks.kurzy.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zdroje */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Zdroje</h4>
            <ul className="space-y-3">
              {footerLinks.zdroje.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Spolocnost */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.spolocnost.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@objavuj-ai.sk</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+421 900 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Bratislava, Slovensko</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            {currentYear} OBJAVUJ-AI. {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
