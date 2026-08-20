import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Search, UserPlus } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { students } from '../../data/studentData'
import type { Student } from '../../data/studentData'

function statusTone(status: Student['status']): 'success' | 'warning' | 'error' {
  if (status === 'active') return 'success'
  if (status === 'inactive') return 'warning'
  return 'error'
}

function statusLabel(status: Student['status']) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function StudentsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = students.filter((s) => {
    const q = query.toLowerCase()
    return (
      s.name.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.grade.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q)
    )
  })

  return (
    <DashboardLayout>
      {/* Page heading */}
      <div className="students-page-header">
        <div>
          <span className="section-kicker">School roster</span>
          <h1 id="students-heading">Students</h1>
          <p className="page-intro">{students.length} students enrolled</p>
        </div>
        <Button
          id="add-student-btn"
          variant="primary"
          onClick={() => navigate('/students/new')}
          aria-label="Add a new student"
        >
          <UserPlus size={16} aria-hidden="true" />
          Add Student
        </Button>
      </div>

      {/* Search + table */}
      <Card className="students-card">
        {/* Search bar */}
        <div className="students-search-row">
          <div className="students-search">
            <Search size={16} className="students-search__icon" aria-hidden="true" />
            <input
              id="student-search-input"
              className="students-search__input"
              type="search"
              placeholder="Search by name, ID, grade…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search students"
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length > 0 ? (
          <div className="students-table-wrap" role="region" aria-label="Students list" tabIndex={0}>
            <table className="students-table" aria-labelledby="students-heading">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">ID</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Class</th>
                  <th scope="col">Attendance</th>
                  <th scope="col">Status</th>
                  <th scope="col" aria-label="View profile" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr
                    key={student.id}
                    className="students-table__row"
                    onClick={() => navigate(`/students/${student.id}`)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View profile of ${student.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        navigate(`/students/${student.id}`)
                      }
                    }}
                  >
                    <td>
                      <div className="students-table__identity">
                        <span className="students-table__avatar" aria-hidden="true">
                          {student.avatarInitials}
                        </span>
                        <span className="students-table__name">{student.name}</span>
                      </div>
                    </td>
                    <td className="students-table__id">{student.studentId}</td>
                    <td>{student.grade}</td>
                    <td>{student.className}</td>
                    <td>
                      <span
                        className={`students-table__attendance${
                          student.attendance.percentage >= 90
                            ? ' students-table__attendance--good'
                            : student.attendance.percentage >= 75
                            ? ' students-table__attendance--warn'
                            : ' students-table__attendance--poor'
                        }`}
                      >
                        {student.attendance.percentage}%
                      </span>
                    </td>
                    <td>
                      <Badge tone={statusTone(student.status)}>{statusLabel(student.status)}</Badge>
                    </td>
                    <td>
                      <ChevronRight
                        size={16}
                        className="students-table__chevron"
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="students-empty">
            <p>No students match &ldquo;{query}&rdquo;.</p>
          </div>
        )}
      </Card>
    </DashboardLayout>
  )
}
