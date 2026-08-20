import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  TrendingUp,
  User,
} from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { getStudentById } from '../../data/studentData'
import type { Student } from '../../data/studentData'

function gradeToTone(grade: string): 'success' | 'info' | 'warning' | 'error' {
  if (grade.startsWith('A')) return 'success'
  if (grade.startsWith('B')) return 'info'
  if (grade.startsWith('C')) return 'warning'
  return 'error'
}

function statusTone(status: Student['status']): 'success' | 'warning' | 'error' {
  if (status === 'active') return 'success'
  if (status === 'inactive') return 'warning'
  return 'error'
}

function statusLabel(status: Student['status']) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="profile-info-row">
      <span className="profile-info-row__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="profile-info-row__label">{label}</span>
      <span className="profile-info-row__value">{value}</span>
    </div>
  )
}

interface SectionHeadingProps {
  icon: React.ReactNode
  title: string
  id: string
}

function SectionHeading({ icon, title, id }: SectionHeadingProps) {
  return (
    <div className="profile-section-heading" id={id}>
      <span className="profile-section-heading__icon" aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
    </div>
  )
}

export function StudentProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const student = getStudentById(id ?? '1')

  if (!student) {
    return (
      <DashboardLayout>
        <div className="profile-not-found">
          <h2>Student not found</h2>
          <p>The student you are looking for does not exist or has been removed.</p>
          <Button variant="secondary" onClick={() => navigate('/students')}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Students
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const absentPct = (student.attendance.absent / student.attendance.totalDays) * 100
  const presentPct = (student.attendance.present / student.attendance.totalDays) * 100
  const latePct = (student.attendance.late / student.attendance.totalDays) * 100

  return (
    <DashboardLayout>
      {/* Page header / breadcrumb row */}
      <div className="profile-page-header">
        <div className="profile-page-header__nav">
          <Button
            id="back-to-students-btn"
            variant="secondary"
            onClick={() => navigate('/students')}
            aria-label="Back to Students list"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Students
          </Button>
        </div>
        <div className="profile-page-header__actions">
          <Button
            id="edit-student-btn"
            variant="primary"
            onClick={() => navigate(`/students/${student.id}/edit`)}
            aria-label={`Edit ${student.name}'s profile`}
          >
            <Pencil size={15} aria-hidden="true" />
            Edit Student
          </Button>
        </div>
      </div>

      {/* Identity hero card */}
      <Card className="profile-hero-card" aria-labelledby="student-name-heading">
        <div className="profile-hero">
          <div className="profile-hero__avatar" aria-hidden="true">
            {student.avatarInitials}
          </div>
          <div className="profile-hero__info">
            <div className="profile-hero__top">
              <h1 id="student-name-heading" className="profile-hero__name">
                {student.name}
              </h1>
              <Badge tone={statusTone(student.status)}>{statusLabel(student.status)}</Badge>
            </div>
            <p className="profile-hero__id">ID: {student.studentId}</p>
            <div className="profile-hero__meta">
              <span className="profile-hero__meta-item">
                <BookOpen size={14} aria-hidden="true" />
                {student.grade}
              </span>
              <span className="profile-hero__meta-sep" aria-hidden="true" />
              <span className="profile-hero__meta-item">
                <User size={14} aria-hidden="true" />
                {student.className}
              </span>
              <span className="profile-hero__meta-sep" aria-hidden="true" />
              <span className="profile-hero__meta-item">
                <CalendarDays size={14} aria-hidden="true" />
                Enrolled {new Date(student.enrollmentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Two-column body */}
      <div className="profile-body">
        {/* Left column */}
        <div className="profile-col profile-col--left">
          {/* Contact information */}
          <Card className="profile-section-card" aria-labelledby="contact-section-heading">
            <SectionHeading
              id="contact-section-heading"
              icon={<Phone size={16} />}
              title="Contact Information"
            />
            <div className="profile-info-list">
              <InfoRow icon={<Mail size={15} />} label="Email" value={student.contact.email} />
              <InfoRow icon={<Phone size={15} />} label="Phone" value={student.contact.phone} />
              <InfoRow icon={<MapPin size={15} />} label="Address" value={student.contact.address} />
              <InfoRow icon={<CalendarDays size={15} />} label="Date of Birth" value={new Date(student.dateOfBirth).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
              <InfoRow icon={<User size={15} />} label="Gender" value={student.gender} />
            </div>
          </Card>

          {/* Parent / Guardian information */}
          <Card className="profile-section-card" aria-labelledby="guardian-section-heading">
            <SectionHeading
              id="guardian-section-heading"
              icon={<Shield size={16} />}
              title="Parent / Guardian"
            />
            <div className="profile-guardian-list">
              {student.guardians.map((guardian) => (
                <div key={guardian.name} className="profile-guardian">
                  <div className="profile-guardian__header">
                    <span className="profile-guardian__avatar" aria-hidden="true">
                      {guardian.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <div className="profile-guardian__identity">
                      <strong>{guardian.name}</strong>
                      <small>{guardian.relationship}</small>
                    </div>
                  </div>
                  <div className="profile-guardian__contact">
                    <InfoRow icon={<Phone size={14} />} label="Phone" value={guardian.phone} />
                    <InfoRow icon={<Mail size={14} />} label="Email" value={guardian.email} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="profile-col profile-col--right">
          {/* Attendance summary */}
          <Card className="profile-section-card" aria-labelledby="attendance-section-heading">
            <SectionHeading
              id="attendance-section-heading"
              icon={<ClipboardList size={16} />}
              title="Attendance Summary"
            />
            <div className="profile-attendance-summary">
              <div className="profile-attendance-stat">
                <strong>{student.attendance.percentage}%</strong>
                <span>Overall Attendance</span>
              </div>
              <div className="profile-attendance-bar" role="img" aria-label={`Attendance breakdown: ${student.attendance.present} present, ${student.attendance.absent} absent, ${student.attendance.late} late`}>
                <div
                  className="profile-attendance-bar__segment profile-attendance-bar__segment--present"
                  style={{ width: `${presentPct}%` }}
                />
                <div
                  className="profile-attendance-bar__segment profile-attendance-bar__segment--late"
                  style={{ width: `${latePct}%` }}
                />
                <div
                  className="profile-attendance-bar__segment profile-attendance-bar__segment--absent"
                  style={{ width: `${absentPct}%` }}
                />
              </div>
              <div className="profile-attendance-legend">
                <div className="profile-attendance-legend__item">
                  <span className="profile-attendance-legend__dot profile-attendance-legend__dot--present" />
                  <span>Present</span>
                  <strong>{student.attendance.present}</strong>
                </div>
                <div className="profile-attendance-legend__item">
                  <span className="profile-attendance-legend__dot profile-attendance-legend__dot--late" />
                  <span>Late</span>
                  <strong>{student.attendance.late}</strong>
                </div>
                <div className="profile-attendance-legend__item">
                  <span className="profile-attendance-legend__dot profile-attendance-legend__dot--absent" />
                  <span>Absent</span>
                  <strong>{student.attendance.absent}</strong>
                </div>
              </div>
              <p className="profile-attendance-total">
                Out of <strong>{student.attendance.totalDays}</strong> school days
              </p>
            </div>
          </Card>

          {/* Academic summary */}
          <Card className="profile-section-card" aria-labelledby="academic-section-heading">
            <SectionHeading
              id="academic-section-heading"
              icon={<TrendingUp size={16} />}
              title="Academic Summary"
            />
            <div className="profile-academic-meta">
              <div className="profile-academic-stat">
                <strong>{student.academics.gpa}</strong>
                <span>GPA</span>
              </div>
              <div className="profile-academic-stat">
                <strong>#{student.academics.rank}</strong>
                <span>Class Rank</span>
              </div>
              <div className="profile-academic-stat">
                <strong>{student.academics.totalStudents}</strong>
                <span>Total Students</span>
              </div>
            </div>
            <ul className="profile-subject-list" aria-label="Subjects and grades">
              {student.academics.subjects.map((subject) => (
                <li key={subject.subject} className="profile-subject-item">
                  <span className="profile-subject-item__name">{subject.subject}</span>
                  <div className="profile-subject-item__right">
                    <div className="profile-subject-item__bar-wrap" aria-hidden="true">
                      <div
                        className="profile-subject-item__bar"
                        style={{ width: `${(subject.score / subject.maxScore) * 100}%` }}
                      />
                    </div>
                    <span className="profile-subject-item__score">
                      {subject.score}/{subject.maxScore}
                    </span>
                    <Badge tone={gradeToTone(subject.grade)}>{subject.grade}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
