import { useState } from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { SchoolAttendanceRecord, AttendanceStatus } from '../../data/attendanceData'

interface AttendanceRecordsListProps {
    records: SchoolAttendanceRecord[]
}

const statusVariantMap: Record<AttendanceStatus, 'success' | 'error' | 'warning' | 'info'> = {
    Present: 'success',
    Absent: 'error',
    Late: 'warning',
    Excused: 'info',
}

export function AttendanceRecordsList({ records }: AttendanceRecordsListProps) {
    const [actionRecord, setActionRecord] = useState<string | null>(null)

    const handleMarkAttendance = (id: string) => {
        // In a real app, this would open a modal or inline form
        // For the MVP, we just show a temporary state change to indicate interaction
        setActionRecord(id)
        setTimeout(() => setActionRecord(null), 1000)
    }

    if (records.length === 0) {
        return (
            <Card style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No attendance records found for the selected criteria.
            </Card>
        )
    }

    return (
        <Card>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px' }}>Student</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px' }}>ID</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px' }}>Grade / Class</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px' }}>Status</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px' }}>Note</th>
                            <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '14px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '16px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{record.studentName}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-muted)', fontSize: '14px' }}>{record.studentId}</td>
                                <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{record.grade} / {record.classId}</td>
                                <td style={{ padding: '16px' }}>
                                    <Badge tone={statusVariantMap[record.status]}>{record.status}</Badge>
                                </td>
                                <td style={{ padding: '16px', color: 'var(--color-text-muted)', fontSize: '14px', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {record.note || '-'}
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleMarkAttendance(record.id)}
                                        style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}
                                    >
                                        {actionRecord === record.id ? 'Marked ✓' : 'Mark'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
