import type { CalendarEvent, EventCategory } from '../../data/calendarData'
import { Plus, Edit2, Trash2, Clock, CalendarDays, AlignLeft } from 'lucide-react'
import { Button } from '../ui/Button'

interface EventListPanelProps {
    selectedDate: Date
    events: CalendarEvent[]
    onAddEvent: () => void
    onEditEvent: (event: CalendarEvent) => void
    onDeleteEvent: (id: string) => void
}

const getCategoryColorText = (category: EventCategory) => {
    switch (category) {
        case 'meeting':
            return 'text-blue-600 bg-blue-50 border-blue-200'
        case 'academic':
            return 'text-emerald-600 bg-emerald-50 border-emerald-200'
        case 'holiday':
            return 'text-amber-600 bg-amber-50 border-amber-200'
        case 'event':
            return 'text-purple-600 bg-purple-50 border-purple-200'
        default:
            return 'text-slate-600 bg-slate-50 border-slate-200'
    }
}

const formatCategory = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1)

export function EventListPanel({ selectedDate, events, onAddEvent, onEditEvent, onDeleteEvent }: EventListPanelProps) {
    const targetDateStr = [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, '0'),
        String(selectedDate.getDate()).padStart(2, '0')
    ].join('-')

    const dayEvents = events.filter(e => e.date === targetDateStr)

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'} on this day
                    </p>
                </div>
                <Button onClick={onAddEvent} className="gap-2 sm:px-4 px-2" aria-label="Create Event">
                    <Plus size={18} />
                    <span className="hidden sm:inline">Create Event</span>
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
                {dayEvents.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 gap-3 py-10">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-700">No events found</p>
                            <p className="text-sm mt-1">Enjoy a free day or create an event.</p>
                        </div>
                        <Button variant="secondary" onClick={onAddEvent} className="mt-2 text-sm">
                            Add new event
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {dayEvents.map(event => (
                            <div key={event.id} className="group relative bg-white border border-slate-200 rounded-xl p-4 transition-all hover:border-slate-300 hover:shadow-sm">

                                <div className="flex justify-between items-start mb-2 gap-4">
                                    <h4 className="font-bold text-slate-800 text-[15px] leading-snug">{event.title}</h4>

                                    {/* Actions - visible on group hover + always visible on mobile */}
                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEditEvent(event)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                            aria-label="Edit Event"
                                            type="button"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDeleteEvent(event.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            aria-label="Delete Event"
                                            type="button"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                                    {event.time && (
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={15} className="text-slate-400" />
                                            {event.time}
                                        </span>
                                    )}
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColorText(event.category)}`}>
                                        {formatCategory(event.category)}
                                    </span>
                                </div>

                                {event.description && (
                                    <div className="mt-3 text-sm text-slate-500 leading-relaxed flex gap-2">
                                        <AlignLeft size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                        <p>{event.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
