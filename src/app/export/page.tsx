'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileDown, Image, Globe, FileText } from "lucide-react"
import Link from "next/link"

export default function ExportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center mb-8">
            <Link href="/">
              <Button variant="outline" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Export Your Resume
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Coming Soon! Export your resume in multiple formats for different use cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <FileDown className="text-white h-8 w-8" />
                </div>
                <CardTitle>PDF Export</CardTitle>
                <CardDescription>
                  High-quality PDF perfect for job applications and printing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Image className="text-white h-8 w-8" />
                </div>
                <CardTitle>Image Export</CardTitle>
                <CardDescription>
                  PNG/JPEG formats for social media and online portfolios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Globe className="text-white h-8 w-8" />
                </div>
                <CardTitle>Web Portfolio</CardTitle>
                <CardDescription>
                  Generate a live website with your resume and portfolio
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <FileText className="text-white h-8 w-8" />
                </div>
                <CardTitle>Word Document</CardTitle>
                <CardDescription>
                  Compatible .docx format for easy editing and sharing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="pt-8 space-y-4">
            <p className="text-gray-600">Ready to create your resume?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates">
                <Button variant="outline" size="lg">
                  View Templates
                </Button>
              </Link>
              <Link href="/builder">
                <Button size="lg">
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}