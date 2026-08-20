import { useState } from 'react'
import { CheckCircle2, XCircle, Clock, Shield, Edit2 } from 'lucide-react'
import { type AttendanceRecord } from '../../data/attendanceData'
import { AttendanceEditModal } from './AttendanceEditModal'

interface EditableAttendanceRecordItemProps {
    record: AttendanceRecord
    onRecordUpdate: (updatedRecord: AttendanceRecord) => void
}

export function EditableAttendanceRecordItem({
    record,
    onRecordUpdate,
}: EditableAttendanceRecordItemProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Present':
                return <CheckCircle2 size={20} aria-hidden="true" />
            case 'Absent':
                return <XCircle size={20} aria-hidden="true" />
            case 'Late':
                return <Clock size={20} aria-hidden="true" />
            case 'Excused':
                return <Shield size={20} aria-hidden="true" />
            default:
                return null
        }
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date)
    }

    return (
        <>
            <div className={`attendance-record attendance-record--${record.status.toLowerCase()}`}>
                <div className="attendance-record__icon">{getStatusIcon(record.status)}</div>
                <div className="attendance-record__content">
                    <div className="attendance-record__date">{formatDate(record.date)}</div>
                    <div className="attendance-record__status">{record.status}</div>
                    {record.note && <div className="attendance-record__note">{record.note}</div>}
                </div>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="attendance-record__edit-button"
                    type="button"
                    aria-label="Edit attendance record"
                    title="Click to edit"
                >
                    <Edit2 size={16} />
                </button>
            </div>

            <AttendanceEditModal
                record={record}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onRecordUpdate}
            />
        </>
    )
}
