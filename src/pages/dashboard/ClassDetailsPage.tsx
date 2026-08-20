import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { PageContainer } from '../../components/layout/PageContainer'
import { ClassHeader } from '../../components/dashboard/ClassHeader'
import { AttendanceSummary } from '../../components/dashboard/AttendanceSummary'
import { StudentList } from '../../components/dashboard/StudentList'
import { sampleClassDetails } from '../../data/classData'

export function ClassDetailsPage() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const handleEdit = () => {
        // Navigate to edit page when ready
        console.log('Edit class:', sampleClassDetails.classId)
    }

    return (
        <DashboardLayout>
            <PageContainer>
                <section className="dashboard-section" aria-labelledby="class-title">
                    <div className="dashboard-section__header">
                        <span className="section-kicker">Class Management</span>
                        <h2 id="class-title">Class Details</h2>
                    </div>

                    <ClassHeader
                        classDetails={sampleClassDetails}
                        onBack={handleBack}
                        onEdit={handleEdit}
                    />

                    <div className="class-details-grid">
                        <AttendanceSummary
                            presentCount={sampleClassDetails.presentToday}
                            absentCount={sampleClassDetails.absentToday}
                            lateCount={sampleClassDetails.lateToday}
                            excusedCount={sampleClassDetails.excusedToday}
                            totalCount={sampleClassDetails.totalStudents}
                        />

                        <StudentList
                            students={sampleClassDetails.students}
                            totalCount={sampleClassDetails.totalStudents}
                        />
                    </div>
                </section>
            </PageContainer>
        </DashboardLayout>
    )
}
