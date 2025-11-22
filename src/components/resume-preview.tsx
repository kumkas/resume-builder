'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ResumeData, ResumeTemplate } from '@/types/resume'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Building, GraduationCap } from 'lucide-react'

interface ResumePreviewProps {
  resumeData: ResumeData
  template: ResumeTemplate
  scale?: number
}

export function ResumePreview({ resumeData, template, scale = 1 }: ResumePreviewProps) {
  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: `${100 / scale}%`,
    height: `${100 / scale}%`,
  }

  if (!resumeData || !template) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No preview available</p>
      </div>
    )
  }

  // Helper to get section config
  const getSectionConfig = (sectionId: string) => {
    if (Array.isArray(template.layout.sections)) {
      const section = template.layout.sections.find((s: any) =>
        typeof s === 'string' ? s === sectionId : s.id === sectionId
      )
      // Return default config if string, or the config object if object
      if (typeof section === 'string') return { visible: true }
      return section || { visible: true }
    }
    return { visible: true }
  }

  // Helper to check if section should be rendered
  const shouldRenderSection = (sectionId: string) => {
    const config = getSectionConfig(sectionId)
    // @ts-ignore
    if (config.visible === false) return false

    switch (sectionId) {
      case 'experience': return resumeData.experience.length > 0
      case 'education': return resumeData.education.length > 0
      case 'skills': return resumeData.skills.length > 0
      case 'projects': return resumeData.projects.length > 0
      case 'summary': return !!resumeData.personalInfo.summary
      case 'certificates': return resumeData.certificates && resumeData.certificates.length > 0
      case 'languages': return resumeData.languages && resumeData.languages.length > 0
      default: return true
    }
  }

  const renderHeader = () => {
    const { colors, fonts } = template.theme
    const { headerStyle = 'centered' } = template.layout

    const alignmentClass = headerStyle === 'left' ? 'text-left' :
      headerStyle === 'right' ? 'text-right' :
        'text-center'

    return (
      <div className={`mb-6 ${alignmentClass}`}>
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: colors.primary, fontFamily: fonts.heading }}
        >
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>

        <div className={`flex flex-wrap gap-4 text-sm mb-4 ${headerStyle === 'centered' ? 'justify-center' : ''}`} style={{ color: colors.text }}>
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {resumeData.personalInfo.email}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {resumeData.personalInfo.phone}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resumeData.personalInfo.location}
            </div>
          )}
        </div>

        <div className={`flex flex-wrap gap-4 text-sm mb-4 ${headerStyle === 'centered' ? 'justify-center' : ''}`} style={{ color: colors.text }}>
          {resumeData.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              Website
            </div>
          )}
          {resumeData.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </div>
          )}
          {resumeData.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSectionTitle = (title: string) => {
    const { colors, fonts, sectionStyle = 'simple' } = template.theme

    const baseStyle = {
      color: colors.primary,
      fontFamily: fonts.heading,
    }

    if (sectionStyle === 'underlined') {
      return (
        <h2
          className="text-xl font-bold mb-4 pb-2 border-b-2"
          style={{ ...baseStyle, borderColor: colors.primary }}
        >
          {title}
        </h2>
      )
    }

    if (sectionStyle === 'boxed') {
      return (
        <h2
          className="text-xl font-bold mb-4 p-2 rounded"
          style={{ ...baseStyle, backgroundColor: colors.primary + '10' }}
        >
          {title}
        </h2>
      )
    }

    if (sectionStyle === 'minimal') {
      return (
        <h2
          className="text-xl font-bold mb-4 uppercase tracking-wider"
          style={baseStyle}
        >
          {title}
        </h2>
      )
    }

    // Default 'simple'
    return (
      <h2 className="text-xl font-bold mb-4" style={baseStyle}>
        {title}
      </h2>
    )
  }

  const renderSection = (type: string) => {
    if (!shouldRenderSection(type)) return null

    const { colors, spacing } = template.theme
    const spacingClass = spacing === 'compact' ? 'mb-4' : spacing === 'relaxed' ? 'mb-8' : 'mb-6'

    // Header is handled separately in renderLayout
    if (type === 'header' || type === 'personal-info') return null

    switch (type) {
      case 'summary':
        return (
          <div key="summary" className={spacingClass}>
            {renderSectionTitle('Professional Summary')}
            <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )

      case 'experience':
        return (
          <div key="experience" className={spacingClass}>
            {renderSectionTitle('Professional Experience')}
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{exp.position}</h3>
                      <div className="flex items-center gap-4 text-sm" style={{ color: colors.muted }}>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm flex items-start" style={{ color: colors.text }}>
                        <span className="mr-2 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )

      case 'education':
        return (
          <div key="education" className={spacingClass}>
            {renderSectionTitle('Education')}
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{edu.degree} in {edu.field}</h3>
                      <div className="flex items-center gap-4 text-sm" style={{ color: colors.muted }}>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {edu.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'skills':
        return (
          <div key="skills" className={spacingClass}>
            {renderSectionTitle('Skills')}
            <div className="grid grid-cols-2 gap-4">
              {['technical', 'soft', 'language', 'tool'].map((category) => {
                const categorySkills = resumeData.skills.filter(skill => skill.category === category)
                if (categorySkills.length === 0) return null

                return (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2 capitalize" style={{ color: colors.secondary }}>{category} Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-2 py-1 text-xs rounded"
                          style={{
                            backgroundColor: colors.primary + '10',
                            color: colors.primary,
                            border: `1px solid ${colors.primary}30`
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div key="projects" className={spacingClass}>
            {renderSectionTitle('Projects')}
            <div className="space-y-4">
              {resumeData.projects.slice(0, 3).map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{project.name}</h3>
                  <p className="text-sm mb-2" style={{ color: colors.text }}>{project.description}</p>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <li key={i} className="text-sm flex items-start" style={{ color: colors.text }}>
                        <span className="mr-2 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )

      case 'certificates':
        return (
          <div key="certificates" className={spacingClass}>
            {renderSectionTitle('Certifications')}
            <div className="space-y-2">
              {resumeData.certificates.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-sm font-semibold" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-xs" style={{ color: colors.muted }}>{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Main Layout Renderer
  const renderLayout = () => {
    const { sections, columns, headerStyle } = template.layout
    const normalizedSections = Array.isArray(sections) ? sections : []

    // Filter out header/personal-info from sections list as it's handled explicitly
    const contentSections = normalizedSections.filter((s: any) => {
      const id = typeof s === 'string' ? s : s.id
      return id !== 'header' && id !== 'personal-info'
    })

    const HeaderComponent = renderHeader()

    // If single column
    if (columns === 1) {
      return (
        <div className="h-full">
          {headerStyle !== 'sidebar' && HeaderComponent}
          <div className="space-y-2">
            {contentSections.map((section: any) => {
              const id = typeof section === 'string' ? section : section.id
              return renderSection(id)
            })}
          </div>
        </div>
      )
    }

    // If two columns
    if (columns === 2) {
      const leftColumn: any[] = []
      const rightColumn: any[] = []

      contentSections.forEach((section: any) => {
        const id = typeof section === 'string' ? section : section.id

        // Determine column based on explicit config
        let col = 1
        if (typeof section !== 'string' && section.position) {
          col = section.position.column
        } else {
          // Fallback logic
          if (['skills', 'education', 'languages', 'certificates'].includes(id)) {
            col = 2
          } else {
            col = 1
          }
        }

        if (col === 1) leftColumn.push(id)
        else rightColumn.push(id)
      })

      if (headerStyle === 'sidebar') {
        return (
          <div className="grid grid-cols-3 gap-8 h-full">
            <div className="col-span-1 bg-opacity-10 p-4 -m-8 mr-0" style={{ backgroundColor: template.theme.colors.primary + '10' }}>
              {HeaderComponent}
              <div className="mt-8 space-y-6">
                {leftColumn.map(id => renderSection(id))}
              </div>
            </div>
            <div className="col-span-2 py-8 pr-8">
              {rightColumn.map(id => renderSection(id))}
            </div>
          </div>
        )
      }

      return (
        <div className="h-full">
          {HeaderComponent}
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2 space-y-6">
              {leftColumn.map(id => renderSection(id))}
            </div>
            <div className="col-span-1 space-y-6 border-l pl-6" style={{ borderColor: template.theme.colors.secondary + '30' }}>
              {rightColumn.map(id => renderSection(id))}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <motion.div
      id="resume-preview"
      className="bg-white shadow-lg"
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="min-h-[842px] w-[595px] p-8"
        style={{
          backgroundColor: template.theme.colors.background,
          color: template.theme.colors.text,
          fontFamily: template.theme.fonts.body,
        }}
      >
        {renderLayout()}
      </div>
    </motion.div>
  )
}