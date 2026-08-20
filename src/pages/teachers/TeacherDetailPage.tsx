import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { TeacherProfileHeader } from '../../components/teachers/TeacherProfileHeader'
import { TeacherStatsRow } from '../../components/teachers/TeacherStatsRow'
import { TeacherSubjectsList } from '../../components/teachers/TeacherSubjectsList'
import { TeacherClassesList } from '../../components/teachers/TeacherClassesList'
import { TeacherInfoCard } from '../../components/teachers/TeacherInfoCard'
import { TeacherEditModal } from '../../components/teachers/TeacherEditModal'
import { teachers } from '../../data/teachersData'

export function TeacherDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const teacher = teachers.find((t) => t.id === id)

  if (!teacher) {
    return <Navigate to="/teachers" replace />
  }

  return (
    <DashboardLayout activePath="/teachers">
      <section className="dashboard-section" aria-labelledby="teacher-detail-heading">
        {/* Page header with Back button */}
        <div className="teacher-detail-page-header">
          <button
            className="button button--secondary teacher-back-btn"
            type="button"
            id="teacher-back-btn"
            onClick={() => navigate('/teachers')}
            aria-label="Back to teachers list"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>
          <div className="teacher-detail-page-header__title">
            <span className="section-kicker">Staff Management</span>
            <h2 id="teacher-detail-heading">Teacher Profile</h2>
          </div>
        </div>

        {/* Profile content */}
        <div className="teacher-profile-detail" aria-label={`Profile of ${teacher.name}`}>
          <TeacherProfileHeader teacher={teacher} onEditClick={() => setIsEditOpen(true)} />
          <TeacherStatsRow teacher={teacher} />
          <div className="teacher-detail-grid">
            <TeacherInfoCard teacher={teacher} />
            <TeacherSubjectsList teacher={teacher} />
            <TeacherClassesList teacher={teacher} />
          </div>
        </div>
      </section>

      {/* Edit modal */}
      {isEditOpen && (
        <TeacherEditModal teacher={teacher} onClose={() => setIsEditOpen(false)} />
      )}
    </DashboardLayout>
  )
}
