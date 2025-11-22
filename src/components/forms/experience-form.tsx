'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Briefcase, Building, Calendar, MapPin, Edit, Trash2 } from 'lucide-react'
import { ExperienceDialog } from '@/components/dialogs/experience-dialog'
import { Experience } from '@/types/resume'
import { sampleResumeData } from '@/lib/sample-data'

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResumeStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>()
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add')

  const handleAddExperience = () => {
    setEditingExperience(undefined)
    setDialogMode('add')
    setDialogOpen(true)
  }

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience)
    setDialogMode('edit')
    setDialogOpen(true)
  }

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id)
    }
  }

  const handleSaveExperience = (experienceData: Omit<Experience, 'id'>) => {
    if (dialogMode === 'add') {
      addExperience(experienceData)
    } else if (editingExperience) {
      updateExperience(editingExperience.id, experienceData)
    }
  }

  const handleLoadSampleData = () => {
    if (confirm('This will add sample experience data. Continue?')) {
      sampleResumeData.experience.forEach(exp => {
        addExperience(exp)
      })
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </h3>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddExperience} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
          {resumeData.experience.length === 0 && (
            <Button variant="outline" onClick={handleLoadSampleData} className="flex items-center gap-2">
              Load Sample Data
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {resumeData.experience.map((exp, index) => (
          <Card key={exp.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{exp.position}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditExperience(exp)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteExperience(exp.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exp.description.map((desc, i) => (
                  <p key={i} className="text-sm text-gray-700">• {desc}</p>
                ))}
              </div>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {resumeData.experience.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No work experience added yet</p>
            <Button onClick={handleAddExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        )}
      </div>

      <ExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveExperience}
        experience={editingExperience}
        mode={dialogMode}
      />
    </motion.div>
  )
}