export type EventCategory = 'meeting' | 'academic' | 'holiday' | 'event'

export interface CalendarEvent {
  id: string
  title: string
  date: string // ISO date string YYYY-MM-DD
  time?: string
  category: EventCategory
  description?: string
}

// Generate some sample dates relative to today
const today = new Date()
const formatDate = (date: Date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const getRelativeDate = (daysOffset: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + daysOffset)
  return formatDate(date)
}

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    date: getRelativeDate(1),
    time: '10:00 AM',
    category: 'meeting',
    description: 'Quarterly parent-teacher meeting for Grade 5 and 6.',
  },
  {
    id: '2',
    title: 'Staff Meeting',
    date: getRelativeDate(2),
    time: '2:00 PM',
    category: 'meeting',
    description: 'Weekly alignment meeting for all teaching staff.',
  },
  {
    id: '3',
    title: 'Science Fair',
    date: getRelativeDate(5),
    time: '09:00 AM',
    category: 'academic',
    description: 'Annual inter-school science exhibition.',
  },
  {
    id: '4',
    title: 'Thanksgiving Holiday',
    date: getRelativeDate(12),
    category: 'holiday',
  }
]
