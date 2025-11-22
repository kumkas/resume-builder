'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/lib/store'
import { personalInfoSchema, PersonalInfoFormData } from '@/lib/schemas'
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase } from 'lucide-react'
import toast from 'react-hot-toast'

export function PersonalInfoForm() {
  const { resumeData, setResumeData, markUnsaved } = useResumeStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resumeData.personalInfo,
  })

  const onSubmit = (data: PersonalInfoFormData) => {
    setResumeData({
      ...resumeData,
      personalInfo: data,
      updatedAt: new Date().toISOString(),
    })
    markUnsaved()
    toast.success('Personal information updated!')
  }

  // Watch for changes and auto-save
  const watchedValues = watch()
  
  React.useEffect(() => {
    const subscription = watch((data) => {
      if (data && Object.keys(data).length > 0) {
        setResumeData({
          ...resumeData,
          personalInfo: data as PersonalInfoFormData,
          updatedAt: new Date().toISOString(),
        })
        markUnsaved()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setResumeData, resumeData, markUnsaved])

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                {...register('phone')}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                placeholder="San Francisco, CA"
                className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                {...register('location')}
              />
            </div>
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Online Presence */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Online Presence
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="website"
                placeholder="https://johndoe.dev"
                className={`pl-10 ${errors.website ? 'border-red-500' : ''}`}
                {...register('website')}
              />
            </div>
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/johndoe"
                className={`pl-10 ${errors.linkedin ? 'border-red-500' : ''}`}
                {...register('linkedin')}
              />
            </div>
            {errors.linkedin && (
              <p className="text-sm text-red-500">{errors.linkedin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="github"
                placeholder="https://github.com/johndoe"
                className={`pl-10 ${errors.github ? 'border-red-500' : ''}`}
                {...register('github')}
              />
            </div>
            {errors.github && (
              <p className="text-sm text-red-500">{errors.github.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="portfolio"
                placeholder="https://johndoe.portfolio.com"
                className={`pl-10 ${errors.portfolio ? 'border-red-500' : ''}`}
                {...register('portfolio')}
              />
            </div>
            {errors.portfolio && (
              <p className="text-sm text-red-500">{errors.portfolio.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Professional Summary</h3>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary *</Label>
          <Textarea
            id="summary"
            placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
            className={`min-h-[120px] ${errors.summary ? 'border-red-500' : ''}`}
            {...register('summary')}
          />
          {errors.summary && (
            <p className="text-sm text-red-500">{errors.summary.message}</p>
          )}
          <p className="text-xs text-gray-500">
            Tip: Keep it concise (2-3 sentences) and focus on your most relevant achievements and skills.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="flex items-center gap-2">
          Save Changes
        </Button>
      </div>
    </motion.form>
  )
}