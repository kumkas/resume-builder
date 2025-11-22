'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { resumeTemplates, getTemplatesByCategory, getFreeTemplates, getPremiumTemplates } from '@/lib/templates'
import { ResumeTemplate } from '@/types/resume'
import { useResumeStore } from '@/lib/store'
import { Crown, Eye, Palette, Filter, Star, Sparkles, Layout } from 'lucide-react'
import toast from 'react-hot-toast'

type FilterType = 'all' | 'free' | 'premium' | 'modern' | 'classic' | 'creative' | 'minimal' | 'executive' | 'academic'

const filterOptions = [
  { value: 'all', label: 'All Templates', icon: Layout },
  { value: 'free', label: 'Free', icon: Star },
  { value: 'premium', label: 'Premium', icon: Crown },
  { value: 'modern', label: 'Modern', icon: Palette },
  { value: 'classic', label: 'Classic', icon: Palette },
  { value: 'creative', label: 'Creative', icon: Palette },
  { value: 'minimal', label: 'Minimal', icon: Palette },
  { value: 'executive', label: 'Executive', icon: Palette },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function TemplatesPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const router = useRouter()
  const setSelectedTemplate = useResumeStore((state) => state.setSelectedTemplate)

  const getFilteredTemplates = (): ResumeTemplate[] => {
    switch (selectedFilter) {
      case 'free':
        return getFreeTemplates()
      case 'premium':
        return getPremiumTemplates()
      case 'modern':
      case 'classic':
      case 'creative':
      case 'minimal':
      case 'executive':
      case 'academic':
        return getTemplatesByCategory(selectedFilter)
      default:
        return resumeTemplates
    }
  }

  const filteredTemplates = getFilteredTemplates()

  const handleUseTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template)
    toast.success(`${template.name} template selected! Redirecting to builder...`)
    setTimeout(() => {
      router.push('/builder')
    }, 1000)
  }

  const handlePreviewTemplate = (template: ResumeTemplate) => {
    toast.loading('Opening template preview...', { duration: 1500 })
    window.open(`/templates/preview/${template.id}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center space-y-6 mb-16" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Premium Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Identity</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Professionally crafted templates designed to get you hired. Optimized for ATS, styled for humans.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          variants={itemVariants}
        >
          {filterOptions.map((filter) => {
            const Icon = filter.icon
            const isSelected = selectedFilter === filter.value
            return (
              <motion.button
                key={filter.value}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${isSelected
                    ? 'bg-white text-slate-950 shadow-lg shadow-white/10 scale-105'
                    : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                onClick={() => setSelectedFilter(filter.value as FilterType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-violet-600' : ''}`} />
                {filter.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Templates Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <Card className="group h-full bg-slate-900/50 border-slate-800 overflow-hidden hover:border-violet-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10">
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
                    {/* Template Preview Placeholder - In a real app this would be an image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <div className="w-[80%] h-[90%] bg-white rounded shadow-lg transform group-hover:scale-105 transition-transform duration-700 p-4 overflow-hidden">
                        {/* Abstract Resume Layout */}
                        <div className="space-y-3 opacity-50">
                          <div className={`h-4 bg-slate-800 rounded w-1/2 ${(template.layout as any).headerStyle === 'centered' ? 'mx-auto' : ''}`} />
                          <div className="h-2 bg-slate-400 rounded w-3/4" />
                          <div className="h-px bg-slate-200 my-4" />
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 space-y-2">
                              <div className="h-2 bg-slate-300 rounded w-full" />
                              <div className="h-2 bg-slate-300 rounded w-5/6" />
                              <div className="h-2 bg-slate-300 rounded w-4/5" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 bg-slate-200 rounded w-full" />
                              <div className="h-2 bg-slate-200 rounded w-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    {template.isPremium && (
                      <div className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10">
                        <Crown className="w-3 h-3" />
                        PREMIUM
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`}>
                      <Button
                        size="lg"
                        className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-8 font-bold transform hover:scale-105 transition-all"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2">{template.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No templates message */}
        {filteredTemplates.length === 0 && (
          <motion.div
            className="text-center py-24"
            variants={itemVariants}
          >
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
              <Filter className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No templates found</h3>
            <p className="text-slate-400">Try adjusting your filters to explore our collection.</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  )
}