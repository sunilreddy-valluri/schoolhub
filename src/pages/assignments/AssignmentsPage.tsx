import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Edit, Trash2, Search, X, Paperclip, AlertCircle, Upload } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Select } from '../../components/ui/Select'
import { assignments, subjects, type Assignment } from '../../data/assignmentData'
import { classes, grades, sections } from '../../data/classData'

// ─── Helper functions ──────────────────────────────────────────────────────────

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

// ─── Modal Sub-Components ──────────────────────────────────────────────────────

interface ViewModalProps {
  assignment: Assignment
  onClose: () => void
}

function ViewAssignmentModal({ assignment, onClose }: ViewModalProps) {
  return (
    <div className="attendance-edit-modal-overlay" onClick={onClose}>
      <Card className="attendance-edit-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="attendance-edit-modal__header">
          <h2 className="attendance-edit-modal__title">Assignment Details</h2>
          <button onClick={onClose} className="attendance-edit-modal__close" type="button" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="attendance-edit-modal__content" style={{ display: 'grid', gap: '16px' }}>
          <div>
            <span className="section-kicker" style={{ color: 'var(--color-primary)' }}>
              {assignment.subject} • {getClassDisplayName(assignment.classId)}
            </span>
            <h3 style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {assignment.title}
            </h3>
          </div>

          <div className="divider" style={{ margin: '4px 0' }}>
            <div className="divider__line" />
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Instructions
            </span>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {assignment.description}
            </p>
          </div>

          <div className="create-class-form__row" style={{ marginTop: '8px' }}>
            <div style={{ display: 'grid', gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Due Date
              </span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                📅 {assignment.dueDate}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Priority
              </span>
              <div>
                <Badge tone={getPriorityBadgeTone(assignment.priority)}>{assignment.priority}</Badge>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '4px', marginTop: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Submission Status
            </span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              📝 {assignment.id === 'assignment-1' ? '12/15 Submitted' : assignment.id === 'assignment-2' ? '8/15 Submitted' : '0/15 Submitted'}
            </span>
          </div>

          {assignment.attachmentName && (
            <div style={{ display: 'grid', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Attachment
              </span>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  background: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary-border)',
                  borderRadius: 'var(--radius-default)',
                  width: 'fit-content',
                }}
              >
                <Paperclip size={15} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)' }}>
                  {assignment.attachmentName}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="attendance-edit-modal__footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}

interface EditModalProps {
  assignment: Assignment
  isOpen: boolean
  onClose: () => void
  onSave: (updated: Assignment) => void
}

function EditAssignmentModal({ assignment, isOpen, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState(assignment.title)
  const [description, setDescription] = useState(assignment.description)
  const [subject, setSubject] = useState(assignment.subject)
  const [classId, setClassId] = useState(assignment.classId)
  const [dueDate, setDueDate] = useState(assignment.dueDate)
  const [priority, setPriority] = useState<Assignment['priority']>(assignment.priority)
  const [attachmentName, setAttachmentName] = useState(assignment.attachmentName)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [validationError, setValidationError] = useState<string | null>(null)

  if (!isOpen) return null

  function handleFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      setValidationError('File size exceeds the 10MB limit.')
      return
    }
    setValidationError(null)
    setAttachmentName(file.name)
  }

  function validateForm(): boolean {
    const nextErrors: Record<string, string> = {}

    if (!title.trim()) {
      nextErrors.title = 'Assignment title is required.'
    } else if (title.trim().length > 100) {
      nextErrors.title = 'Assignment title must be 100 characters or fewer.'
    }

    if (!description.trim()) {
      nextErrors.description = 'Description is required.'
    } else if (description.trim().length > 1000) {
      nextErrors.description = 'Description must be 1000 characters or fewer.'
    }

    if (!subject) {
      nextErrors.subject = 'Subject is required.'
    }

    if (!classId) {
      nextErrors.classId = 'Class is required.'
    }

    if (!dueDate) {
      nextErrors.dueDate = 'Due date is required.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const [year, month, day] = dueDate.split('-').map(Number)
      const selectedDate = new Date(year, month - 1, day)
      if (selectedDate < today) {
        nextErrors.dueDate = 'Due date cannot be in the past.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return
    onSave({
      ...assignment,
      title,
      description,
      subject,
      classId,
      dueDate,
      priority,
      attachmentName,
    })
    onClose()
  }

  return (
    <div className="attendance-edit-modal-overlay" onClick={onClose}>
      <Card className="attendance-edit-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="attendance-edit-modal__header">
          <h2 className="attendance-edit-modal__title">Edit Assignment</h2>
          <button onClick={onClose} className="attendance-edit-modal__close" type="button" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="attendance-edit-modal__content" style={{ display: 'grid', gap: '16px' }}>
          {validationError && (
            <div className="alert alert--error" role="alert" style={{ marginBottom: '8px' }}>
              <AlertCircle className="alert__icon" size={18} />
              <div>
                <strong>Validation Alert</strong>
                <p>{validationError}</p>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="field-group">
            <Label htmlFor="edit-title" required>Assignment Title</Label>
            <Input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }))
              }}
              hasError={Boolean(errors.title)}
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="field-group">
            <Label htmlFor="edit-description" required>Description</Label>
            <textarea
              id="edit-description"
              className={`input${errors.description ? ' input--error' : ''}`}
              style={{
                height: '100px',
                padding: '12px 14px',
                resize: 'vertical',
                fontFamily: 'inherit',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }))
              }}
              maxLength={1000}
            />
            {errors.description && <p className="field-error">{errors.description}</p>}
          </div>

          {/* Row 1 - Subject & Class */}
          <div className="create-class-form__row">
            <div className="field-group">
              <Label htmlFor="edit-subject" required>Subject</Label>
              <Select
                id="edit-subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value)
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }))
                }}
                hasError={Boolean(errors.subject)}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </Select>
              {errors.subject && <p className="field-error">{errors.subject}</p>}
            </div>

            <div className="field-group">
              <Label htmlFor="edit-class" required>Class</Label>
              <Select
                id="edit-class"
                value={classId}
                onChange={(e) => {
                  setClassId(e.target.value)
                  if (errors.classId) setErrors((prev) => ({ ...prev, classId: '' }))
                }}
                hasError={Boolean(errors.classId)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.displayName}
                  </option>
                ))}
              </Select>
              {errors.classId && <p className="field-error">{errors.classId}</p>}
            </div>
          </div>

          {/* Row 2 - Due Date & Priority */}
          <div className="create-class-form__row">
            <div className="field-group">
              <Label htmlFor="edit-dueDate" required>Due Date</Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value)
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }))
                }}
                hasError={Boolean(errors.dueDate)}
              />
              {errors.dueDate && <p className="field-error">{errors.dueDate}</p>}
            </div>

            <div className="field-group">
              <Label htmlFor="edit-priority" required>Priority</Label>
              <Select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Assignment['priority'])}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </div>
          </div>

          {/* Attachment */}
          <div className="field-group">
            <Label htmlFor="edit-attachment">Attachment (Optional)</Label>
            {attachmentName ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary-border)',
                  borderRadius: 'var(--radius-default)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                  <Paperclip size={16} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{attachmentName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachmentName(null)}
                  style={{ border: 0, background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-default)',
                  padding: '20px',
                  textAlign: 'center',
                  background: 'var(--color-surface)',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('edit-attachment-file')?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const files = e.dataTransfer.files
                  if (files && files.length > 0) handleFile(files[0])
                }}
              >
                <input
                  id="edit-attachment-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const files = e.target.files
                    if (files && files.length > 0) handleFile(files[0])
                  }}
                />
                <div style={{ display: 'grid', placeItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                  <Upload size={20} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: '13px' }}>Click or drag a file to replace attachment</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="attendance-edit-modal__footer">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  )
}

