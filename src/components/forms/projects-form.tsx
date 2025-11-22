'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Code, Calendar, Globe, Github, Edit, Trash2 } from 'lucide-react'

export function ProjectsForm() {
  const { resumeData } = useResumeStore()

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Code className="w-5 h-5" />
          Projects
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.startDate} - {project.current ? 'Present' : project.endDate}
                    </span>
                    {project.url && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </span>
                    )}
                    {project.github && (
                      <span className="flex items-center gap-1">
                        <Github className="w-4 h-4" />
                        Source Code
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{project.description}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Key Highlights:</p>
                  <div className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <p key={i} className="text-sm text-gray-700">• {highlight}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {resumeData.projects.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No projects added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}