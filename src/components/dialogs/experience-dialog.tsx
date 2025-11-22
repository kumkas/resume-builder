'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Experience } from '@/types/resume'

const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().optional(),
})

type ExperienceFormData = z.infer<typeof experienceSchema>

interface ExperienceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Omit<Experience, 'id'>) => void
  experience?: Experience
  mode: 'add' | 'edit'
}

export function ExperienceDialog({ open, onOpenChange, onSave, experience, mode }: ExperienceDialogProps) {
  const [current, setCurrent] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience ? {
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      current: experience.current || false,
      location: experience.location,
      description: experience.description.join('\n'),
      technologies: experience.technologies?.join(', ') || '',
    } : {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      technologies: '',
    }
  })

  const watchCurrent = watch('current')

  useEffect(() => {
    setCurrent(watchCurrent || false)
  }, [watchCurrent])

  useEffect(() => {
    if (experience && mode === 'edit') {
      reset({
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate || '',
        current: experience.current || false,
        location: experience.location,
        description: experience.description.join('\n'),
        technologies: experience.technologies?.join(', ') || '',
      })
    } else if (mode === 'add') {
      reset({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        location: '',
        description: '',
        technologies: '',
      })
    }
  }, [experience, mode, reset])

  const onSubmit = (data: ExperienceFormData) => {
    const experienceData: Omit<Experience, 'id'> = {
      company: data.company,
      position: data.position,
      startDate: data.startDate,
      endDate: data.current ? undefined : data.endDate,
      current: data.current,
      location: data.location,
      description: data.description.split('\n').filter(desc => desc.trim() !== ''),
      technologies: data.technologies ? data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '') : undefined,
    }
    
    onSave(experienceData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Work Experience' : 'Edit Work Experience'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Add your professional work experience details.'
              : 'Update your professional work experience details.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Position*</Label>
              <Input
                id="position"
                {...register('position')}
                placeholder="Software Engineer"
              />
              {errors.position && (
                <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="company">Company*</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Google Inc."
              />
              {errors.company && (
                <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location*</Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="San Francisco, CA"
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date*</Label>
              <Input
                id="startDate"
                type="month"
                {...register('startDate')}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500 mt-1">{errors.startDate.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                {...register('endDate')}
                disabled={current}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500 mt-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="current"
              type="checkbox"
              {...register('current')}
              className="rounded"
            />
            <Label htmlFor="current">I currently work here</Label>
          </div>

          <div>
            <Label htmlFor="description">Job Description*</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="• Led development of user authentication system&#10;• Collaborated with design team to improve UX&#10;• Mentored junior developers"
              rows={5}
            />
            <p className="text-sm text-gray-500 mt-1">Enter each responsibility on a new line</p>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="technologies">Technologies</Label>
            <Input
              id="technologies"
              {...register('technologies')}
              placeholder="React, TypeScript, Node.js, AWS"
            />
            <p className="text-sm text-gray-500 mt-1">Separate technologies with commas</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (mode === 'add' ? 'Add Experience' : 'Save Changes')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}