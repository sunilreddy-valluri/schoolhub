import { type AttendanceRecord, type AttendanceStatus } from '../../data/attendanceData'
import { CheckCircle2, XCircle, Clock, Shield } from 'lucide-react'

interface AttendanceRecordItemProps {
    record: AttendanceRecord
}

export function AttendanceRecordItem({ record }: AttendanceRecordItemProps) {
    const getStatusIcon = (status: AttendanceStatus) => {
        switch (status) {
            case 'Present':
                return <CheckCircle2 size={20} aria-hidden="true" />
            case 'Absent':
                return <XCircle size={20} aria-hidden="true" />
            case 'Late':
                return <Clock size={20} aria-hidden="true" />
            case 'Excused':
                return <Shield size={20} aria-hidden="true" />
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
        <div className={`attendance-record attendance-record--${record.status.toLowerCase()}`}>
            <div className="attendance-record__icon">{getStatusIcon(record.status)}</div>
            <div className="attendance-record__content">
                <div className="attendance-record__date">{formatDate(record.date)}</div>
                <div className="attendance-record__status">{record.status}</div>
                {record.note && <div className="attendance-record__note">{record.note}</div>}
            </div>
        </div>
    )
}
