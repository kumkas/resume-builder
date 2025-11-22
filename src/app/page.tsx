'use client'

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Rocket, Palette, Download, Edit, Eye, CheckCircle2, Star, ArrowRight, Zap, Shield, Globe, MousePointer2, Layers, Wand2 } from "lucide-react"
import { useRef, useState, useEffect } from "react"

// --- Components ---

function Hero3D() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - width / 2)
    mouseY.set(clientY - top - height / 2)
  }

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 150, damping: 20 })

  return (
    <div
      className="relative h-[80vh] flex items-center justify-center perspective-1000 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.4),_transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Resume Building</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
            Design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
              Your Destiny
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
            Stop struggling with Word documents. Build a world-class resume that adapts to your career, not the other way around.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/builder">
              <Button size="lg" className="h-16 px-8 text-lg rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105">
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="h-16 px-8 text-lg rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white transition-all">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* 3D Resume Card */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative hidden lg:block w-full max-w-md mx-auto aspect-[3/4]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-2xl opacity-40 -z-10 transform translate-z-[-50px]" />

          <div className="relative h-full w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 transform translate-z-[20px]">
            {/* Fake UI Elements */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-700 animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-slate-700 rounded" />
                <div className="h-3 w-1/2 bg-slate-800 rounded" />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2">
                  <div className="h-3 w-1/3 bg-slate-600 rounded" />
                  <div className="h-2 w-full bg-slate-700 rounded" />
                  <div className="h-2 w-5/6 bg-slate-700 rounded" />
                </div>
              ))}
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/4 bg-white text-slate-950 p-4 rounded-xl shadow-xl font-bold transform translate-z-[60px]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" />
                <span>Hired!</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Marquee() {
  return (
    <div className="bg-slate-950 border-y border-slate-800 py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap text-slate-500 font-semibold text-xl items-center"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16">
            <span>GOOGLE</span>
            <span>MICROSOFT</span>
            <span>APPLE</span>
            <span>AMAZON</span>
            <span>NETFLIX</span>
            <span>META</span>
            <span>TESLA</span>
            <span>SPOTIFY</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function FeatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const features = [
    {
      title: "AI-Powered Writing",
      desc: "Writer's block is history. Our AI suggests professional bullet points tailored to your role.",
      icon: Wand2,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Real-Time Preview",
      desc: "See changes instantly. No more guessing how your PDF will look.",
      icon: Eye,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "ATS Optimization",
      desc: "Beat the bots. Our templates are designed to pass Applicant Tracking Systems.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity }} className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Superpowers for your career.</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Everything you need to land the interview, built into one powerful platform.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              style={{ y: i % 2 === 0 ? y : 0 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
              <div className="relative h-full bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-colors overflow-hidden">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractiveCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),_transparent_70%)]" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Ready to turn heads?
          </h2>
          <div
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl transition-opacity duration-500 ${hovered ? 'opacity-50' : 'opacity-20'}`} />
            <Link href="/builder">
              <Button className="relative h-24 px-12 text-2xl rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-all hover:scale-105">
                Build My Resume Now
                <ArrowRight className={`ml-4 w-8 h-8 transition-transform duration-300 ${hovered ? 'translate-x-2' : ''}`} />
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-slate-500">No credit card required. Join 10,000+ professionals.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="bg-slate-950 min-h-screen selection:bg-violet-500/30">
      <Hero3D />
      <Marquee />
      <FeatureScroll />
      <InteractiveCTA />

      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center text-slate-600 text-sm">
        <p>© 2025 Resume Builder Pro. Crafted for excellence.</p>
      </footer>
    </main>
  )
}