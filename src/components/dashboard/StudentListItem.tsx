import { CheckCircle2, XCircle, Clock, Shield } from 'lucide-react'
import { type ClassStudent } from '../../data/classData'

interface StudentListItemProps {
    student: ClassStudent
}

export function StudentListItem({ student }: StudentListItemProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Present':
                return <CheckCircle2 size={18} aria-hidden="true" />
            case 'Absent':
                return <XCircle size={18} aria-hidden="true" />
            case 'Late':
                return <Clock size={18} aria-hidden="true" />
            case 'Excused':
                return <Shield size={18} aria-hidden="true" />
            default:
                return null
        }
    }

    return (
        <div className={`student-list-item student-list-item--${student.status.toLowerCase()}`}>
            <div className="student-list-item__avatar">{student.studentName.charAt(0)}</div>

            <div className="student-list-item__content">
                <div className="student-list-item__name">{student.studentName}</div>
                <div className="student-list-item__id">{student.studentId}</div>
            </div>

            <div className="student-list-item__status">
                <span className="student-list-item__icon">{getStatusIcon(student.status)}</span>
                <span className="student-list-item__status-text">{student.status}</span>
            </div>
        </div>
    )
}
