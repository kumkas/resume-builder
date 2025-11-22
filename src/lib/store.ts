import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ResumeData, ResumeTemplate, ResumeState, ExportOptions, Experience, Education, Project, Skill, Certificate, Language, Reference } from '@/types/resume'

interface ResumeStore extends ResumeState {
  // Actions
  setResumeData: (data: Partial<ResumeData>) => void
  setSelectedTemplate: (template: ResumeTemplate) => void
  setEditingMode: (editing: boolean) => void
  setPreviewMode: (preview: boolean) => void
  setExportOptions: (options: Partial<ExportOptions>) => void
  markUnsaved: () => void
  markSaved: () => void
  resetResume: () => void
  loadResumeFromStorage: (id: string) => void
  
  // Experience management
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, experience: Omit<Experience, 'id'>) => void
  deleteExperience: (id: string) => void
  
  // Education management
  addEducation: (education: Omit<Education, 'id'>) => void
  updateEducation: (id: string, education: Omit<Education, 'id'>) => void
  deleteEducation: (id: string) => void
  
  // Project management
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, project: Omit<Project, 'id'>) => void
  deleteProject: (id: string) => void
  
  // Skill management
  addSkill: (skill: Omit<Skill, 'id'>) => void
  updateSkill: (id: string, skill: Omit<Skill, 'id'>) => void
  deleteSkill: (id: string) => void
}

const initialResumeData: ResumeData = {
  id: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certificates: [],
  languages: [],
  references: [],
  customSections: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const initialTemplate: ResumeTemplate = {
  id: 'modern-blue',
  name: 'Modern Blue',
  description: 'A clean, modern template with blue accents',
  category: 'modern',
  thumbnail: '/templates/modern-blue-thumb.png',
  previewUrl: '/templates/modern-blue-preview.png',
  isPremium: false,
  features: ['ATS-friendly', 'Mobile responsive', 'Customizable colors'],
  tags: ['modern', 'clean', 'professional'],
  theme: {
    id: 'modern-blue-theme',
    name: 'Modern Blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#06b6d4',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    spacing: 'normal',
    borderRadius: 'medium',
  },
  layout: {
    columns: 2,
    sections: [
      {
        id: 'personal-info',
        type: 'personalInfo',
        position: { column: 1, order: 1 },
        visible: true,
        styling: { showIcons: true, showDividers: false, compactMode: false },
      },
      {
        id: 'experience',
        type: 'experience',
        position: { column: 1, order: 2 },
        visible: true,
        styling: { showIcons: true, showDividers: true, compactMode: false },
      },
      {
        id: 'education',
        type: 'education',
        position: { column: 2, order: 1 },
        visible: true,
        styling: { showIcons: true, showDividers: true, compactMode: false },
      },
      {
        id: 'skills',
        type: 'skills',
        position: { column: 2, order: 2 },
        visible: true,
        styling: { showIcons: false, showDividers: false, compactMode: true },
      },
    ],
  },
  animations: {
    enabled: true,
    entrance: 'fade',
    duration: 500,
    delay: 100,
  },
}

const initialExportOptions: ExportOptions = {
  format: 'pdf',
  quality: 'high',
  includeAnimations: false,
  paperSize: 'a4',
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentResumeId: undefined,
        resumeData: initialResumeData,
        selectedTemplate: initialTemplate,
        isEditing: false,
        previewMode: false,
        exportOptions: initialExportOptions,
        unsavedChanges: false,

        // Actions
        setResumeData: (data) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              ...data,
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        setSelectedTemplate: (template) =>
          set(() => ({
            selectedTemplate: template,
            unsavedChanges: true,
          })),

        setEditingMode: (editing) =>
          set(() => ({
            isEditing: editing,
          })),

        setPreviewMode: (preview) =>
          set(() => ({
            previewMode: preview,
          })),

        setExportOptions: (options) =>
          set((state) => ({
            exportOptions: {
              ...state.exportOptions,
              ...options,
            },
          })),

        markUnsaved: () =>
          set(() => ({
            unsavedChanges: true,
          })),

        markSaved: () =>
          set(() => ({
            unsavedChanges: false,
          })),

        resetResume: () =>
          set(() => ({
            currentResumeId: undefined,
            resumeData: {
              ...initialResumeData,
              id: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            selectedTemplate: initialTemplate,
            isEditing: false,
            previewMode: false,
            unsavedChanges: false,
          })),

        loadResumeFromStorage: (id) => {
          // This would typically load from a backend or localStorage
          // For now, we'll just set a new ID
          set((state) => ({
            currentResumeId: id,
            resumeData: {
              ...state.resumeData,
              id,
            },
          }))
        },

        // Experience management
        addExperience: (experience) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              experience: [
                ...state.resumeData.experience,
                { ...experience, id: crypto.randomUUID() }
              ],
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        updateExperience: (id, experience) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              experience: state.resumeData.experience.map(exp =>
                exp.id === id ? { ...experience, id } : exp
              ),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        deleteExperience: (id) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              experience: state.resumeData.experience.filter(exp => exp.id !== id),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        // Education management
        addEducation: (education) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              education: [
                ...state.resumeData.education,
                { ...education, id: crypto.randomUUID() }
              ],
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        updateEducation: (id, education) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              education: state.resumeData.education.map(edu =>
                edu.id === id ? { ...education, id } : edu
              ),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        deleteEducation: (id) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              education: state.resumeData.education.filter(edu => edu.id !== id),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        // Project management
        addProject: (project) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              projects: [
                ...state.resumeData.projects,
                { ...project, id: crypto.randomUUID() }
              ],
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        updateProject: (id, project) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              projects: state.resumeData.projects.map(proj =>
                proj.id === id ? { ...project, id } : proj
              ),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        deleteProject: (id) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              projects: state.resumeData.projects.filter(proj => proj.id !== id),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        // Skill management
        addSkill: (skill) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              skills: [
                ...state.resumeData.skills,
                { ...skill, id: crypto.randomUUID() }
              ],
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        updateSkill: (id, skill) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              skills: state.resumeData.skills.map(sk =>
                sk.id === id ? { ...skill, id } : sk
              ),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),

        deleteSkill: (id) =>
          set((state) => ({
            resumeData: {
              ...state.resumeData,
              skills: state.resumeData.skills.filter(sk => sk.id !== id),
              updatedAt: new Date().toISOString(),
            },
            unsavedChanges: true,
          })),
      }),
      {
        name: 'resume-storage',
        // Only persist certain fields
        partialize: (state) => ({
          resumeData: state.resumeData,
          selectedTemplate: state.selectedTemplate,
          exportOptions: state.exportOptions,
          currentResumeId: state.currentResumeId,
        }),
      }
    ),
    { name: 'resume-store' }
  )
)