interface DeleteModalProps {
  assignment: Assignment
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteAssignmentModal({ assignment, isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="attendance-edit-modal-overlay" onClick={onClose}>
      <Card className="attendance-edit-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="attendance-edit-modal__header">
          <h2 className="attendance-edit-modal__title" style={{ color: 'var(--color-error)' }}>Delete Assignment</h2>
          <button onClick={onClose} className="attendance-edit-modal__close" type="button" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="attendance-edit-modal__content">
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
            Are you sure you want to delete the assignment <strong>"{assignment.title}"</strong>? This action cannot be undone and will remove the record.
          </p>
        </div>

        <div className="attendance-edit-modal__footer" style={{ borderTop: 0, paddingTop: '16px' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete Assignment
          </Button>
        </div>
      </Card>
    </div>
  )
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export function AssignmentsPage() {
  const navigate = useNavigate()

  // Load state from original mock data array
  const [list, setList] = useState<Assignment[]>([...assignments])
  const [search, setSearch] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterSubject, setFilterSubject] = useState('')

  // Modal control states
  const [activeView, setActiveView] = useState<Assignment | null>(null)
  const [activeEdit, setActiveEdit] = useState<Assignment | null>(null)
  const [activeDelete, setActiveDelete] = useState<Assignment | null>(null)

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleEditSave = (updated: Assignment) => {
    const idx = assignments.findIndex((a) => a.id === updated.id)
    if (idx !== -1) {
      assignments[idx] = updated
      setList([...assignments])
    }
  }

  const handleDeleteConfirm = () => {
    if (!activeDelete) return
    const idx = assignments.findIndex((a) => a.id === activeDelete.id)
    if (idx !== -1) {
      assignments.splice(idx, 1)
      setList([...assignments])
    }
    setActiveDelete(null)
  }

  // ── Filters & Search ─────────────────────────────────────────────────────────

  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase())
    const matchesClass = filterClass ? item.classId === filterClass : true
    const matchesSubject = filterSubject ? item.subject === filterSubject : true
    return matchesSearch && matchesClass && matchesSubject
  })

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <span className="section-kicker">Academic Work</span>
          <h1 className="admin-page-title">Assignments Management</h1>
          <p className="admin-page-subtitle">
            Create, view details, edit, or delete student assignments.
          </p>
        </div>
        <Button onClick={() => navigate('/assignments/new')}>
          + Create Assignment
        </Button>
      </div>

