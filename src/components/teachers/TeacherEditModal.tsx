import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { Teacher, TeacherStatus } from '../../data/teachersData'

interface TeacherEditModalProps {
  teacher: Teacher
  onClose: () => void
}

const statusOptions: { value: TeacherStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'inactive', label: 'Inactive' },
]

export function TeacherEditModal({ teacher, onClose }: TeacherEditModalProps) {
  const [name, setName] = useState(teacher.name)
  const [email, setEmail] = useState(teacher.email)
  const [phone, setPhone] = useState(teacher.phone)
  const [department, setDepartment] = useState(teacher.department)
  const [qualification, setQualification] = useState(teacher.qualification)
  const [status, setStatus] = useState<TeacherStatus>(teacher.status)
  const [saved, setSaved] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFocusRef = useRef<HTMLButtonElement>(null)

  // Trap focus inside modal and close on Escape
  useEffect(() => {
    const prev = document.activeElement as HTMLElement
    firstFocusRef.current?.focus()

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // In a real app this would call an API. We show a success state.
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1200)
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-teacher-modal-title"
      ref={dialogRef}
    >
      {/* Backdrop click closes modal */}
      <button
        className="modal-backdrop__close"
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="modal-panel card">
        {/* Modal header */}
        <div className="modal-panel__header">
          <div>
            <span className="section-kicker">Staff Management</span>
            <h3 id="edit-teacher-modal-title" className="modal-panel__title">
              Edit Teacher Profile
            </h3>
          </div>
          <button
            className="modal-panel__close-btn"
            type="button"
            aria-label="Close edit modal"
            onClick={onClose}
            ref={firstFocusRef}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSave} id="edit-teacher-form" noValidate>
          <div className="modal-form__grid">
            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-name">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                className="input"
                id="edit-teacher-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-status">
                Status <span aria-hidden="true">*</span>
              </label>
              <select
                className="input"
                id="edit-teacher-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TeacherStatus)}
                required
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-email">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                className="input"
                id="edit-teacher-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-phone">
                Phone
              </label>
              <input
                className="input"
                id="edit-teacher-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-department">
                Department <span aria-hidden="true">*</span>
              </label>
              <input
                className="input"
                id="edit-teacher-department"
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label className="label" htmlFor="edit-teacher-qualification">
                Qualification
              </label>
              <input
                className="input"
                id="edit-teacher-qualification"
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-form__footer">
            {saved && (
              <span className="form-success" role="status" aria-live="polite">
                ✓ Changes saved successfully
              </span>
            )}
            <div className="modal-form__actions">
              <button
                className="button button--secondary"
                type="button"
                onClick={onClose}
                id="edit-teacher-cancel-btn"
              >
                Cancel
              </button>
              <button
                className="button button--primary"
                type="submit"
                form="edit-teacher-form"
                id="edit-teacher-save-btn"
                disabled={saved}
              >
                {saved ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
