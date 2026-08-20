import { Users, BookOpen, ClipboardCheck, Briefcase } from 'lucide-react'
import type { Teacher } from '../../data/teachersData'

interface TeacherStatsRowProps {
  teacher: Teacher
}

export function TeacherStatsRow({ teacher }: TeacherStatsRowProps) {
  const stats = [
    {
      icon: Users,
      label: 'Students',
      value: teacher.studentsCount.toString(),
      sub: 'assigned',
    },
    {
      icon: BookOpen,
      label: 'Classes',
      value: teacher.classesCount.toString(),
      sub: 'this term',
    },
    {
      icon: ClipboardCheck,
      label: 'Attendance Rate',
      value: `${teacher.attendanceRate}%`,
      sub: 'this year',
    },
    {
      icon: Briefcase,
      label: 'Experience',
      value: `${teacher.experience} yrs`,
      sub: 'teaching',
    },
  ]

  return (
    <div className="teacher-stats-row" role="list" aria-label="Teacher statistics">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div className="teacher-stat-card card" key={stat.label} role="listitem">
            <div className="teacher-stat-card__icon">
              <Icon size={18} aria-hidden="true" />
            </div>
            <div className="teacher-stat-card__body">
              <span className="teacher-stat-card__value">{stat.value}</span>
              <span className="teacher-stat-card__label">{stat.label}</span>
              <span className="teacher-stat-card__sub">{stat.sub}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
