import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent, EventCategory } from '../../data/calendarData'

interface MonthlyCalendarProps {
    events: CalendarEvent[]
    selectedDate: Date
    onSelectDate: (date: Date) => void
}

const getCategoryColorClass = (category: EventCategory) => {
    switch (category) {
        case 'meeting':
            return 'bg-blue-500'
        case 'academic':
            return 'bg-emerald-500'
        case 'holiday':
            return 'bg-amber-500'
        case 'event':
            return 'bg-purple-500'
        default:
            return 'bg-gray-400'
    }
}

export function MonthlyCalendar({ events, selectedDate, onSelectDate }: MonthlyCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = currentMonth.getDay() // 0 = Sunday, 1 = Monday, etc.

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // Generate blank spaces for days before the first day of the month
    const blanks = Array(firstDayOfMonth).fill(null)

    // Generate days of the month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const isToday = (date: Date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const isSelected = (date: Date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
    }

    const getEventsForDate = (day: number) => {
        const targetDateStr = [
            currentMonth.getFullYear(),
            String(currentMonth.getMonth() + 1).padStart(2, '0'),
            String(day).padStart(2, '0')
        ].join('-')

        return events.filter(e => e.date === targetDateStr)
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm" aria-label="Calendar">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="font-semibold text-slate-800 text-lg">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-1">
                    <button
                        onClick={handlePrevMonth}
                        className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-600"
                        aria-label="Previous month"
                        type="button"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="p-1.5 hover:bg-slate-200 rounded-md transition-colors text-slate-600"
                        aria-label="Next month"
                        type="button"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {blanks.map((_, i) => (
                        <div key={`blank-${i}`} className="h-10 sm:h-14"></div>
                    ))}

                    {days.map(day => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                        const dayEvents = getEventsForDate(day)
                        const active = isSelected(date)
                        const today = isToday(date)

                        return (
                            <button
                                key={day}
                                onClick={() => onSelectDate(date)}
                                className={`
                  relative h-10 sm:h-14 flex flex-col items-center justify-start pt-1 sm:pt-2 rounded-lg border border-transparent
                  transition-all duration-200 group
                  ${active ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}
                `}
                                aria-label={`Select date ${date.toLocaleDateString()}`}
                                type="button"
                            >
                                <span className={`
                  text-sm w-7 h-7 flex items-center justify-center rounded-full
                  ${active ? 'bg-blue-600 text-white font-medium shadow-sm' : ''}
                  ${today && !active ? 'text-blue-600 font-semibold bg-blue-100' : ''}
                  ${!active && !today ? 'text-slate-700' : ''}
                `}>
                                    {day}
                                </span>

                                {/* Event dots container */}
                                <div className="flex gap-0.5 mt-1 sm:mt-1.5">
                                    {dayEvents.slice(0, 3).map((e, index) => (
                                        <span
                                            key={`${day}-${index}`}
                                            className={`w-1.5 h-1.5 rounded-full ${getCategoryColorClass(e.category)}`}
                                            title={e.title}
                                        />
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" title={`+${dayEvents.length - 3} more`} />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
