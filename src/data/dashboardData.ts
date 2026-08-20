export type DashboardIconName =
  | 'users'
  | 'graduationCap'
  | 'school'
  | 'clipboardCheck'
  | 'userPlus'
  | 'bookOpen'
  | 'calendarCheck'
  | 'userCheck'
  | 'layers'
  | 'plusCircle'

export interface Statistic {
  label: string
  value: string
  change: string
  icon: DashboardIconName
}

export interface QuickAction {
  title: string
  description: string
  icon: DashboardIconName
}

export interface RecentActivityItem {
  title: string
  description: string
  time: string
  icon: DashboardIconName
  tone: 'blue' | 'green' | 'amber' | 'slate'
}

export const statistics: Statistic[] = [
  { label: 'Total Students', value: '1,248', change: '+12 this month', icon: 'users' },
  { label: 'Total Teachers', value: '86', change: '+3 this month', icon: 'graduationCap' },
  { label: 'Total Classes', value: '42', change: '4 active grades', icon: 'school' },
  { label: "Today's Attendance", value: '94.8%', change: '1,182 present today', icon: 'clipboardCheck' },
]

export const attendance = {
  percentage: 94.8,
  present: 1182,
  absent: 66,
  late: 24,
}

export const quickActions: QuickAction[] = [
  { title: 'Add Student', description: 'Register a new student', icon: 'userPlus' },
  { title: 'Add Teacher', description: 'Add teaching staff', icon: 'graduationCap' },
  { title: 'Create Class', description: 'Set up a new class', icon: 'bookOpen' },
  { title: 'Mark Attendance', description: "Record today's attendance", icon: 'calendarCheck' },
]

export const recentActivities: RecentActivityItem[] = [
  {
    title: 'New student registered',
    description: 'Aarav Kumar was added to Grade 8',
    time: '10 minutes ago',
    icon: 'userCheck',
    tone: 'blue',
  },
  {
    title: 'Attendance completed',
    description: 'Grade 10 attendance was marked',
    time: '35 minutes ago',
    icon: 'clipboardCheck',
    tone: 'green',
  },
  {
    title: 'Teacher profile updated',
    description: 'Priya Sharma updated her profile',
    time: '1 hour ago',
    icon: 'graduationCap',
    tone: 'amber',
  },
  {
    title: 'New class created',
    description: 'Grade 7 - Section A was created',
    time: '2 hours ago',
    icon: 'layers',
    tone: 'slate',
  },
]

export const upcomingEvents = [
  { title: 'Parent-Teacher Meeting', schedule: 'Tomorrow · 10:00 AM' },
  { title: 'Staff Meeting', schedule: 'Friday · 2:00 PM' },
]
