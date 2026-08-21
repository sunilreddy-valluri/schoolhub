import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { PageContainer } from '../../components/layout/PageContainer'
import { MarkAttendanceForm } from '../../components/attendance/MarkAttendanceForm'

export function MarkAttendancePage() {
    return (
        <DashboardLayout>
            <PageContainer>
                <section className="dashboard-section" aria-labelledby="mark-attendance-heading">
                    <div className="dashboard-section__header">
                        <div>
                            <span className="section-kicker">Teacher Action</span>
                            <h2 id="mark-attendance-heading">✓ Mark Attendance</h2>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '24px' }}>
                        <MarkAttendanceForm />
                    </div>
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}
