'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Globe, Edit, Trash2 } from 'lucide-react'

export function LanguagesForm() {
  const { resumeData } = useResumeStore()

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'native': return 'bg-green-100 text-green-700 border-green-200'
      case 'fluent': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'conversational': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'basic': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
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
          <Globe className="w-5 h-5" />
          Languages
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Language
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.languages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.languages.map((language) => (
              <div
                key={language.id}
                className={`p-4 border rounded-lg ${getProficiencyColor(language.proficiency)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-lg">{language.name}</h4>
                    <p className="text-sm capitalize">{language.proficiency}</p>
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No languages added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your Languages
            </Button>
          </div>
        )}
      </div>

      {resumeData.languages.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Proficiency Levels:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Native - Mother tongue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Fluent - Professional working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Conversational - Limited working</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Basic - Elementary</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}