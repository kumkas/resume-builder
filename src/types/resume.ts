export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  portfolio?: string
  summary: string
  profileImage?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current?: boolean
  location: string
  description: string[]
  achievements?: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current?: boolean
  location: string
  gpa?: string
  honors?: string[]
  coursework?: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  current?: boolean
  url?: string
  github?: string
  image?: string
  highlights: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'tool'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  years?: number
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native'
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  email?: string
  phone?: string
  relationship: string
}

export interface CustomSection {
  id: string
  title: string
  content: string
  type: 'text' | 'list' | 'timeline'
  items?: string[]
}

export interface ResumeData {
  id: string
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  certificates: Certificate[]
  languages: Language[]
  references: Reference[]
  customSections: CustomSection[]
  createdAt: string
  updatedAt: string
}

export interface TemplateTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: 'compact' | 'normal' | 'relaxed'
  borderRadius: 'none' | 'small' | 'medium' | 'large'
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive' | 'academic'
  thumbnail: string
  previewUrl: string
  isPremium: boolean
  features: string[]
  tags: string[]
  theme: TemplateTheme & {
    sectionStyle?: 'simple' | 'underlined' | 'boxed' | 'minimal'
  }
  layout: {
    columns: 1 | 2
    headerStyle?: 'centered' | 'left' | 'right' | 'sidebar'
    sections: TemplateSectionConfig[] | string[]
  }
  animations: {
    enabled: boolean
    entrance: 'fade' | 'slide' | 'scale' | 'bounce'
    duration: number
    delay: number
  }
}

export interface TemplateSectionConfig {
  id: string
  type: keyof Pick<ResumeData, 'personalInfo' | 'experience' | 'education' | 'projects' | 'skills' | 'certificates' | 'languages' | 'references' | 'customSections'>
  position: { column: number; order: number }
  visible: boolean
  customTitle?: string
  styling: {
    showIcons: boolean
    showDividers: boolean
    compactMode: boolean
  }
}

export interface ExportOptions {
  format: 'pdf' | 'png' | 'jpeg' | 'html' | 'docx'
  quality: 'low' | 'medium' | 'high'
  includeAnimations: boolean
  paperSize: 'a4' | 'letter' | 'legal'
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

export interface ResumeState {
  currentResumeId?: string
  resumeData: ResumeData
  selectedTemplate: ResumeTemplate
  isEditing: boolean
  previewMode: boolean
  exportOptions: ExportOptions
  unsavedChanges: boolean
}