import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { TeacherProfileHeader } from '../../components/teachers/TeacherProfileHeader'
import { TeacherStatsRow } from '../../components/teachers/TeacherStatsRow'
import { TeacherSubjectsList } from '../../components/teachers/TeacherSubjectsList'
import { TeacherClassesList } from '../../components/teachers/TeacherClassesList'
import { TeacherInfoCard } from '../../components/teachers/TeacherInfoCard'
import { teachers } from '../../data/teachersData'

export function TeacherProfilePage() {
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0].id)
  const teacher = teachers.find((t) => t.id === selectedTeacherId) ?? teachers[0]

  return (
    <DashboardLayout activePath="/teachers">
      <section className="dashboard-section" aria-labelledby="teachers-heading">
        <div className="dashboard-section__header dashboard-section__header--stats">
          <div>
            <span className="section-kicker">Staff Management</span>
            <h2 id="teachers-heading">Teachers</h2>
          </div>
          <button className="button button--primary" type="button" id="add-teacher-btn">
            + Add Teacher
          </button>
        </div>

        <div className="teacher-profile-layout">
          {/* Teacher List Sidebar */}
          <aside className="teacher-list-panel card" aria-label="Teacher list">
            <div className="teacher-list-panel__header">
              <span className="teacher-list-panel__title">All Teachers</span>
              <span className="badge badge--info">{teachers.length}</span>
            </div>
            <ul className="teacher-list" role="listbox" aria-label="Select a teacher">
              {teachers.map((t) => (
                <li key={t.id} role="option" aria-selected={t.id === selectedTeacherId}>
                  <button
                    className={`teacher-list-item${t.id === selectedTeacherId ? ' teacher-list-item--active' : ''}`}
                    type="button"
                    onClick={() => setSelectedTeacherId(t.id)}
                    id={`teacher-list-item-${t.id}`}
                  >
                    <span className={`teacher-avatar teacher-avatar--sm teacher-avatar--${t.status}`}>
                      {t.initials}
                    </span>
                    <span className="teacher-list-item__info">
                      <strong>{t.name}</strong>
                      <small>{t.department}</small>
                    </span>
                    <span
                      className={`status-dot status-dot--${t.status}`}
                      aria-label={t.status}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Teacher Profile Detail */}
          <div className="teacher-profile-detail" aria-live="polite" aria-label={`Profile of ${teacher.name}`}>
            <TeacherProfileHeader teacher={teacher} />
            <TeacherStatsRow teacher={teacher} />

            <div className="teacher-detail-grid">
              <TeacherInfoCard teacher={teacher} />
              <TeacherSubjectsList teacher={teacher} />
              <TeacherClassesList teacher={teacher} />
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
