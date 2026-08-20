import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { StudentProfile } from '../../components/dashboard/StudentProfile'
import { PageContainer } from '../../components/layout/PageContainer'
import { QuickAccessButton } from '../../components/dashboard/QuickAccessButton'
import { Button } from '../../components/ui/Button'
import { sampleStudentAttendance } from '../../data/attendanceData'

export function AttendancePage() {
    const navigate = useNavigate()

    return (
        <DashboardLayout>
            <PageContainer>
                <section className="dashboard-section" aria-labelledby="attendance-heading">
                    <div className="dashboard-section__header dashboard-section__header--with-actions">
                        <div>
                            <span className="section-kicker">Student Records</span>
                            <h2 id="attendance-heading">📋 Attendance History</h2>
                        </div>
                        <div className="dashboard-section__actions">
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/dashboard')}
                                title="Return to dashboard"
                            >
                                ← Back to Dashboard
                            </Button>
                            <QuickAccessButton destination="classes" />
                        </div>
                    </div>
                    <StudentProfile student={sampleStudentAttendance} />
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}

