import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { AnnouncementsList } from '../../components/announcements/AnnouncementsList'
import { CreateAnnouncementModal } from '../../components/announcements/CreateAnnouncementModal'
import { mockAnnouncements, type Announcement } from '../../data/announcementsData'
import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null)

  const handleCreate = (newAnnouncement: Announcement) => {
    setAnnouncements(prev => [newAnnouncement, ...prev])
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id))
    }
  }

  const handleView = (announcement: Announcement) => {
    setViewingAnnouncement(announcement)
  }

  const handleEdit = (announcement: Announcement) => {
    // In a full implementation, you'd have an EditModal or populate CreateModal with existing data
    alert('Edit mode activated for: ' + announcement.title + '. (This would open the edit modal in a full implementation.)')
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="dashboard-header__copy">
          <span className="eyebrow block mb-2 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">Communications</span>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] m-0">Announcements</h1>
          <p className="mt-2 text-[var(--color-text-secondary)] text-sm">Manage and publish important updates to your school community.</p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap shrink-0">
          <Plus className="w-5 h-5 mr-2" />
          Create Announcement
        </Button>
      </div>

      <div className="mt-8">
        <AnnouncementsList 
          announcements={announcements} 
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>

      <CreateAnnouncementModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />

      {/* Simple View Modal */}
      {viewingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-large)] shadow-2xl p-8 w-full max-w-2xl animate-in fade-in zoom-in-95">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{viewingAnnouncement.title}</h2>
            <div className="flex gap-3 mb-6">
              <span className="text-sm text-[var(--color-text-muted)]">By {viewingAnnouncement.author}</span>
              <span className="text-sm text-[var(--color-text-muted)]">•</span>
              <span className="text-sm text-[var(--color-text-muted)]">{new Date(viewingAnnouncement.date).toLocaleDateString()}</span>
            </div>
            <div className="bg-[var(--color-background)] rounded-[var(--radius-default)] p-6 mb-8 text-[var(--color-text-secondary)]">
              {viewingAnnouncement.content}
            </div>
            <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
              <Button onClick={() => setViewingAnnouncement(null)} variant="secondary">Close</Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
