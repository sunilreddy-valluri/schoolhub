export type NotificationType = 'assignment' | 'attendance' | 'announcement' | 'system'

export interface Notification {
  id: string
  title: string
  description: string
  time: string // ISO date string
  type: NotificationType
  read: boolean
}

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Assignment Posted',
    description: 'Mathematics Grade 12 - Assignment "Calculus Basics" has been posted by Mrs. Davis. Due on Aug 28, 2026.',
    time: '2026-08-21T10:30:00.000Z',
    type: 'assignment',
    read: false,
  },
  {
    id: 'n2',
    title: 'Attendance Updated',
    description: 'Your attendance for today (Friday, Aug 21) has been marked as Present.',
    time: '2026-08-21T14:15:00.000Z',
    type: 'attendance',
    read: false,
  },
  {
    id: 'n3',
    title: 'New School Announcement',
    description: 'Principal Smith published: Annual school picnic is scheduled for next Friday. Permission slips are due by Wednesday.',
    time: '2026-08-20T09:00:00.000Z',
    type: 'announcement',
    read: false,
  },
  {
    id: 'n4',
    title: 'Scheduled System Maintenance',
    description: 'SchoolHub will undergo scheduled maintenance this Sunday from 2:00 AM to 4:00 AM. The application will be temporarily offline.',
    time: '2026-08-19T18:00:00.000Z',
    type: 'system',
    read: true,
  },
  {
    id: 'n5',
    title: 'Assignment Graded',
    description: 'Your submission for "Chemistry Lab 3: Acid-Base Titration" has been graded. Grade: A (95%).',
    time: '2026-08-18T11:00:00.000Z',
    type: 'assignment',
    read: true,
  }
]
