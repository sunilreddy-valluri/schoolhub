import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Card } from '../ui/Card'
import type { AnnouncementAudience, AnnouncementPriority } from '../../data/announcementsData'
import { CheckCircle2 } from 'lucide-react'

interface AnnouncementFormProps {
  onCancel: () => void
}

export function AnnouncementForm({ onCancel }: AnnouncementFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [audience, setAudience] = useState<AnnouncementAudience>('All School')
  const [priority, setPriority] = useState<AnnouncementPriority>('Normal')
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!content.trim()) newErrors.content = 'Description is required'
    if (!publishDate) newErrors.publishDate = 'Publish date is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAction = (status: 'Published' | 'Draft') => {
    setSuccessMessage('')
    if (!validateForm()) return

    // In a real app, this would submit the payload to an API
    const payload = {
      title,
      content,
      audience,
      priority,
      date: publishDate,
      status
    }
    
    console.log(`Submitting as ${status}:`, payload)
    
    setSuccessMessage(status === 'Published' ? 'Announcement published successfully!' : 'Draft saved successfully!')
    
    // Clear form on publish
    if (status === 'Published') {
      setTitle('')
      setContent('')
      setAudience('All School')
      setPriority('Normal')
      setPublishDate(new Date().toISOString().split('T')[0])
      setErrors({})
    }
  }

  return (
    <Card className="w-full max-w-3xl p-6 sm:p-8">
      {successMessage && (
        <div className="mb-6 p-4 rounded-md bg-[var(--color-success-light)] border border-[var(--color-success)] flex items-center gap-3">
          <CheckCircle2 className="text-[var(--color-success)] w-5 h-5 flex-shrink-0" />
          <p className="text-[var(--color-success)] font-medium text-sm">{successMessage}</p>
        </div>
      )}

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field-group">
          <Label htmlFor="title">Title <span className="text-[var(--color-error)]">*</span></Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => {
              setTitle(e.target.value)
              if (errors.title) setErrors(prev => ({ ...prev, title: '' }))
            }} 
            placeholder="e.g. Welcome back to school!"
            className={errors.title ? 'input--error' : ''}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field-group">
          <Label htmlFor="content">Description <span className="text-[var(--color-error)]">*</span></Label>
          <textarea
            id="content"
            className={`input min-h-[160px] py-3 resize-y ${errors.content ? 'input--error' : ''}`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (errors.content) setErrors(prev => ({ ...prev, content: '' }))
            }}
            placeholder="Write your announcement here..."
          />
          {errors.content && <p className="field-error">{errors.content}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="field-group">
            <Label htmlFor="audience">Audience</Label>
            <select 
              id="audience" 
              className="input w-full" 
              value={audience} 
              onChange={(e) => setAudience(e.target.value as AnnouncementAudience)}
            >
              <option value="All School">All School</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="Parents">Parents</option>
            </select>
          </div>

          <div className="field-group">
            <Label htmlFor="publishDate">Publish Date <span className="text-[var(--color-error)]">*</span></Label>
            <Input 
              id="publishDate" 
              type="date"
              value={publishDate} 
              onChange={(e) => {
                setPublishDate(e.target.value)
                if (errors.publishDate) setErrors(prev => ({ ...prev, publishDate: '' }))
              }}
              className={errors.publishDate ? 'input--error w-full' : 'w-full'}
            />
            {errors.publishDate && <p className="field-error">{errors.publishDate}</p>}
          </div>
          
          <div className="field-group">
            <Label htmlFor="priority">Priority</Label>
            <select 
              id="priority" 
              className="input w-full" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-[var(--color-border)]">
          <Button type="button" variant="ghost" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button type="button" variant="secondary" onClick={() => handleAction('Draft')} className="w-full sm:w-auto">
              Save Draft
            </Button>
            <Button type="button" variant="primary" onClick={() => handleAction('Published')} className="w-full sm:w-auto">
              Publish
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
