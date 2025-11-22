'use client'

import { use } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Crown, Download, Edit } from "lucide-react"
import Link from "next/link"
import { getTemplateById } from "@/lib/templates"
import { useResumeStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface PreviewPageProps {
  params: Promise<{
    id: string
  }>
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { id } = use(params)
  const template = getTemplateById(id)
  const setSelectedTemplate = useResumeStore((state) => state.setSelectedTemplate)
  const router = useRouter()

  if (!template) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Not Found</h1>
          <p className="text-gray-600 mb-8">The template you're looking for doesn't exist.</p>
          <Link href="/templates">
            <Button>Back to Templates</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleUseTemplate = () => {
    setSelectedTemplate(template)
    toast.success(`${template.name} template selected! Redirecting to builder...`)
    setTimeout(() => {
      router.push('/builder')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/templates">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Templates
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            {template.isPremium && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                <Crown className="w-4 h-4" />
                Premium Template
              </div>
            )}
            <Button onClick={handleUseTemplate} className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Use This Template
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {template.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {template.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
              {template.category}
            </span>
            {template.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Template Preview */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Mock resume preview */}
            <div 
              className="h-96 md:h-[600px] p-8 flex items-center justify-center bg-white"
            >
              <div className="w-full max-w-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <div 
                      className="text-3xl font-bold mb-2"
                      className="text-black"
                    >
                      John Doe
                    </div>
                    <div 
                      className="text-lg"
                      className="text-gray-700"
                    >
                      Senior Software Developer
                    </div>
                    <div 
                      className="text-sm mt-2"
                      className="text-gray-600"
                    >
                      john.doe@email.com • +1 (555) 123-4567 • San Francisco, CA
                    </div>
                  </div>

                  {/* Content sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div 
                        className="text-xl font-semibold mb-3 pb-1 border-b-2"
                        className="text-black border-black"
                      >
                        Experience
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div 
                            className="font-semibold"
                            className="text-gray-700"
                          >
                            Tech Lead
                          </div>
                          <div 
                            className="text-sm"
                            className="text-gray-600"
                          >
                            2021 - Present • TechCorp Inc.
                          </div>
                        </div>
                        <div>
                          <div 
                            className="font-semibold"
                            className="text-gray-700"
                          >
                            Senior Developer
                          </div>
                          <div 
                            className="text-sm"
                            className="text-gray-600"
                          >
                            2019 - 2021 • StartupXYZ
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div 
                        className="text-xl font-semibold mb-3 pb-1 border-b-2"
                        className="text-black border-black"
                      >
                        Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-1 rounded text-xs font-medium"
                            className="bg-gray-100 text-gray-800 border border-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Template Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {template.features.map((feature) => (
              <div 
                key={feature}
                className="bg-white rounded-lg p-4 text-center shadow-sm border"
              >
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button size="lg" onClick={handleUseTemplate} className="text-lg px-8 py-4">
            <Edit className="w-5 h-5 mr-2" />
            Start Building with {template.name}
          </Button>
        </motion.div>
      </div>
    </main>
  )
}