import { Mail, Phone, Edit2 } from 'lucide-react'
import type { Teacher } from '../../data/teachersData'

interface TeacherProfileHeaderProps {
  teacher: Teacher
  onEditClick?: () => void
}

const statusLabels: Record<string, string> = {
  active: 'Active',
  'on-leave': 'On Leave',
  inactive: 'Inactive',
}

const statusBadge: Record<string, string> = {
  active: 'badge--success',
  'on-leave': 'badge--warning',
  inactive: 'badge--error',
}

export function TeacherProfileHeader({ teacher, onEditClick }: TeacherProfileHeaderProps) {
  return (
    <div className="teacher-profile-header card">
      <div className="teacher-profile-header__top">
        <span className={`teacher-avatar teacher-avatar--lg teacher-avatar--${teacher.status}`} aria-hidden="true">
          {teacher.initials}
        </span>
        <div className="teacher-profile-header__info">
          <div className="teacher-profile-header__name-row">
            <h3 className="teacher-profile-name">{teacher.name}</h3>
            <span className={`badge ${statusBadge[teacher.status]}`}>
              {statusLabels[teacher.status]}
            </span>
          </div>
          <p className="teacher-profile-dept">{teacher.department} Department</p>
          <div className="teacher-profile-contacts">
            <a
              className="teacher-contact-link"
              href={`mailto:${teacher.email}`}
              aria-label={`Email ${teacher.name}`}
            >
              <Mail size={14} aria-hidden="true" />
              {teacher.email}
            </a>
            <a
              className="teacher-contact-link"
              href={`tel:${teacher.phone}`}
              aria-label={`Call ${teacher.name}`}
            >
              <Phone size={14} aria-hidden="true" />
              {teacher.phone}
            </a>
          </div>
        </div>
      </div>

      <button
        className="button button--secondary teacher-edit-btn"
        type="button"
        id={`edit-teacher-${teacher.id}`}
        aria-label={`Edit profile of ${teacher.name}`}
        onClick={onEditClick}
      >
        <Edit2 size={14} aria-hidden="true" />
        Edit Profile
      </button>
    </div>
  )
}
