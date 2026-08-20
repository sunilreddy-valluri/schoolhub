import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
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

function getGradeName(gradeId: string) {
  return grades.find((g) => g.id === gradeId)?.name ?? '—'
}
function getSectionName(sectionId: string) {
  return sections.find((s) => s.id === sectionId)?.name ?? '—'
}
function getTeacherName(teacherId: string) {
  return teachers.find((t) => t.id === teacherId)?.fullName ?? '—'
}
function getAcademicYearLabel(yearId: string) {
  return academicYears.find((a) => a.id === yearId)?.label ?? '—'
}
function isCurrentYear(yearId: string) {
  return academicYears.find((a) => a.id === yearId)?.isCurrent ?? false
}

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
        <Button onClick={() => navigate('/classes/new')}>
          + Create Class
        </Button>
      </div>

      <Card>
        {classes.length === 0 ? (
          <div className="classes-list-empty">
            <span className="classes-list-empty__icon" aria-hidden="true">
              <BookOpen size={26} />
            </span>
            <h3>No classes yet</h3>
            <p>Get started by creating your first class.</p>
            <Button onClick={() => navigate('/classes/new')}>
              + Create Class
            </Button>
          </div>
        ) : (
          <div className="classes-table-wrapper">
            <table className="classes-table" aria-label="Classes list">
              <thead>
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Class Teacher</th>
                  <th scope="col">Room</th>
                  <th scope="col">Academic Year</th>
                  <th scope="col">Max Students</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.id}>
                    <td className="classes-table__name">
                      {getGradeName(cls.gradeId)} – {getSectionName(cls.sectionId)}
                    </td>
                    <td className="classes-table__teacher">
                      {getTeacherName(cls.classTeacherId)}
                    </td>
                    <td className="classes-table__room">
                      {cls.roomNumber || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {getAcademicYearLabel(cls.academicYearId)}
                        {isCurrentYear(cls.academicYearId) ? (
                          <Badge tone="success">Current</Badge>
                        ) : null}
                      </span>
                    </td>
                    <td>{cls.maximumStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  )
}
