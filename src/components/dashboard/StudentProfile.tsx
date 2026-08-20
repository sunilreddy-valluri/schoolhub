import { Card } from '../ui/Card'
import { AttendanceStats } from './AttendanceStats'
import { EditableAttendanceRecordItem } from './EditableAttendanceRecordItem'
import { MonthlySummary } from './MonthlySummary'
import { DateRangeFilter, type DateRange } from './DateRangeFilter'
import { type StudentAttendance, type AttendanceRecord } from '../../data/attendanceData'
import { useState, useMemo } from 'react'

interface StudentProfileProps {
    student: StudentAttendance
}

export function StudentProfile({ student: initialStudent }: StudentProfileProps) {
    const [student, setStudent] = useState(initialStudent)
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: null,
        endDate: null,
        type: 'all',
    })

    const filteredRecords = useMemo(() => {
        if (!dateRange.startDate || !dateRange.endDate) {
            return student.records
        }

        return student.records.filter((record) => {
            const recordDate = new Date(record.date)
            return recordDate >= dateRange.startDate! && recordDate <= dateRange.endDate!
        })
    }, [student.records, dateRange])

    const stats = useMemo(() => {
        const presentCount = filteredRecords.filter((r) => r.status === 'Present').length
        const absentCount = filteredRecords.filter((r) => r.status === 'Absent').length
        const lateCount = filteredRecords.filter((r) => r.status === 'Late').length
        const excusedCount = filteredRecords.filter((r) => r.status === 'Excused').length
        const total = filteredRecords.length
        const attendancePercentage = total > 0 ? ((presentCount + excusedCount) / total) * 100 : 0

        return {
            presentCount,
            absentCount,
            lateCount,
            excusedCount,
            attendancePercentage,
        }
    }, [filteredRecords])

    const handleRecordUpdate = (updatedRecord: AttendanceRecord) => {
        setStudent((prev) => ({
            ...prev,
            records: prev.records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)),
        }))
    }

    return (
        <div className="student-profile">
            {/* Student Header */}
            <Card className="student-profile__header">
                <div className="student-profile__info">
                    <div className="student-profile__avatar">{student.studentName.charAt(0)}</div>
                    <div className="student-profile__details">
                        <h1 className="student-profile__name">{student.studentName}</h1>
                        <p className="student-profile__meta">
                            ID: {student.studentId} • Grade: {student.studentGrade}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Attendance Stats */}
            <Card className="student-profile__stats">
                <AttendanceStats
                    presentCount={stats.presentCount}
                    absentCount={stats.absentCount}
                    lateCount={stats.lateCount}
                    excusedCount={stats.excusedCount}
                    attendancePercentage={stats.attendancePercentage}
                />
            </Card>

            {/* Date Range Filter */}
            <Card className="student-profile__filter">
                <h3 className="student-profile__filter-title">Filter by Date Range</h3>
                <DateRangeFilter onFilterChange={setDateRange} currentRange={dateRange} />
            </Card>

            {/* Attendance History */}
            <Card className="student-profile__history">
                <h3 className="student-profile__history-title">📋 Attendance History (Click edit icon to modify)</h3>
                <div className="student-profile__history-list">
                    {filteredRecords.length === 0 ? (
                        <div className="student-profile__empty">No attendance records found for the selected period</div>
                    ) : (
                        filteredRecords
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((record) => (
                                <EditableAttendanceRecordItem
                                    key={record.id}
                                    record={record}
                                    onRecordUpdate={handleRecordUpdate}
                                />
                            ))
                    )}
                </div>
            </Card>

            {/* Monthly Summary */}
            <Card className="student-profile__monthly">
                <MonthlySummary records={filteredRecords} />
            </Card>
        </div>
    )
}
