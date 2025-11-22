'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Users, Building, Mail, Phone, Edit, Trash2 } from 'lucide-react'

export function ReferencesForm() {
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
          <Users className="w-5 h-5" />
          References
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Reference
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.references.map((reference) => (
          <Card key={reference.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{reference.name}</CardTitle>
                  <div className="space-y-1 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {reference.position} at {reference.company}
                    </div>
                    <p className="text-gray-500">Relationship: {reference.relationship}</p>
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
              <div className="space-y-2">
                {reference.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{reference.email}</span>
                  </div>
                )}
                {reference.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{reference.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {resumeData.references.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No references added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Reference
            </Button>
          </div>
        )}
      </div>

      {resumeData.references.length === 0 && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">💡 Pro Tip</h4>
          <p className="text-sm text-amber-700">
            Add 2-3 professional references who can vouch for your work quality and character. 
            Always ask for permission before listing someone as a reference.
          </p>
        </div>
      )}
    </motion.div>
  )
}