import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { AnnouncementsList } from '../../components/announcements/AnnouncementsList'
import { CreateAnnouncementModal } from '../../components/announcements/CreateAnnouncementModal'
import { mockAnnouncements, type Announcement } from '../../data/announcementsData'
import { Plus, BellRing, ChevronRight } from 'lucide-react'
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

  // Find the most recent High Priority announcement to feature
  const featuredAnnouncement = announcements.find(a => a.priority === 'High' && a.status === 'Published')
  // The rest go to the list
  const listAnnouncements = featuredAnnouncement 
    ? announcements.filter(a => a.id !== featuredAnnouncement.id)
    : announcements

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="dashboard-header__copy">
          <span className="eyebrow block mb-2 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">Communications</span>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] m-0">Announcements</h1>
          <p className="mt-2 text-[var(--color-text-secondary)] text-sm">Manage and publish important updates to your school community.</p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap shrink-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
          <Plus className="w-5 h-5 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Featured / Hero Announcement */}
      {featuredAnnouncement && (
        <div className="mb-10 relative overflow-hidden rounded-[var(--radius-large)] bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-2xl p-8 sm:p-10">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-indigo-500/30 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-blue-200 mb-4 font-medium text-sm tracking-wide uppercase">
                <BellRing className="w-4 h-4 animate-pulse" />
                Important Update
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{featuredAnnouncement.title}</h2>
              <p className="text-blue-100/80 text-base sm:text-lg line-clamp-2 md:line-clamp-3 mb-6">
                {featuredAnnouncement.content}
              </p>
              <div className="flex items-center gap-4 text-sm text-blue-200/60">
                <span>By {featuredAnnouncement.author}</span>
                <span>•</span>
                <span>{new Date(featuredAnnouncement.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleView(featuredAnnouncement)}
              className="shrink-0 group flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:pr-4"
            >
              Read Full Update
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      <div>
        <AnnouncementsList 
          announcements={listAnnouncements} 
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

      {/* Modern View Modal */}
      {viewingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-large)] shadow-2xl p-8 w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] pr-8">{viewingAnnouncement.title}</h2>
              <button 
                onClick={() => setViewingAnnouncement(null)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <span className="font-medium">Author:</span> {viewingAnnouncement.author}
              </span>
              <span className="text-[var(--color-border)]">|</span>
              <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <span className="font-medium">Date:</span> {new Date(viewingAnnouncement.date).toLocaleDateString()}
              </span>
              <span className="text-[var(--color-border)]">|</span>
              <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                <span className="font-medium">Audience:</span> {viewingAnnouncement.audience}
              </span>
            </div>
            
            <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-default)] p-6 mb-8">
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
                {viewingAnnouncement.content}
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
              <Button onClick={() => setViewingAnnouncement(null)} variant="secondary">Close</Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
