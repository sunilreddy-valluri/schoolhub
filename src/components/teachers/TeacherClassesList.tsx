import type { Teacher } from '../../data/teachersData'

interface TeacherClassesListProps {
  teacher: Teacher
}

export function TeacherClassesList({ teacher }: TeacherClassesListProps) {
  return (
    <div className="teacher-detail-card card" aria-label="Assigned classes">
      <div className="teacher-detail-card__header">
        <span className="section-kicker">Assigned Classes</span>
        <span className="badge badge--info">{teacher.classes.length}</span>
      </div>
      <ul className="teacher-classes-list" aria-label="Classes list">
        {teacher.classes.map((cls, idx) => (
          <li className="teacher-classes-item" key={cls}>
            <span className="teacher-classes-item__index">{String(idx + 1).padStart(2, '0')}</span>
            <span className="teacher-classes-item__name">{cls}</span>
            <span className="badge badge--success">Active</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
