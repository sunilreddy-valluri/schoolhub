import { useNavigate } from 'react-router-dom'
import { Layers3, Paperclip } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { assignments } from '../../data/assignmentData'
import { classes, grades, sections } from '../../data/classData'

function getClassDisplayName(classId: string) {
  const cls = classes.find((c) => c.id === classId)
  if (!cls) return '—'
  const grade = grades.find((g) => g.id === cls.gradeId)?.name ?? ''
  const section = sections.find((s) => s.id === cls.sectionId)?.name ?? ''
  return `${grade} – ${section}`
}

function getPriorityBadgeTone(priority: 'Low' | 'Medium' | 'High') {
  switch (priority) {
    case 'High':
      return 'error'
    case 'Medium':
      return 'warning'
    case 'Low':
    default:
      return 'info'
  }
}

export function AssignmentsSection() {
  const navigate = useNavigate()

  return (
    <section
      id="assignments"
      className="dashboard-section"
      aria-labelledby="assignments-heading"
      style={{ scrollMarginTop: '24px' }}
    >
      <div className="dashboard-section__header">
        <div>
          <span className="section-kicker">Academic Work</span>
          <h2 id="assignments-heading">Assignments</h2>
        </div>
        <Button onClick={() => navigate('/assignments/new')}>
          + Create Assignment
        </Button>
      </div>

      <Card>
        {assignments.length === 0 ? (
          <div className="classes-list-empty">
            <span className="classes-list-empty__icon" aria-hidden="true">
              <Layers3 size={26} />
            </span>
            <h3>No assignments yet</h3>
            <p>Get started by creating your first assignment.</p>
            <Button onClick={() => navigate('/assignments/new')}>
              + Create Assignment
            </Button>
          </div>
        ) : (
          <div className="classes-table-wrapper">
            <table className="classes-table" aria-label="Assignments list">
              <thead>
                <tr>
                  <th scope="col">Assignment Title</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Class</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Attachment</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="classes-table__name">
                      <div style={{ display: 'grid', gap: '4px' }}>
                        <span>{assignment.title}</span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.4,
                            wordBreak: 'break-word',
                          }}
                        >
                          {assignment.description}
                        </span>
                      </div>
                    </td>
                    <td>{assignment.subject}</td>
                    <td className="classes-table__teacher">
                      {getClassDisplayName(assignment.classId)}
                    </td>
                    <td>{assignment.dueDate}</td>
                    <td>
                      <Badge tone={getPriorityBadgeTone(assignment.priority)}>
                        {assignment.priority}
                      </Badge>
                    </td>
                    <td>
                      {assignment.attachmentName ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            color: 'var(--color-primary)',
                            fontWeight: 500,
                          }}
                          title={assignment.attachmentName}
                        >
                          <Paperclip size={14} />
                          <span
                            style={{
                              maxWidth: '120px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {assignment.attachmentName}
                          </span>
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                      )}
                    </td>
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
