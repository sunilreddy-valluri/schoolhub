import { useNavigate } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
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

                {/* School Onboarding & Basic Details Section */}
                <section className="dashboard-section mt-8" aria-labelledby="onboarding-banner-heading">
                    <div className="card student-onboarding-callout">
                        <div className="student-onboarding-callout__icon" aria-hidden="true">
                            <GraduationCap size={28} />
                        </div>
                        <div className="student-onboarding-callout__content">
                            <span className="section-kicker">Institutional Setup</span>
                            <h3 id="onboarding-banner-heading">🏫 School Onboarding & Basic Details</h3>
                            <p>
                                Review institutional identity, registration codes, contact information, academic schedule, and campus facilities.
                            </p>
                            <div className="student-onboarding-callout__meta">
                                <span className="badge badge--success">✓ Basic Details Active</span>
                                <span className="badge badge--primary">CBSE Affiliated</span>
                                <span className="badge badge--neutral">Academic Year: 2024-2025</span>
                            </div>
                        </div>
                        <div className="student-onboarding-callout__action">
                            <Button
                                onClick={() => navigate('/onboarding')}
                                title="Go to School Onboarding Page"
                                aria-label="Open School Onboarding Page"
                            >
                                <span>Manage School Onboarding</span>
                                <ArrowRight size={16} aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}

