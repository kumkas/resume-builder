'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/templates', label: 'Templates' },
    { href: '/builder', label: 'Builder' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">ResumeBuilder</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className={`text-sm font-medium transition-colors hover:text-violet-400 ${pathname === link.href ? 'text-white' : 'text-slate-400'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/builder">
            <Button className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-6 font-semibold">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium p-2 ${pathname === link.href ? 'text-white' : 'text-slate-400'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 rounded-full font-semibold">
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  )
}