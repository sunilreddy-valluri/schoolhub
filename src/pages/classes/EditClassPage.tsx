import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
import { ClassForm } from '../../components/classes/ClassForm'
import { getClassById, type SchoolClass } from '../../data/classData'

export function EditClassPage() {
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
      .catch(() => setError('Class not found or unable to load.'))
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <DashboardLayout>
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <button
            className="back-link"
            type="button"
            onClick={() => navigate(`/classes/${id ?? ''}`)}
            aria-label="Back to class details"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Class Details</span>
          </button>
          <span className="section-kicker" style={{ marginTop: '12px' }}>School management</span>
          <h1 className="admin-page-title">Edit Class</h1>
          {cls ? (
            <p className="admin-page-subtitle">Editing {cls.displayName}</p>
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <Card>
          <div className="classes-state-center">
            <Spinner label="Loading class" />
            <p>Loading class…</p>
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
        <ClassForm
          mode="edit"
          existingClass={cls}
          onSuccess={(updated) => navigate(`/classes/${updated.id}`)}
          onCancel={() => navigate(`/classes/${cls.id}`)}
        />
      ) : null}
    </DashboardLayout>
  )
}
