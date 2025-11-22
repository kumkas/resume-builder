'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { Plus, Award, Calendar, Building, ExternalLink, Edit, Trash2 } from 'lucide-react'

export function CertificatesForm() {
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
          <Award className="w-5 h-5" />
          Certificates & Certifications
        </h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      <div className="space-y-4">
        {resumeData.certificates.map((cert) => (
          <Card key={cert.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {cert.date}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </span>
                    {cert.url && (
                      <span className="flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
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
              {cert.credentialId && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Credential ID:</span> {cert.credentialId}
                </p>
              )}
            </CardContent>
          </Card>
        ))}

        {resumeData.certificates.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No certificates added yet</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Certificate
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}