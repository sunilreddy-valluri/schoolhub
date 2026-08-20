import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, Pencil, ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Spinner } from '../../components/ui/Spinner'
import {
  getClassById,
  grades,
  sections,
  teachers,
  academicYears,
  type SchoolClass,
} from '../../data/classData'

function getGradeName(id: string)   { return grades.find((g) => g.id === id)?.name ?? '—' }
function getSectionName(id: string) { return sections.find((s) => s.id === id)?.name ?? '—' }
function getTeacherName(id: string) { return teachers.find((t) => t.id === id)?.fullName ?? '—' }
function getYearLabel(id: string)   { return academicYears.find((a) => a.id === id)?.label ?? '—' }
function isCurrentYear(id: string)  { return academicYears.find((a) => a.id === id)?.isCurrent ?? false }

export function ClassDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [cls, setCls]           = useState<SchoolClass | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    getClassById(id)
      // eslint-disable-next-line react/set-state-in-effect
      .then(setCls)
      .catch(() => setError('Class not found or unable to load. Please try again.'))
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <DashboardLayout>
      {/* Back + header */}
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <button
            className="back-link"
            type="button"
            onClick={() => navigate('/classes')}
            aria-label="Back to Classes"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Classes</span>
          </button>
          <span className="section-kicker" style={{ marginTop: '12px' }}>School management</span>
          <h1 className="admin-page-title">
            {cls ? cls.displayName : 'Class Details'}
          </h1>
        </div>
        {cls ? (
          <Button onClick={() => navigate(`/classes/${cls.id}/edit`)}>
            <Pencil size={15} aria-hidden="true" /> Edit Class
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <Card>
          <div className="classes-state-center">
            <Spinner label="Loading class details" />
            <p>Loading class details…</p>
          </div>
        </Card>
      ) : error ? (
        <Card>
          <div className="classes-state-center classes-state-center--error">
            <AlertCircle size={32} aria-hidden="true" />
            <p>{error}</p>
            <Button variant="secondary" onClick={() => navigate('/classes')}>
              Back to Classes
            </Button>
          </div>
        </Card>
      ) : cls ? (
        <Card className="detail-card">
          <dl className="detail-grid">
            <div className="detail-row">
              <dt className="detail-label">Grade</dt>
              <dd className="detail-value">{getGradeName(cls.gradeId)}</dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Section</dt>
              <dd className="detail-value">{getSectionName(cls.sectionId)}</dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Class Teacher</dt>
              <dd className="detail-value">{getTeacherName(cls.classTeacherId)}</dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Room</dt>
              <dd className="detail-value">{cls.roomNumber || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}</dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Academic Year</dt>
              <dd className="detail-value">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {getYearLabel(cls.academicYearId)}
                  {isCurrentYear(cls.academicYearId) ? <Badge tone="success">Current</Badge> : null}
                </span>
              </dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Students</dt>
              <dd className="detail-value">
                <span className={cls.studentCount >= cls.maximumStudents ? 'student-count student-count--full' : 'student-count'}>
                  {cls.studentCount} / {cls.maximumStudents}
                </span>
              </dd>
            </div>
            <div className="detail-row">
              <dt className="detail-label">Maximum Students</dt>
              <dd className="detail-value">{cls.maximumStudents}</dd>
            </div>
          </dl>
        </Card>
      ) : null}
    </DashboardLayout>
  )
}
