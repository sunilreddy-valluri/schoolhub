import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { CalendarEvent, EventCategory } from '../../data/calendarData'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'

interface EventFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void
    initialEvent?: CalendarEvent | null
    selectedDate: Date
}

export function EventFormModal({ isOpen, onClose, onSave, initialEvent, selectedDate }: EventFormModalProps) {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [category, setCategory] = useState<EventCategory>('event')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen) {
            if (initialEvent) {
                setTitle(initialEvent.title)
                setDate(initialEvent.date)
                setTime(initialEvent.time || '')
                setCategory(initialEvent.category)
                setDescription(initialEvent.description || '')
            } else {
                // Create mode
                setTitle('')
                setTime('')
                setCategory('event')
                setDescription('')

                // Use selectedDate from props for standard ISO creation
                const yyyy = selectedDate.getFullYear()
                const mm = String(selectedDate.getMonth() + 1).padStart(2, '0')
                const dd = String(selectedDate.getDate()).padStart(2, '0')
                setDate(`${yyyy}-${mm}-${dd}`)
            }
            setError('')
        }
    }, [isOpen, initialEvent, selectedDate])

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Quick validate
        if (!title.trim() || !date.trim()) {
            setError('Title and Date are required.')
            return
        }

        const payload = {
            ...(initialEvent ? { id: initialEvent.id } : {}),
            title: title.trim(),
            date,
            time: time.trim() || undefined,
            category,
            description: description.trim() || undefined,
        }

        onSave(payload as Omit<CalendarEvent, 'id'> | CalendarEvent)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <h2 id="modal-title" className="text-xl font-bold text-slate-800">
                        {initialEvent ? 'Edit Event' : 'Create Event'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
                    {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

                    <div className="space-y-1.5">
                        <Label htmlFor="event-title">Event title</Label>
                        <Input
                            id="event-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Parent-Teacher Meeting"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="event-date">Date</Label>
                            <Input
                                id="event-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="event-time">Time (Optional)</Label>
                            <Input
                                id="event-time"
                                type="text"
                                placeholder="e.g. 10:00 AM"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="event-category">Category</Label>
                        <div className="relative">
                            <select
                                id="event-category"
                                className="w-full flex h-12 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-base appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as EventCategory)}
                            >
                                <option value="event">General Event</option>
                                <option value="meeting">Meeting</option>
                                <option value="academic">Academic</option>
                                <option value="holiday">Holiday</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="event-desc">Description (Optional)</Label>
                        <textarea
                            id="event-desc"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all sm:text-base resize-none"
                            rows={3}
                            placeholder="Details about the event..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="pt-2 flex gap-3 justify-end items-center mt-2">
                        <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
                        <Button type="submit">
                            {initialEvent ? 'Save Changes' : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
