import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Label } from '../ui/Label'
import { type AttendanceRecord, type AttendanceStatus } from '../../data/attendanceData'

interface AttendanceEditModalProps {
    record: AttendanceRecord
    isOpen: boolean
    onClose: () => void
    onSave: (updatedRecord: AttendanceRecord) => void
}

export function AttendanceEditModal({
    record,
    isOpen,
    onClose,
    onSave,
}: AttendanceEditModalProps) {
    const [status, setStatus] = useState<AttendanceStatus>(record.status)
    const [note, setNote] = useState(record.note || '')

    const handleSave = () => {
        onSave({
            ...record,
            status,
            note,
        })
        onClose()
    }

    if (!isOpen) return null

    const statusOptions: AttendanceStatus[] = ['Present', 'Absent', 'Late', 'Excused']

    return (
        <div className="attendance-edit-modal-overlay" onClick={onClose}>
            <Card className="attendance-edit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="attendance-edit-modal__header">
                    <h2 className="attendance-edit-modal__title">Edit Attendance</h2>
                    <button
                        onClick={onClose}
                        className="attendance-edit-modal__close"
                        type="button"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="attendance-edit-modal__content">
                    <div className="attendance-edit-modal__field">
                        <Label htmlFor="date">📅 Date</Label>
                        <input
                            id="date"
                            type="text"
                            value={new Date(record.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            disabled
                            className="attendance-edit-modal__input attendance-edit-modal__input--disabled"
                        />
                    </div>

                    <div className="attendance-edit-modal__field">
                        <Label htmlFor="status">📋 Status</Label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
                            className="attendance-edit-modal__select"
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt === 'Present' && '✅'} {opt === 'Absent' && '❌'} {opt === 'Late' && '⏰'}{' '}
                                    {opt === 'Excused' && '🛡️'} {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="attendance-edit-modal__field">
                        <Label htmlFor="note">📝 Note (Optional)</Label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add a note about this attendance..."
                            className="attendance-edit-modal__textarea"
                            rows={3}
                        />
                    </div>

                    <div className="attendance-edit-modal__status-indicator">
                        <span className={`attendance-edit-modal__status-badge attendance-edit-modal__status-badge--${status.toLowerCase()}`}>
                            {status === 'Present' && '✅'} {status === 'Absent' && '❌'} {status === 'Late' && '⏰'}{' '}
                            {status === 'Excused' && '🛡️'} {status}
                        </span>
                    </div>
                </div>

                <div className="attendance-edit-modal__footer">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        💾 Save Changes
                    </Button>
                </div>
            </Card>
        </div>
    )
}
