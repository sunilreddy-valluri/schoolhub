import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { teachers } from '../../data/teachersData'
import type { TeacherStatus } from '../../data/teachersData'

const statusLabel: Record<TeacherStatus, string> = {
  active: 'Active',
  'on-leave': 'On Leave',
  inactive: 'Inactive',
}

const statusBadgeClass: Record<TeacherStatus, string> = {
  active: 'badge--success',
  'on-leave': 'badge--warning',
  inactive: 'badge--error',
}

export function TeachersListPage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout activePath="/teachers">
      <section className="dashboard-section" aria-labelledby="teachers-list-heading">
        <div className="dashboard-section__header dashboard-section__header--stats">
          <div>
            <span className="section-kicker">Staff Management</span>
            <h2 id="teachers-list-heading">Teachers</h2>
          </div>
          <button className="button button--primary" type="button" id="add-teacher-btn">
            + Add Teacher
          </button>
        </div>

        <div className="card teachers-table-card">
          <div className="teachers-table-toolbar">
            <span className="teachers-table-count">
              {teachers.length} teachers
            </span>
          </div>
          <div className="teachers-table-wrapper" role="region" aria-label="Teachers list" tabIndex={0}>
            <table className="teachers-table" aria-label="All teachers">
              <thead>
                <tr>
                  <th scope="col">Teacher</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Department</th>
                  <th scope="col">Subjects</th>
                  <th scope="col">Classes</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="teachers-table__row"
                    onClick={() => navigate(`/teachers/${teacher.id}`)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View profile of ${teacher.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') navigate(`/teachers/${teacher.id}`)
                    }}
                  >
                    <td>
                      <div className="teachers-table__teacher-cell">
                        <span
                          className={`teacher-avatar teacher-avatar--sm teacher-avatar--${teacher.status}`}
                          aria-hidden="true"
                        >
                          {teacher.initials}
                        </span>
                        <span className="teachers-table__teacher-info">
                          <strong>{teacher.name}</strong>
                          <small>{teacher.email}</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="teachers-table__id">{teacher.id}</span>
                    </td>
                    <td>{teacher.department}</td>
                    <td>
                      <span className="teachers-table__subjects">
                        {teacher.subjects.map((s) => s.name).join(', ')}
                      </span>
                    </td>
                    <td>
                      <span className="teachers-table__classes">
                        {teacher.classesCount} classes
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadgeClass[teacher.status]}`}>
                        {statusLabel[teacher.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
