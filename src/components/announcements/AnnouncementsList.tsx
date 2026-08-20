import { useState } from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import type { Announcement } from '../../data/announcementsData'
import { Edit2, Eye, Trash2, Search, Filter, Calendar, Users, Megaphone, Bell } from 'lucide-react'
import { Input } from '../ui/Input'

interface AnnouncementsListProps {
  announcements: Announcement[]
  onEdit: (announcement: Announcement) => void
  onDelete: (id: string) => void
  onView: (announcement: Announcement) => void
}

export function AnnouncementsList({ announcements, onEdit, onDelete, onView }: AnnouncementsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [audienceFilter, setAudienceFilter] = useState('All')

  const getStatusTone = (status: string) => {
    switch (status) {
      case 'Published': return 'success'
      case 'Scheduled': return 'info'
      case 'Draft': return 'warning'
      default: return 'info'
    }
  }
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <Bell className="w-3.5 h-3.5 text-[var(--color-error)]" />
      case 'Low': return null
      default: return null
    }
  }

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ann.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ann.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || ann.status === statusFilter
    const matchesAudience = audienceFilter === 'All' || ann.audience === audienceFilter
    return matchesSearch && matchesStatus && matchesAudience
  })

  return (
    <div className="w-full space-y-6">
      {/* Modern Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between bg-[var(--color-surface)] p-4 rounded-[var(--radius-large)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
        <div className="relative w-full xl:w-80 flex items-center group">
          <Search className="absolute left-3 text-[var(--color-text-muted)] w-5 h-5 pointer-events-none group-focus-within:text-[var(--color-primary)] transition-colors" />
          <Input 
            placeholder="Search announcements..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--color-background)] border-transparent focus:bg-[var(--color-surface)] transition-all hover:border-[var(--color-border)]"
            style={{ paddingLeft: '40px' }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <span className="text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:block mr-2">Status:</span>
            {['All', 'Published', 'Scheduled', 'Draft'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  statusFilter === status 
                    ? 'bg-[var(--color-primary)] text-white shadow-md' 
                    : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="h-8 w-px bg-[var(--color-border)] hidden sm:block"></div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <span className="text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap hidden sm:block mr-2">Audience:</span>
            <select 
              className="input bg-[var(--color-background)] border-transparent hover:border-[var(--color-border)] focus:bg-[var(--color-surface)]"
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
            >
              <option value="All">Everyone</option>
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="Parents">Parents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      {filteredAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className="group relative flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-xl border-[var(--color-border)] hover:border-[var(--color-primary-border)]"
            >
              {/* Priority Accent Bar */}
              {announcement.priority === 'High' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-error)]" />
              )}
              
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Badge tone={getStatusTone(announcement.status)} className="shadow-sm">
                    {announcement.status}
                  </Badge>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                    <button onClick={() => onView(announcement)} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] bg-[var(--color-background)] hover:bg-[var(--color-primary-light)] rounded-md transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(announcement)} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] bg-[var(--color-background)] hover:bg-[var(--color-primary-light)] rounded-md transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(announcement.id)} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-error)] bg-[var(--color-background)] hover:bg-[var(--color-error-light)] rounded-md transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  {getPriorityIcon(announcement.priority)}
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight line-clamp-2">
                    {announcement.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-6 flex-grow">
                  {announcement.content}
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--color-border)] grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-1.5" title="Author">
                    <Megaphone className="w-3.5 h-3.5" />
                    <span className="truncate">{announcement.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Date">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2" title="Audience">
                    <Users className="w-3.5 h-3.5" />
                    <span>{announcement.audience}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full p-12 flex flex-col items-center justify-center bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-[var(--radius-large)]">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">No announcements found</h3>
          <p className="text-[var(--color-text-secondary)] text-center max-w-md">
            We couldn't find any announcements matching your current filters. Try adjusting your search or audience selection.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('All')
              setAudienceFilter('All')
            }}
            className="mt-6 px-4 py-2 bg-[var(--color-background)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] rounded-[var(--radius-default)] font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
