import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { MonthlyCalendar } from '../../components/calendar/MonthlyCalendar'
import { EventListPanel } from '../../components/calendar/EventListPanel'
import { EventFormModal } from '../../components/calendar/EventFormModal'
import { initialCalendarEvents, type CalendarEvent } from '../../data/calendarData'

export function CalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null)

    const handleCreateNew = () => {
        setEventToEdit(null)
        setIsModalOpen(true)
    }

    const handleEdit = (event: CalendarEvent) => {
        setEventToEdit(event)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(prev => prev.filter(e => e.id !== id))
        }
    }

    const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
        if ('id' in eventData) {
            // Edit existing
            setEvents(prev => prev.map(e => e.id === eventData.id ? eventData as CalendarEvent : e))
        } else {
            // Create new
            const newEvent: CalendarEvent = {
                ...eventData,
                id: Math.random().toString(36).substring(2, 9),
            }
            setEvents(prev => [...prev, newEvent])
        }
        setIsModalOpen(false)
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col h-full gap-6 pb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">School Calendar</h1>
                        <p className="text-slate-500 mt-1">Manage all upcoming events and activities</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col">
                        <MonthlyCalendar
                            events={events}
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />
                    </div>

                    <div className="lg:col-span-1 min-h-[500px]">
                        <EventListPanel
                            selectedDate={selectedDate}
                            events={events}
                            onAddEvent={handleCreateNew}
                            onEditEvent={handleEdit}
                            onDeleteEvent={handleDelete}
                        />
                    </div>
                </div>
            </div>

            <EventFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                initialEvent={eventToEdit}
                selectedDate={selectedDate}
            />
        </DashboardLayout>
    )
}
