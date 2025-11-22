'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, GraduationCap, School, Calendar, MapPin, Edit, Trash2 } from 'lucide-react'

export function EducationForm() {
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
          <GraduationCap className="w-5 h-5" />
          Education
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <Card key={edu.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{edu.degree} in {edu.field}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <School className="w-4 h-4" />
                      {edu.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </span>
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
              {edu.gpa && (
                <p className="text-sm text-gray-700 mb-2">GPA: {edu.gpa}</p>
              )}
              {edu.honors && edu.honors.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Honors:</p>
                  <div className="flex flex-wrap gap-1">
                    {edu.honors.map((honor, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {honor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {edu.coursework && edu.coursework.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-1">
                    {edu.coursework.map((course, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {resumeData.education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No education added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your Education
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}