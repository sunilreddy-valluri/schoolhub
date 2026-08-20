import { useNavigate } from 'react-router-dom'
import { BookOpen, Eye, Pencil } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import {
  classes,
  grades,
  sections,
  teachers,
  academicYears,
} from '../../data/classData'

function getGradeName(id: string)   { return grades.find((g) => g.id === id)?.name ?? '—' }
function getSectionName(id: string) { return sections.find((s) => s.id === id)?.name ?? '—' }
function getTeacherName(id: string) { return teachers.find((t) => t.id === id)?.fullName ?? '—' }
function getYearLabel(id: string)   { return academicYears.find((a) => a.id === id)?.label ?? '—' }
function isCurrentYear(id: string)  { return academicYears.find((a) => a.id === id)?.isCurrent ?? false }

export function ClassesSection() {
  const navigate = useNavigate()

  return (
    <section
      id="classes"
      className="dashboard-section dashboard-section--last"
      aria-labelledby="classes-heading"
    >
      <div className="dashboard-section__header">
        <div>
          <span className="section-kicker">School management</span>
          <h2 id="classes-heading">Classes</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className="section-link"
            type="button"
            onClick={() => navigate('/classes')}
          >
            View all
          </button>
          <Button onClick={() => navigate('/classes/new')}>+ Create Class</Button>
        </div>
      </div>

      <Card>
        {classes.length === 0 ? (
          <div className="classes-list-empty">
            <span className="classes-list-empty__icon" aria-hidden="true">
              <BookOpen size={26} />
            </span>
            <h3>No classes yet</h3>
            <p>Get started by creating your first class.</p>
            <Button onClick={() => navigate('/classes/new')}>+ Create Class</Button>
          </div>
        ) : (
          <div className="classes-table-wrapper">
            <table className="classes-table" aria-label="Classes list">
              <thead>
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Class Teacher</th>
                  <th scope="col">Students</th>
                  <th scope="col">Room</th>
                  <th scope="col">Academic Year</th>
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {classes.slice(0, 5).map((cls) => (
                  <tr key={cls.id}>
                    <td className="classes-table__name">
                      {getGradeName(cls.gradeId)} – {getSectionName(cls.sectionId)}
                    </td>
                    <td className="classes-table__teacher">
                      {getTeacherName(cls.classTeacherId)}
                    </td>
                    <td>
                      <span className={cls.studentCount >= cls.maximumStudents ? 'student-count student-count--full' : 'student-count'}>
                        {cls.studentCount} / {cls.maximumStudents}
                      </span>
                    </td>
                    <td className="classes-table__room">
                      {cls.roomNumber || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {getYearLabel(cls.academicYearId)}
                        {isCurrentYear(cls.academicYearId) ? (
                          <Badge tone="success">Current</Badge>
                        ) : null}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="table-action table-action--view"
                          type="button"
                          onClick={() => navigate(`/classes/${cls.id}`)}
                          aria-label={`View ${cls.displayName}`}
                        >
                          <Eye size={14} aria-hidden="true" />
                          <span>View</span>
                        </button>
                        <button
                          className="table-action table-action--edit"
                          type="button"
                          onClick={() => navigate(`/classes/${cls.id}/edit`)}
                          aria-label={`Edit ${cls.displayName}`}
                        >
                          <Pencil size={14} aria-hidden="true" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {classes.length > 5 ? (
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', textAlign: 'right' }}>
            <button className="section-link" type="button" onClick={() => navigate('/classes')}>
              View all {classes.length} classes →
            </button>
          </div>
        ) : null}
      </Card>
    </section>
  )
}