      {/* Filters Card */}
      <Card style={{ padding: '20px', marginBottom: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'end',
          }}
        >
          {/* Search bar */}
          <div className="field-group">
            <Label htmlFor="search-input">Search Assignments</Label>
            <div style={{ position: 'relative' }}>
              <Input
                id="search-input"
                type="text"
                placeholder="Search by title or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '38px' }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
            </div>
          </div>

          {/* Class Filter */}
          <div className="field-group">
            <Label htmlFor="class-filter">Filter by Class</Label>
            <Select id="class-filter" value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.displayName}
                </option>
              ))}
            </Select>
          </div>

          {/* Subject Filter */}
          <div className="field-group">
            <Label htmlFor="subject-filter">Filter by Subject</Label>
            <Select id="subject-filter" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {/* Main Content Area */}
      <Card>
        {filteredList.length === 0 ? (
          <div className="classes-list-empty" style={{ padding: '48px 24px' }}>
            <span className="classes-list-empty__icon" aria-hidden="true">
              <Search size={26} />
            </span>
            {list.length === 0 ? (
              <>
                <h3>No assignments posted yet</h3>
                <p>Create your first assignment to share work with your classes.</p>
                <Button onClick={() => navigate('/assignments/new')}>
                  + Create Assignment
                </Button>
              </>
            ) : (
              <>
                <h3>No assignments found</h3>
                <p>No results match your search and filter options. Try adjusting them.</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch('')
                    setFilterClass('')
                    setFilterSubject('')
                  }}
                >
                  Clear Filters
                </Button>
              </>
            )}
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
                  <th scope="col">Submission Status</th>
                  <th scope="col" style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="classes-table__name">
                      <div style={{ display: 'grid', gap: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{assignment.title}</span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.4,
                            maxWidth: '320px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {assignment.description}
                        </span>
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'grid', gap: '6px' }}>
                        <span>{assignment.subject}</span>
                        <div>
                          <Badge tone={getPriorityBadgeTone(assignment.priority)} style={{ fontSize: '10px' }}>
                            {assignment.priority}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="classes-table__teacher" style={{ whiteSpace: 'nowrap' }}>
                      {getClassDisplayName(assignment.classId)}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{assignment.dueDate}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        📊 {assignment.id === 'assignment-1' ? '12/15 Submitted' : assignment.id === 'assignment-2' ? '8/15 Submitted' : '0/15 Submitted'}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '8px',
                          paddingRight: '12px',
                        }}
                      >
                        <button
                          onClick={() => setActiveView(assignment)}
                          style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '32px',
                            height: '32px',
                            border: 0,
                            borderRadius: 'var(--radius-small)',
                            background: 'var(--color-primary-light)',
                            color: 'var(--color-primary)',
                            cursor: 'pointer',
                          }}
                          title="View Details"
                          aria-label="View assignment details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setActiveEdit(assignment)}
                          style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '32px',
                            height: '32px',
                            border: 0,
                            borderRadius: 'var(--radius-small)',
                            background: 'var(--color-background)',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                          }}
                          title="Edit"
                          aria-label="Edit assignment"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => setActiveDelete(assignment)}
                          style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '32px',
                            height: '32px',
                            border: 0,
                            borderRadius: 'var(--radius-small)',
                            background: 'var(--color-error-light)',
                            color: 'var(--color-error)',
                            cursor: 'pointer',
                          }}
                          title="Delete"
                          aria-label="Delete assignment"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* View Modal */}
      {activeView && (
        <ViewAssignmentModal assignment={activeView} onClose={() => setActiveView(null)} />
      )}

      {/* Edit Modal */}
      {activeEdit && (
        <EditAssignmentModal
          assignment={activeEdit}
          isOpen={true}
          onClose={() => setActiveEdit(null)}
          onSave={handleEditSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {activeDelete && (
        <DeleteAssignmentModal
          assignment={activeDelete}
          isOpen={true}
          onClose={() => setActiveDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </DashboardLayout>
  )
}
