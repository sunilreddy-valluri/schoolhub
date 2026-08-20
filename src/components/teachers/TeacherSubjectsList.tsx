import type { Teacher } from '../../data/teachersData'

interface TeacherSubjectsListProps {
  teacher: Teacher
}

export function TeacherSubjectsList({ teacher }: TeacherSubjectsListProps) {
  return (
    <div className="teacher-detail-card card" aria-label="Subjects taught">
      <div className="teacher-detail-card__header">
        <span className="section-kicker">Subjects</span>
      </div>
      <ul className="teacher-subjects-list">
        {teacher.subjects.map((subject) => (
          <li className="teacher-subject-item" key={subject.name}>
            <div className="teacher-subject-item__top">
              <span className="teacher-subject-name">{subject.name}</span>
              <span className="badge badge--info">{subject.classes.length} classes</span>
            </div>
            <div className="teacher-subject-classes">
              {subject.classes.map((cls) => (
                <span className="teacher-class-chip" key={cls}>
                  {cls}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
