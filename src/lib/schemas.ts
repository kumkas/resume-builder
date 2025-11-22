import { z } from 'zod'

// Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  portfolio: z.string().url('Please enter a valid portfolio URL').optional().or(z.literal('')),
  summary: z.string().min(10, 'Summary must be at least 10 characters').max(500, 'Summary must be less than 500 characters'),
  profileImage: z.string().optional(),
})

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().min(1, 'Location is required'),
  description: z.array(z.string()).min(1, 'At least one description is required'),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
})

// Education Schema
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().min(1, 'Location is required'),
  gpa: z.string().optional(),
  honors: z.array(z.string()).optional(),
  coursework: z.array(z.string()).optional(),
})

// Project Schema
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Project description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  github: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  image: z.string().optional(),
  highlights: z.array(z.string()).min(1, 'At least one highlight is required'),
})

// Skill Schema
export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['technical', 'soft', 'language', 'tool']),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  years: z.number().min(0).max(50).optional(),
})

// Certificate Schema
export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certificate name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})

// Language Schema
export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Language name is required'),
  proficiency: z.enum(['basic', 'conversational', 'fluent', 'native']),
})

// Reference Schema
export const referenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  relationship: z.string().min(1, 'Relationship is required'),
})

// Complete Resume Schema
export const resumeSchema = z.object({
  id: z.string(),
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
  certificates: z.array(certificateSchema),
  languages: z.array(languageSchema),
  references: z.array(referenceSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Form Step Schemas for multi-step form
export const stepSchemas = {
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
  certificates: z.array(certificateSchema),
  languages: z.array(languageSchema),
  references: z.array(referenceSchema),
}

// Export type helpers
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type ExperienceFormData = z.infer<typeof experienceSchema>
export type EducationFormData = z.infer<typeof educationSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type SkillFormData = z.infer<typeof skillSchema>
export type CertificateFormData = z.infer<typeof certificateSchema>
export type LanguageFormData = z.infer<typeof languageSchema>
export type ReferenceFormData = z.infer<typeof referenceSchema>
export type ResumeFormData = z.infer<typeof resumeSchema>