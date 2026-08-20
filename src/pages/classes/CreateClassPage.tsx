import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ClassForm } from '../../components/classes/ClassForm'
import type { SchoolClass } from '../../data/classData'

export function CreateClassPage() {
  const navigate = useNavigate()

  function handleSuccess(cls: SchoolClass) {
    // Navigate to the new class's detail page after creation
    navigate(`/classes/${cls.id}`)
  }

  return (
    <DashboardLayout>
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <span className="section-kicker">School management</span>
          <h1 className="admin-page-title">Create Class</h1>
          <p className="admin-page-subtitle">
            Set up a new class by assigning a grade, section, and teacher.
          </p>
        </div>
      </div>

      <ClassForm
        mode="create"
        onSuccess={handleSuccess}
        onCancel={() => navigate('/classes')}
      />
    </DashboardLayout>
  )
}
