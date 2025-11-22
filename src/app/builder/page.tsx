'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Crown, User, Briefcase, GraduationCap, Code, Award, Globe, Users, Download, Eye, Save, Plus, FileText, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useResumeStore } from "@/lib/store"
import { sampleResumeData } from '@/lib/sample-data'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PersonalInfoForm } from '@/components/forms/personal-info-form'
import { ExperienceForm } from '@/components/forms/experience-form'
import { EducationForm } from '@/components/forms/education-form'
import { ProjectsForm } from '@/components/forms/projects-form'
import { SkillsForm } from '@/components/forms/skills-form'
import { CertificatesForm } from '@/components/forms/certificates-form'
import { LanguagesForm } from '@/components/forms/languages-form'
import { ReferencesForm } from '@/components/forms/references-form'
import { ResumePreview } from '@/components/resume-preview'
import toast from 'react-hot-toast'

type BuilderStep = 'personal' | 'experience' | 'education' | 'projects' | 'skills' | 'certificates' | 'languages' | 'references'

const builderSteps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'references', label: 'References', icon: Users },
] as const

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('personal')
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    selectedTemplate,
    resumeData,
    setResumeData,
    markUnsaved,
    markSaved,
    unsavedChanges
  } = useResumeStore()

  // Debug: Log resume data whenever it changes
  useEffect(() => {
    console.log('Builder - Resume data changed:', resumeData)
  }, [resumeData])

  // Load sample data if resume is empty
  useEffect(() => {
    if (!resumeData.personalInfo.fullName) {
      setResumeData(sampleResumeData)
      toast.success('Sample resume data loaded!')
    }
  }, [resumeData.personalInfo.fullName, setResumeData])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      markSaved()
      toast.success('Resume saved successfully!')
    } catch (error) {
      toast.error('Failed to save resume')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get the exact data being used by the preview
  const getPreviewData = () => {
    const { resumeData: currentData } = useResumeStore.getState()

    // Extract exactly what the preview shows
    const previewData = {
      personalInfo: {
        fullName: currentData.personalInfo?.fullName || 'Your Name',
        email: currentData.personalInfo?.email || '',
        phone: currentData.personalInfo?.phone || '',
        location: currentData.personalInfo?.location || '',
        website: currentData.personalInfo?.website || '',
        linkedin: currentData.personalInfo?.linkedin || '',
        github: currentData.personalInfo?.github || '',
        summary: currentData.personalInfo?.summary || ''
      },
      experience: currentData.experience || [],
      education: currentData.education || [],
      skills: currentData.skills || [],
      projects: currentData.projects || [],
      certificates: currentData.certificates || [],
      languages: currentData.languages || [],
      references: currentData.references || []
    }

    console.log('=== PREVIEW DATA EXTRACTION ===')
    console.log('Full Name from preview:', previewData.personalInfo.fullName)
    console.log('Email from preview:', previewData.personalInfo.email)
    console.log('Experience count from preview:', previewData.experience.length)
    console.log('First experience from preview:', previewData.experience[0])
    console.log('================================')

    return previewData
  }

  const handleExportPDF = async () => {
    try {
      toast.loading('Generating PDF...', { id: 'pdf-export' })

      // Get the EXACT same data the preview is using
      const previewData = getPreviewData()

      // Verify we have data
      if (previewData.personalInfo.fullName === 'Your Name' && previewData.experience.length === 0) {
        toast.error('Please add some resume data first. The preview shows no real data.', { id: 'pdf-export' })
        return
      }

      // Dynamic import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default

      console.log('Creating properly formatted PDF...')

      // Create PDF
      // A4 size: 210mm x 297mm
      // Preview padding: p-8 (2rem = 32px ≈ 8.5mm)
      // We'll use 15mm margins for a balanced print look, slightly more than screen
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth() // 210
      const pageHeight = pdf.internal.pageSize.getHeight() // 297
      const margin = 15
      const contentWidth = pageWidth - (margin * 2)
      let yPosition = margin

      // Helper to convert hex to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ] : [0, 0, 0]
      }

      // Get theme colors
      const theme = selectedTemplate.theme
      const primaryColor = hexToRgb(theme.colors.primary)
      const textColor = hexToRgb(theme.colors.text)
      const mutedColor = hexToRgb(theme.colors.muted)

      // Map template fonts to standard PDF fonts
      // Note: jsPDF standard fonts are limited. For exact matching we'd need to embed fonts.
      // This mapping tries to approximate the style (Serif vs Sans).
      const getPdfFont = (fontFamily: string) => {
        const serifFonts = ['Playfair Display', 'Crimson Pro', 'Georgia', 'Times New Roman', 'Cormorant Garamond']
        const monoFonts = ['JetBrains Mono', 'Courier New']

        if (serifFonts.some(f => fontFamily.includes(f))) return 'times'
        if (monoFonts.some(f => fontFamily.includes(f))) return 'courier'
        return 'helvetica'
      }

      const headingFont = getPdfFont(theme.fonts.heading)
      const bodyFont = getPdfFont(theme.fonts.body)

      // Helper function to add text with line breaks and return new Y position
      // Tailwind 'leading-relaxed' is ~1.625. 
      // jsPDF default line height factor is 1.15. We need to adjust.
      const lineHeightFactor = 1.5

      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const fontSize = options.fontSize || 10
        pdf.setFontSize(fontSize)
        if (options.font) pdf.setFont(options.font, options.fontStyle || 'normal')
        if (options.color) pdf.setTextColor(options.color[0], options.color[1], options.color[2])

        const maxWidth = options.maxWidth || contentWidth
        const lines = pdf.splitTextToSize(text, maxWidth)

        // Calculate height of this block
        // line height in mm = fontSize (pt) * 0.3527 (mm/pt) * lineHeightFactor
        const lineHeightMm = fontSize * 0.3527 * (options.lineHeightFactor || lineHeightFactor)

        pdf.text(lines, x, y, { ...options, baseline: 'top' })

        // Reset styles
        if (options.color) pdf.setTextColor(textColor[0], textColor[1], textColor[2])

        return y + (lines.length * lineHeightMm) + (options.marginBottom || 0)
      }

      // --- HEADER SECTION ---

      // Name: text-4xl (36px ≈ 27pt) or text-5xl depending on template. Let's use 24pt for PDF.
      yPosition = addText(previewData.personalInfo.fullName.toUpperCase(), margin, yPosition, {
        fontSize: 24,
        font: headingFont,
        fontStyle: 'bold',
        color: primaryColor,
        align: 'center',
        maxWidth: contentWidth,
        marginBottom: 6
      })

      // Contact Info: text-sm (14px ≈ 10.5pt). Let's use 10pt.
      const contactInfo = []
      if (previewData.personalInfo.email) contactInfo.push(previewData.personalInfo.email)
      if (previewData.personalInfo.phone) contactInfo.push(previewData.personalInfo.phone)
      if (previewData.personalInfo.location) contactInfo.push(previewData.personalInfo.location)

      if (contactInfo.length > 0) {
        yPosition = addText(contactInfo.join(' • '), margin, yPosition, {
          fontSize: 10,
          font: bodyFont,
          color: mutedColor,
          align: 'center',
          maxWidth: contentWidth,
          marginBottom: 8
        })
      }

      // Summary
      if (previewData.personalInfo.summary) {
        // Add a small separator or space
        yPosition += 2
        yPosition = addText(previewData.personalInfo.summary, margin, yPosition, {
          fontSize: 10,
          font: bodyFont,
          color: textColor,
          align: 'left', // Summary usually looks better left-aligned or justified
          maxWidth: contentWidth,
          marginBottom: 10
        })
      }

      // Helper for Section Headings
      const addSectionHeading = (title: string, y: number) => {
        // text-lg (18px ≈ 13.5pt) font-semibold
        pdf.setFontSize(14)
        pdf.setFont(headingFont, 'bold')
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.text(title.toUpperCase(), margin, y)

        // Underline
        const textWidth = pdf.getStringUnitWidth(title.toUpperCase()) * 14 / pdf.internal.scaleFactor
        pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.setLineWidth(0.5)
        pdf.line(margin, y + 2, pageWidth - margin, y + 2)

        return y + 8
      }

      // --- EXPERIENCE SECTION ---
      if (previewData.experience && previewData.experience.length > 0) {
        if (yPosition > pageHeight - 40) { pdf.addPage(); yPosition = margin; }
        yPosition = addSectionHeading('PROFESSIONAL EXPERIENCE', yPosition)

        previewData.experience.forEach((exp) => {
          if (yPosition > pageHeight - 40) { pdf.addPage(); yPosition = margin; }

          // Position (Left) & Date (Right)
          // text-base (16px ≈ 12pt) font-semibold
          pdf.setFontSize(12)
          pdf.setFont(headingFont, 'bold')
          pdf.setTextColor(textColor[0], textColor[1], textColor[2])
          pdf.text(exp.position, margin, yPosition)

          // Date aligned right
          const dateStr = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`
          pdf.setFontSize(10)
          pdf.setFont(bodyFont, 'normal')
          pdf.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2])
          const dateWidth = pdf.getStringUnitWidth(dateStr) * 10 / pdf.internal.scaleFactor
          pdf.text(dateStr, pageWidth - margin - dateWidth, yPosition)

          yPosition += 5

          // Company (Left) & Location (Right)
          pdf.setFontSize(11)
          pdf.setFont(bodyFont, 'bold') // Company often bold
          pdf.setTextColor(textColor[0], textColor[1], textColor[2]) // Darker than muted
          pdf.text(exp.company, margin, yPosition)

          if (exp.location) {
            pdf.setFontSize(10)
            pdf.setFont(bodyFont, 'italic')
            pdf.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2])
            const locWidth = pdf.getStringUnitWidth(exp.location) * 10 / pdf.internal.scaleFactor
            pdf.text(exp.location, pageWidth - margin - locWidth, yPosition)
          }

          yPosition += 6

          // Description
          // text-sm (14px ≈ 10.5pt)
          if (exp.description && exp.description.length > 0) {
            exp.description.forEach(desc => {
              // Check page break inside list
              if (yPosition > pageHeight - 20) { pdf.addPage(); yPosition = margin; }

              // Bullet point
              yPosition = addText(`• ${desc}`, margin + 2, yPosition, {
                fontSize: 10,
                font: bodyFont,
                color: textColor,
                maxWidth: contentWidth - 5,
                marginBottom: 2
              })
            })
          }

          yPosition += 2 // Extra space between jobs
        })
        yPosition += 4 // Extra space after section
      }

      // --- EDUCATION SECTION ---
      if (previewData.education && previewData.education.length > 0) {
        if (yPosition > pageHeight - 40) { pdf.addPage(); yPosition = margin; }
        yPosition = addSectionHeading('EDUCATION', yPosition)

        previewData.education.forEach((edu) => {
          if (yPosition > pageHeight - 30) { pdf.addPage(); yPosition = margin; }

          // Degree
          pdf.setFontSize(12)
          pdf.setFont(headingFont, 'bold')
          pdf.setTextColor(textColor[0], textColor[1], textColor[2])
          pdf.text(`${edu.degree} in ${edu.field}`, margin, yPosition)

          // Date
          const dateStr = `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`
          pdf.setFontSize(10)
          pdf.setFont(bodyFont, 'normal')
          pdf.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2])
          const dateWidth = pdf.getStringUnitWidth(dateStr) * 10 / pdf.internal.scaleFactor
          pdf.text(dateStr, pageWidth - margin - dateWidth, yPosition)

          yPosition += 5

          // Institution
          pdf.setFontSize(11)
          pdf.setFont(bodyFont, 'normal')
          pdf.setTextColor(textColor[0], textColor[1], textColor[2])
          pdf.text(edu.institution, margin, yPosition)

          if (edu.location) {
            pdf.setFontSize(10)
            pdf.setFont(bodyFont, 'italic')
            pdf.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2])
            const locWidth = pdf.getStringUnitWidth(edu.location) * 10 / pdf.internal.scaleFactor
            pdf.text(edu.location, pageWidth - margin - locWidth, yPosition)
          }

          yPosition += 6

          if (edu.gpa) {
            yPosition = addText(`GPA: ${edu.gpa}`, margin, yPosition, {
              fontSize: 10,
              font: bodyFont,
              color: textColor,
              marginBottom: 2
            })
          }
          yPosition += 2
        })
        yPosition += 4
      }

      // --- SKILLS SECTION ---
      if (previewData.skills && previewData.skills.length > 0) {
        if (yPosition > pageHeight - 40) { pdf.addPage(); yPosition = margin; }
        yPosition = addSectionHeading('SKILLS', yPosition)

        const skillsByCategory = ['technical', 'soft', 'language', 'tool'].map(category => {
          const categorySkills = previewData.skills.filter(skill => skill.category === category)
          if (categorySkills.length === 0) return null
          return {
            category: category.charAt(0).toUpperCase() + category.slice(1),
            skills: categorySkills.map(s => s.name)
          }
        }).filter(Boolean)

        skillsByCategory.forEach(skillGroup => {
          if (skillGroup) {
            if (yPosition > pageHeight - 20) { pdf.addPage(); yPosition = margin; }

            // Category Label: Bold
            pdf.setFontSize(10)
            pdf.setFont(headingFont, 'bold')
            pdf.setTextColor(textColor[0], textColor[1], textColor[2])
            const catLabel = `${skillGroup.category}: `
            pdf.text(catLabel, margin, yPosition + 3) // +3 to align baseline roughly with body text
            const catWidth = pdf.getStringUnitWidth(catLabel) * 10 / pdf.internal.scaleFactor

            // Skills List
            yPosition = addText(skillGroup.skills.join(' • '), margin + catWidth, yPosition, {
              fontSize: 10,
              font: bodyFont,
              color: textColor, // Skills usually standard text color
              maxWidth: contentWidth - catWidth,
              marginBottom: 4
            })
          }
        })
        yPosition += 4
      }

      // --- PROJECTS SECTION ---
      if (previewData.projects && previewData.projects.length > 0) {
        if (yPosition > pageHeight - 40) { pdf.addPage(); yPosition = margin; }
        yPosition = addSectionHeading('PROJECTS', yPosition)

        previewData.projects.forEach(proj => {
          if (yPosition > pageHeight - 30) { pdf.addPage(); yPosition = margin; }

          // Project Name
          pdf.setFontSize(12)
          pdf.setFont(headingFont, 'bold')
          pdf.setTextColor(textColor[0], textColor[1], textColor[2])
          pdf.text(proj.name, margin, yPosition)
          yPosition += 5

          // Description
          yPosition = addText(proj.description, margin, yPosition, {
            fontSize: 10,
            font: bodyFont,
            color: textColor,
            marginBottom: 4
          })

          // Highlights
          if (proj.highlights && proj.highlights.length > 0) {
            proj.highlights.forEach(h => {
              yPosition = addText(`• ${h}`, margin + 2, yPosition, {
                fontSize: 10,
                font: bodyFont,
                color: textColor,
                maxWidth: contentWidth - 5,
                marginBottom: 2
              })
            })
          }

          // Tech Stack
          if (proj.technologies && proj.technologies.length > 0) {
            yPosition = addText(`Technologies: ${proj.technologies.join(', ')}`, margin, yPosition, {
              fontSize: 9,
              font: bodyFont,
              fontStyle: 'italic',
              color: mutedColor,
              marginBottom: 4
            })
          }
          yPosition += 2
        })
      }

      // Create filename
      const cleanName = previewData.personalInfo.fullName.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_')
      const fileName = `${cleanName}_resume.pdf`

      console.log('PDF: Final filename:', fileName)

      // Download PDF
      pdf.save(fileName)

      console.log('Professional PDF download triggered:', fileName)
      toast.success('PDF downloaded successfully!', { id: 'pdf-export' })
    } catch (error) {
      console.error('PDF Export error:', error)
      toast.error('Failed to export PDF. Please try again.', { id: 'pdf-export' })
    }
  }

  const handleExportDOC = async () => {
    try {
      toast.loading('Generating DOCX...', { id: 'docx-export' })

      // Get the EXACT same data the preview is using
      const previewData = getPreviewData()

      // Verify we have data
      if (previewData.personalInfo.fullName === 'Your Name' && previewData.experience.length === 0) {
        toast.error('Please add some resume data first. The preview shows no real data.', { id: 'docx-export' })
        return
      }

      // Dynamic import to avoid SSR issues
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } = await import('docx')
      const { saveAs } = await import('file-saver')

      // Get theme colors and fonts
      const theme = selectedTemplate.theme
      const primaryColor = theme.colors.primary.replace('#', '')
      const textColor = theme.colors.text.replace('#', '')
      const mutedColor = theme.colors.muted.replace('#', '')

      const headingFont = theme.fonts.heading
      const bodyFont = theme.fonts.body

      // Font Size Helper (px to half-points)
      // Tailwind: text-sm (14px) -> 10.5pt -> 21
      // text-base (16px) -> 12pt -> 24
      // text-lg (18px) -> 13.5pt -> 27
      // text-4xl (36px) -> 27pt -> 54

      const sizes = {
        name: 48, // ~24pt
        heading: 28, // 14pt
        subheading: 24, // 12pt
        body: 20, // 10pt
        small: 18 // 9pt
      }

      // Create document sections
      const children = []

      // Header Section
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: previewData.personalInfo.fullName.toUpperCase(),
              bold: true,
              size: sizes.name,
              color: primaryColor,
              font: headingFont
            })
          ],
          alignment: 'center',
          spacing: { after: 120 } // 6pt
        })
      )

      console.log('DOCX: Writing name:', previewData.personalInfo.fullName)

      const contactInfo = []
      if (previewData.personalInfo.email) contactInfo.push(previewData.personalInfo.email)
      if (previewData.personalInfo.phone) contactInfo.push(previewData.personalInfo.phone)
      if (previewData.personalInfo.location) contactInfo.push(previewData.personalInfo.location)

      if (contactInfo.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({
              text: contactInfo.join(' • '),
              size: sizes.body,
              color: mutedColor,
              font: bodyFont
            })],
            alignment: 'center',
            spacing: { after: 240 } // 12pt
          })
        )
      }

      // Professional Summary Section
      if (previewData.personalInfo.summary) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'PROFESSIONAL SUMMARY',
                bold: true,
                size: sizes.heading,
                color: primaryColor,
                font: headingFont
              })
            ],
            border: {
              bottom: {
                color: primaryColor,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            },
            spacing: { before: 240, after: 120 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: previewData.personalInfo.summary,
                size: sizes.body,
                color: textColor,
                font: bodyFont
              })
            ],
            spacing: { after: 300 }
          })
        )
      }

      // Experience section
      if (previewData.experience && previewData.experience.length > 0) {
        console.log('DOCX: Writing experience count:', previewData.experience.length)
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'PROFESSIONAL EXPERIENCE',
                bold: true,
                size: sizes.heading,
                color: primaryColor,
                font: headingFont
              })
            ],
            border: {
              bottom: {
                color: primaryColor,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            },
            spacing: { before: 240, after: 120 }
          })
        )

        previewData.experience.forEach((exp, index) => {
          console.log(`DOCX: Writing experience ${index + 1}:`, exp.position, 'at', exp.company)

          // Job title
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.position,
                  bold: true,
                  size: sizes.subheading,
                  color: textColor,
                  font: headingFont
                })
              ],
              spacing: { before: 160, after: 60 }
            })
          )

          // Company, Date and Location line
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company,
                  size: sizes.body,
                  color: textColor,
                  bold: true,
                  font: bodyFont
                }),
                new TextRun({
                  text: ' • ',
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: ' • ',
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: exp.location,
                  size: sizes.body,
                  color: mutedColor,
                  italics: true,
                  font: bodyFont
                })
              ],
              spacing: { after: 120 }
            })
          )

          // Job description
          exp.description.forEach(desc => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${desc}`,
                    size: sizes.body,
                    color: textColor,
                    font: bodyFont
                  })
                ],
                indent: {
                  left: 360
                },
                spacing: { after: 60 }
              })
            )
          })

          // Technologies
          if (exp.technologies && exp.technologies.length > 0) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Key Technologies: ',
                    bold: true,
                    size: sizes.small,
                    color: textColor,
                    font: bodyFont
                  }),
                  new TextRun({
                    text: exp.technologies.join(' • '),
                    size: sizes.small,
                    color: mutedColor,
                    font: bodyFont
                  })
                ],
                indent: {
                  left: 360
                },
                spacing: { before: 60, after: 240 }
              })
            )
          } else {
            children.push(new Paragraph({
              text: '',
              spacing: { after: 240 }
            }))
          }
        })
      }

      // Education section
      if (previewData.education.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'EDUCATION',
                bold: true,
                size: sizes.heading,
                color: primaryColor,
                font: headingFont
              })
            ],
            border: {
              bottom: {
                color: primaryColor,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            },
            spacing: { before: 240, after: 120 }
          })
        )

        previewData.education.forEach(edu => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  bold: true,
                  size: sizes.subheading,
                  color: textColor,
                  font: headingFont
                }),
              ],
              spacing: { before: 160, after: 60 }
            })
          )

          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution,
                  size: sizes.body,
                  color: textColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: ' • ',
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`,
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: ' • ',
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                }),
                new TextRun({
                  text: edu.location,
                  size: sizes.body,
                  color: mutedColor,
                  font: bodyFont
                })
              ],
              spacing: { after: 80 }
            })
          )

          if (edu.gpa) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `GPA: ${edu.gpa}`,
                    size: sizes.body,
                    color: textColor,
                    font: bodyFont
                  })
                ],
                spacing: { after: 40 }
              })
            )
          }
        })
      }

      // Skills section
      if (previewData.skills.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'SKILLS',
                bold: true,
                size: sizes.heading,
                color: primaryColor,
                font: headingFont
              })
            ],
            border: {
              bottom: {
                color: primaryColor,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            },
            spacing: { before: 240, after: 120 }
          })
        )

        const skillsByCategory = ['technical', 'soft', 'language', 'tool'].map(category => {
          const categorySkills = previewData.skills.filter(skill => skill.category === category)
          if (categorySkills.length === 0) return null
          return {
            label: category.charAt(0).toUpperCase() + category.slice(1),
            text: categorySkills.map(s => s.name).join(', ')
          }
        }).filter(Boolean)

        skillsByCategory.forEach(item => {
          if (item) {
            children.push(new Paragraph({
              children: [
                new TextRun({
                  text: `${item.label}: `,
                  bold: true,
                  size: sizes.body,
                  color: textColor,
                  font: headingFont
                }),
                new TextRun({
                  text: item.text,
                  size: sizes.body,
                  color: textColor,
                  font: bodyFont
                })
              ]
            }))
          }
        })
      }

      // Projects section
      if (previewData.projects.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'PROJECTS',
                bold: true,
                size: sizes.heading,
                color: primaryColor,
                font: headingFont
              })
            ],
            border: {
              bottom: {
                color: primaryColor,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            },
            spacing: { before: 240, after: 120 }
          })
        )

        previewData.projects.forEach(project => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: project.name, bold: true, size: sizes.subheading, color: textColor, font: headingFont }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: project.description,
                  size: sizes.body,
                  color: textColor,
                  font: bodyFont
                })
              ]
            })
          )

          project.highlights.forEach(highlight => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${highlight}`,
                    size: sizes.body,
                    color: textColor,
                    font: bodyFont
                  })
                ],
                indent: {
                  left: 720,
                },
              })
            )
          })

          if (project.technologies && project.technologies.length > 0) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: 'Technologies: ', bold: true, size: sizes.small, color: textColor, font: bodyFont }),
                  new TextRun({ text: project.technologies.join(', '), size: sizes.small, color: mutedColor, font: bodyFont }),
                ],
                indent: {
                  left: 720,
                },
              })
            )
          }

          if (project.url || project.github) {
            const links = []
            if (project.url) links.push(`Live: ${project.url}`)
            if (project.github) links.push(`GitHub: ${project.github}`)

            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: links.join(' | '),
                    size: sizes.body,
                    color: mutedColor,
                    font: bodyFont
                  })
                ],
                indent: {
                  left: 720,
                },
              })
            )
          }

          children.push(new Paragraph({ text: '' }))
        })
      }

      // Create and save document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children,
          },
        ],
      })

      const buffer = await Packer.toBuffer(doc)
      const cleanName = previewData.personalInfo.fullName.replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_')
      const fileName = `${cleanName}_resume.docx`

      console.log('DOCX Export:', { fileName, bufferSize: buffer.byteLength })
      saveAs(new Blob([new Uint8Array(buffer)]), fileName)
      toast.success('Resume downloaded successfully!', { id: 'docx-export' })
    } catch (error) {
      console.error('DOCX Export error:', error)
      toast.error('Failed to export DOCX', { id: 'docx-export' })
    }
  }

  const handlePreview = () => {
    setShowPreview(!showPreview)
  }

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 'personal':
        return <PersonalInfoForm />
      case 'experience':
        return <ExperienceForm />
      case 'education':
        return <EducationForm />
      case 'projects':
        return <ProjectsForm />
      case 'skills':
        return <SkillsForm />
      case 'certificates':
        return <CertificatesForm />
      case 'languages':
        return <LanguagesForm />
      case 'references':
        return <ReferencesForm />
      default:
        return <PersonalInfoForm />
    }
  }

  const currentStepIndex = builderSteps.findIndex(step => step.id === currentStep)
  const progress = ((currentStepIndex + 1) / builderSteps.length) * 100

  if (!selectedTemplate) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="flex items-center justify-center mb-8">
              <Link href="/templates">
                <Button variant="outline" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Choose a Template
                </Button>
              </Link>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Resume Builder
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Please select a template first to start building your resume.
            </p>

            <Link href="/templates">
              <Button size="lg">
                Browse Templates
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/templates">
              <Button variant="outline" className="flex items-center gap-2 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
                Templates
              </Button>
            </Link>

            <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                style={{ backgroundColor: selectedTemplate.theme.colors.primary }}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="pr-2">
                <h1 className="text-lg font-bold text-white">{selectedTemplate.name}</h1>
                {selectedTemplate.isPremium && (
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <Crown className="w-3 h-3" />
                    Premium Template
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {unsavedChanges && (
              <span className="text-sm text-amber-500 font-medium animate-pulse">Unsaved changes</span>
            )}

            <Button
              variant="outline"
              onClick={handlePreview}
              className="hidden lg:flex items-center gap-2 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>

            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save'}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 font-semibold shadow-lg shadow-white/5">
                  <Download className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-800 text-slate-300">
                <DropdownMenuItem onClick={handleExportPDF} className="hover:bg-slate-800 hover:text-white cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportDOC} className="hover:bg-slate-800 hover:text-white cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Export as DOCX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-400">
              Step {currentStepIndex + 1} of {builderSteps.length}
            </span>
            <span className="text-sm font-bold text-violet-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-2 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-24 bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">Resume Sections</CardTitle>
                <CardDescription className="text-slate-400">
                  Click on a section to edit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {builderSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = index < currentStepIndex

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${isActive
                        ? 'bg-violet-500/10 text-violet-300 border border-violet-500/30 shadow-lg shadow-violet-500/10'
                        : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isCompleted ? 'text-green-400' : isActive ? 'text-violet-400' : 'text-slate-500'}`} />
                      <span className="font-medium">{step.label}</span>
                      {isCompleted && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                      )}
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className={`col-span-12 ${showPreview ? 'lg:col-span-5' : 'lg:col-span-9'}`}>
            <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl min-h-[600px]">
              <CardHeader className="border-b border-slate-800/50 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">
                      {builderSteps.find(s => s.id === currentStep)?.label}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Fill in your information below to build your professional profile
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentStepIndex > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentStep(builderSteps[currentStepIndex - 1].id)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        Previous
                      </Button>
                    )}

                    {currentStepIndex < builderSteps.length - 1 && (
                      <Button
                        size="sm"
                        onClick={() => setCurrentStep(builderSteps[currentStepIndex + 1].id)}
                        className="bg-white text-slate-950 hover:bg-slate-200"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getCurrentStepComponent()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="sticky top-24">
                <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl overflow-hidden">
                  <CardHeader className="bg-slate-950/50 border-b border-slate-800">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-violet-400" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 bg-slate-800/50">
                    <div className="overflow-hidden">
                      <ResumePreview
                        resumeData={resumeData}
                        template={selectedTemplate}
                        scale={0.6}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}