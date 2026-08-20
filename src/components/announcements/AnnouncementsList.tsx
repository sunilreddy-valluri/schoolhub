import { useState } from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import type { Announcement } from '../../data/announcementsData'
import { Edit2, Eye, Trash2, Search, Filter } from 'lucide-react'
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

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ann.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || ann.status === statusFilter
    const matchesAudience = audienceFilter === 'All' || ann.audience === audienceFilter
    return matchesSearch && matchesStatus && matchesAudience
  })

  return (
    <Card className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-[var(--color-border)] gap-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">All Announcements</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 flex items-center">
            <Search className="absolute left-3 text-[var(--color-text-muted)] w-4 h-4 pointer-events-none" />
            <Input 
              placeholder="Search announcements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              style={{ paddingLeft: '36px' }}
            />
          </div>
          
          <select 
            className="input w-full sm:w-32"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>
          
          <select 
            className="input w-full sm:w-32"
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
          >
            <option value="All">All Audience</option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Parents">Parents</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Audience</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[var(--color-text-primary)] text-sm">{announcement.title}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{announcement.author}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{new Date(announcement.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{announcement.audience}</td>
                  <td className="px-6 py-4">
                    <Badge tone={getStatusTone(announcement.status)}>{announcement.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onView(announcement)} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors rounded-md hover:bg-[var(--color-primary-light)]" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onEdit(announcement)} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors rounded-md hover:bg-[var(--color-primary-light)]" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(announcement.id)} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors rounded-md hover:bg-[var(--color-error-light)]" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-text-muted)]">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Filter className="w-12 h-12 text-[var(--color-border)]" />
                    <p className="text-base font-medium">No announcements found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
