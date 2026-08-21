import { Card } from '../ui/Card'
import type { SchoolAttendanceSummary } from '../../data/attendanceData'

interface AttendanceSummaryProps {
    summary: SchoolAttendanceSummary
}

export function AttendanceSummary({ summary }: AttendanceSummaryProps) {
    return (
        <div className="attendance-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 500 }}>Today's Attendance</span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: summary.percentage >= 90 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {summary.percentage}%
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    {summary.present + summary.late} of {summary.totalStudents} students present
                </span>
            </Card>
            
            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 500 }}>Present</span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {summary.present}
                </span>
            </Card>

            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 500 }}>Absent</span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-error)' }}>
                    {summary.absent}
                </span>
            </Card>

            <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', fontWeight: 500 }}>Late</span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-warning)' }}>
                    {summary.late}
                </span>
            </Card>
        </div>
    )
}
