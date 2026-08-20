import { Calendar, Award, Hash } from 'lucide-react'
import type { Teacher } from '../../data/teachersData'

interface TeacherInfoCardProps {
  teacher: Teacher
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function TeacherInfoCard({ teacher }: TeacherInfoCardProps) {
  const rows = [
    { icon: Hash, label: 'Teacher ID', value: teacher.id },
    { icon: Award, label: 'Qualification', value: teacher.qualification },
    { icon: Calendar, label: 'Joined On', value: formatDate(teacher.joinDate) },
  ]

  return (
    <div className="teacher-detail-card card" aria-label="Personal information">
      <div className="teacher-detail-card__header">
        <span className="section-kicker">Personal Info</span>
      </div>
      <dl className="teacher-info-list">
        {rows.map(({ icon: Icon, label, value }) => (
          <div className="teacher-info-item" key={label}>
            <dt className="teacher-info-item__label">
              <Icon size={14} aria-hidden="true" />
              {label}
            </dt>
            <dd className="teacher-info-item__value">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
