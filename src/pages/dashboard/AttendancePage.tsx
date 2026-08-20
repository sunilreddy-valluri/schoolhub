import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { StudentProfile } from '../../components/dashboard/StudentProfile'
import { PageContainer } from '../../components/layout/PageContainer'
import { sampleStudentAttendance } from '../../data/attendanceData'

export function AttendancePage() {
    return (
        <DashboardLayout>
            <PageContainer>
                <section className="dashboard-section" aria-labelledby="attendance-heading">
                    <div className="dashboard-section__header">
                        <span className="section-kicker">Student Records</span>
                        <h2 id="attendance-heading">Attendance History</h2>
                    </div>
                    <StudentProfile student={sampleStudentAttendance} />
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}
