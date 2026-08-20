import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Card } from '../ui/Card'
import type { AnnouncementAudience, AnnouncementPriority, AnnouncementStatus } from '../../data/announcementsData'

interface CreateAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (announcement: any) => void
}

export function CreateAnnouncementModal({ isOpen, onClose, onSubmit }: CreateAnnouncementModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [audience, setAudience] = useState<AnnouncementAudience>('All')
  const [priority, setPriority] = useState<AnnouncementPriority>('Normal')
  const [status, setStatus] = useState<AnnouncementStatus>('Draft')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: Math.random().toString(36).substring(7),
      title,
      content,
      audience,
      priority,
      status,
      date: new Date().toISOString().split('T')[0],
      author: 'Current User' // In a real app, this would come from auth context
    })
    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8">
        <div className="login-card__header !mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Create Announcement</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">Publish a new announcement to your school community.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field-group">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Welcome back to school!"
              required
            />
          </div>

          <div className="field-group">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              className="input min-h-[120px] py-3 resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your announcement here..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="field-group">
              <Label htmlFor="audience">Audience</Label>
              <select 
                id="audience" 
                className="input" 
                value={audience} 
                onChange={(e) => setAudience(e.target.value as AnnouncementAudience)}
              >
                <option value="All">All</option>
                <option value="Students">Students</option>
                <option value="Teachers">Teachers</option>
                <option value="Parents">Parents</option>
              </select>
            </div>
            
            <div className="field-group">
              <Label htmlFor="priority">Priority</Label>
              <select 
                id="priority" 
                className="input" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="status">Initial Status</Label>
            <select 
              id="status" 
              className="input" 
              value={status} 
              onChange={(e) => setStatus(e.target.value as AnnouncementStatus)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[var(--color-border)]">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Announcement
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
