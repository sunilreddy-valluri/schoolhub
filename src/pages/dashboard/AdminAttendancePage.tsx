import { useState, useMemo } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { PageContainer } from '../../components/layout/PageContainer'
import { AttendanceSummary } from '../../components/attendance/AttendanceSummary'
import { AttendanceFilters } from '../../components/attendance/AttendanceFilters'
import { AttendanceRecordsList } from '../../components/attendance/AttendanceRecordsList'
import { sampleSchoolSummary, sampleSchoolRecords } from '../../data/attendanceData'

export function AdminAttendancePage() {
    // In a real app, these states would fetch from an API
    const [_, setDate] = useState(new Date().toISOString().split('T')[0])
    const [grade, setGrade] = useState('all')
    const [classId, setClassId] = useState('all')

    const filteredRecords = useMemo(() => {
        return sampleSchoolRecords.filter(record => {
            if (grade !== 'all' && record.grade !== grade) return false
            if (classId !== 'all' && record.classId !== classId) return false
            return true
        })
    }, [grade, classId])

    return (
        <DashboardLayout>
            <PageContainer>
                <section className="dashboard-section" aria-labelledby="attendance-heading">
                    <div className="dashboard-section__header">
                        <div>
                            <span className="section-kicker">School Overview</span>
                            <h2 id="attendance-heading">📋 Attendance Management</h2>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '24px' }}>
                        <AttendanceSummary summary={sampleSchoolSummary} />
                        
                        <AttendanceFilters
                            onDateChange={setDate}
                            onGradeChange={setGrade}
                            onClassChange={setClassId}
                        />
                        
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
                            Attendance Records
                        </h3>
                        <AttendanceRecordsList records={filteredRecords} />
                    </div>
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}
