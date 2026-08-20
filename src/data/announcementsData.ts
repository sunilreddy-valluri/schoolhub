export type AnnouncementStatus = 'Published' | 'Draft' | 'Scheduled'
export type AnnouncementAudience = 'All School' | 'Students' | 'Teachers' | 'Parents'
export type AnnouncementAudience = 'All' | 'Students' | 'Teachers' | 'Parents'
export type AnnouncementPriority = 'High' | 'Normal' | 'Low'

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  date: string
  status: AnnouncementStatus
  audience: AnnouncementAudience
  priority: AnnouncementPriority
}

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to the New School Year!',
    content: 'We are excited to welcome everyone back to campus for the 2026-2027 school year. Please check your schedules and ensure you have all required materials.',
    author: 'Principal Smith',
    date: '2026-08-15',
    status: 'Published',
    audience: 'All',
    priority: 'High',
  },
  {
    id: '2',
    title: 'Staff Meeting Reminder',
    content: 'A reminder that we have a mandatory all-staff meeting this Friday at 3:30 PM in the main auditorium.',
    author: 'Admin Office',
    date: '2026-08-18',
    status: 'Published',
    audience: 'Teachers',
    priority: 'Normal',
  },
  {
    id: '3',
    title: 'Parent-Teacher Conferences Schedule',
    content: 'Please find attached the schedule for the upcoming parent-teacher conferences. Ensure you sign up for your slots early.',
    author: 'Admin Office',
    date: '2026-08-25',
    status: 'Scheduled',
    audience: 'Parents',
    priority: 'High',
  },
  {
    id: '4',
    title: 'New Library Books Added',
    content: 'We have added over 100 new titles to our school library. Come check them out during your free period!',
    author: 'Librarian Johnson',
    date: '2026-08-12',
    status: 'Published',
    audience: 'Students',
    priority: 'Low',
  },
  {
    id: '5',
    title: 'Draft: Winter Concert Planning',
    content: 'Initial thoughts on the winter concert themes and dates. Seeking feedback from the music department.',
    author: 'Mr. Davis',
    date: '2026-08-20',
    status: 'Draft',
    audience: 'Teachers',
    priority: 'Normal',
  }
]
