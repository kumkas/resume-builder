'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Award, Code, Heart, Globe, Wrench } from 'lucide-react'

export function SkillsForm() {
  const { resumeData } = useResumeStore()

  const getSkillsByCategory = (category: string) => {
    return resumeData.skills.filter(skill => skill.category === category)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return Code
      case 'soft': return Heart
      case 'language': return Globe
      case 'tool': return Wrench
      default: return Award
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-700'
      case 'soft': return 'bg-green-100 text-green-700'
      case 'language': return 'bg-purple-100 text-purple-700'
      case 'tool': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const categories = [
    { id: 'technical', name: 'Technical Skills', icon: Code },
    { id: 'soft', name: 'Soft Skills', icon: Heart },
    { id: 'language', name: 'Languages', icon: Globe },
    { id: 'tool', name: 'Tools', icon: Wrench },
  ]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-5 h-5" />
          Skills
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="space-y-6">
        {categories.map((category) => {
          const skills = getSkillsByCategory(category.id)
          const Icon = category.icon

          return (
            <div key={category.id} className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {category.name}
              </h4>
              
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${getCategoryColor(skill.category)}`}
                    >
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="ml-2 text-xs opacity-75">
                          ({skill.level})
                        </span>
                      )}
                      {skill.years && (
                        <span className="ml-2 text-xs opacity-75">
                          {skill.years}y
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No {category.name.toLowerCase()} added yet
                </p>
              )}
            </div>
          )
        })}

        {resumeData.skills.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No skills added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your Skills
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}