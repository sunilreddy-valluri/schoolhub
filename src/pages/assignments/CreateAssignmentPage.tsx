import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, CheckCircle, Upload, X, Paperclip } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Select } from '../../components/ui/Select'
import { Spinner } from '../../components/ui/Spinner'
import { classes } from '../../data/classData'
import { subjects, createAssignment, type Assignment } from '../../data/assignmentData'

// ─── Form state types ──────────────────────────────────────────────────────────

interface FormValues {
  title: string
  description: string
  subject: string
  classId: string
  dueDate: string
  priority: 'Low' | 'Medium' | 'High'
  attachmentName: string | null
}

interface FormErrors {
  title?: string
  description?: string
  subject?: string
  classId?: string
  dueDate?: string
  priority?: string
}

const EMPTY_FORM: FormValues = {
  title: '',
  description: '',
  subject: '',
  classId: '',
  dueDate: '',
  priority: 'Medium',
  attachmentName: null,
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Assignment title is required.'
  } else if (values.title.trim().length > 100) {
    errors.title = 'Assignment title must be 100 characters or fewer.'
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required.'
  } else if (values.description.trim().length > 1000) {
    errors.description = 'Description must be 1000 characters or fewer.'
  }

  if (!values.subject) {
    errors.subject = 'Subject is required.'
  }

  if (!values.classId) {
    errors.classId = 'Class is required.'
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required.'
  } else {
    // Validate that the due date is not in the past (today or future)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const [year, month, day] = values.dueDate.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    
    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past.'
    }
  }

  if (!values.priority) {
    errors.priority = 'Priority is required.'
  }

  return errors
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function CreateAssignmentPage() {
  const navigate = useNavigate()

  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [createdAssignment, setCreatedAssignment] = useState<Assignment | null>(null)

  // ── Field helpers ────────────────────────────────────────────────────────────

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear error for this field as it is modified
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key as keyof FormErrors]: undefined }))
    }
  }

  function handleFile(file: File) {
    // Limit to 10MB just as a visual/functional helper
    if (file.size > 10 * 1024 * 1024) {
      setApiError('File size exceeds the 10MB limit.')
      return
    }
    setApiError(null)
    setField('attachmentName', file.name)
  }

  function removeAttachment() {
    setField('attachmentName', null)
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setApiError(null)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const newAssignment = await createAssignment({
        title: values.title.trim(),
        description: values.description.trim(),
        subject: values.subject,
        classId: values.classId,
        dueDate: values.dueDate,
        priority: values.priority,
        attachmentName: values.attachmentName,
      })
      setCreatedAssignment(newAssignment)
      // Redirect after 2 seconds to view the new assignment
      setTimeout(() => navigate('/dashboard#assignments'), 2000)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to create assignment. Please try again.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <span className="section-kicker">Academic Work</span>
          <h1 className="admin-page-title">Create Assignment</h1>
          <p className="admin-page-subtitle">
            Provide the details, class, and due date to post a new assignment for students.
          </p>
        </div>
      </div>

      {/* Success banner */}
      {createdAssignment ? (
        <div className="alert alert--success" role="status" aria-live="polite">
          <CheckCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Assignment created successfully</strong>
            <p>"{createdAssignment.title}" has been successfully assigned.</p>
          </div>
        </div>
      ) : null}

      {/* Error banner */}
      {apiError ? (
        <div
          className="alert alert--error"
          role="alert"
          aria-live="assertive"
          style={{ marginBottom: '24px' }}
        >
          <AlertCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Unable to save assignment</strong>
            <p>{apiError}</p>
          </div>
        </div>
      ) : null}

      {/* Form card */}
      {!createdAssignment ? (
        <Card className="create-class-card">
          <form
            className="create-class-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Create assignment form"
          >
            {/* Assignment Title */}
            <div className="field-group">
              <Label htmlFor="title" required>Assignment Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Science Project - Phase 1"
                value={values.title}
                onChange={(e) => setField('title', e.target.value)}
                hasError={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
                aria-required="true"
                disabled={isSubmitting}
                maxLength={100}
              />
              {errors.title ? (
                <p className="field-error" id="title-error" role="alert">
                  {errors.title}
                </p>
              ) : null}
            </div>

            {/* Description */}
            <div className="field-group">
              <Label htmlFor="description" required>Description</Label>
              <textarea
                id="description"
                name="description"
                className={`input${errors.description ? ' input--error' : ''}`}
                style={{
                  height: '120px',
                  padding: '12px 14px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
                placeholder="Write detailed instructions for the assignment..."
                value={values.description}
                onChange={(e) => setField('description', e.target.value)}
                aria-describedby={errors.description ? 'description-error' : undefined}
                aria-required="true"
                disabled={isSubmitting}
                maxLength={1000}
              />
              {errors.description ? (
                <p className="field-error" id="description-error" role="alert">
                  {errors.description}
                </p>
              ) : null}
            </div>

            {/* Row 1 – Subject + Class */}
            <div className="create-class-form__row">
              {/* Subject */}
              <div className="field-group">
                <Label htmlFor="subject" required>Subject</Label>
                <Select
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={(e) => setField('subject', e.target.value)}
                  hasError={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </Select>
                {errors.subject ? (
                  <p className="field-error" id="subject-error" role="alert">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              {/* Class */}
              <div className="field-group">
                <Label htmlFor="classId" required>Class</Label>
                <Select
                  id="classId"
                  name="classId"
                  value={values.classId}
                  onChange={(e) => setField('classId', e.target.value)}
                  hasError={Boolean(errors.classId)}
                  aria-describedby={errors.classId ? 'classId-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.displayName}
                    </option>
                  ))}
                </Select>
                {errors.classId ? (
                  <p className="field-error" id="classId-error" role="alert">
                    {errors.classId}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Row 2 – Due Date + Priority */}
            <div className="create-class-form__row">
              {/* Due Date */}
              <div className="field-group">
                <Label htmlFor="dueDate" required>Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={values.dueDate}
                  onChange={(e) => setField('dueDate', e.target.value)}
                  hasError={Boolean(errors.dueDate)}
                  aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                />
                {errors.dueDate ? (
                  <p className="field-error" id="dueDate-error" role="alert">
                    {errors.dueDate}
                  </p>
                ) : null}
              </div>

              {/* Priority */}
              <div className="field-group">
                <Label htmlFor="priority" required>Priority</Label>
                <Select
                  id="priority"
                  name="priority"
                  value={values.priority}
                  onChange={(e) => setField('priority', e.target.value as FormValues['priority'])}
                  hasError={Boolean(errors.priority)}
                  aria-describedby={errors.priority ? 'priority-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
                {errors.priority ? (
                  <p className="field-error" id="priority-error" role="alert">
                    {errors.priority}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Attachment Area (Optional) */}
            <div className="field-group">
              <Label htmlFor="attachment">Attachment (Optional)</Label>
              {values.attachmentName ? (
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <Paperclip size={16} />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>
                      {values.attachmentName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    style={{
                      border: 0,
                      background: 'transparent',
                      color: 'var(--color-text-muted)',
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer',
                    }}
                    aria-label="Remove attachment"
                    disabled={isSubmitting}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    border: '2px dashed var(--color-border)',
                    borderRadius: 'var(--radius-default)',
                    padding: '24px',
                    textAlign: 'center',
                    background: 'var(--color-surface)',
                    cursor: 'pointer',
                    transition: 'border-color 150ms ease, background-color 150ms ease',
                  }}
                  onClick={() => document.getElementById('attachment')?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (isSubmitting) return
                    const files = e.dataTransfer.files
                    if (files && files.length > 0) {
                      handleFile(files[0])
                    }
                  }}
                >
                  <input
                    id="attachment"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files.length > 0) {
                        handleFile(files[0])
                      }
                    }}
                    disabled={isSubmitting}
                  />
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      gap: '8px',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <Upload size={24} style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>
                        Click to upload
                      </strong>
                      <span style={{ fontSize: '14px' }}> or drag and drop</span>
                    </div>
                    <span style={{ fontSize: '12px' }}>
                      PDF, DOCX, PNG, or JPG (max 10MB)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="create-class-form__actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard#assignments')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner label="Creating assignment" />
                    Creating…
                  </>
                ) : (
                  'Create Assignment'
                )}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}
    </DashboardLayout>
  )
}
