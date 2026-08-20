import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Select } from '../../components/ui/Select'
import { Spinner } from '../../components/ui/Spinner'
import {
  grades,
  sections,
  teachers,
  academicYears,
  createClass,
  type SchoolClass,
} from '../../data/classData'

// ─── Form state types ──────────────────────────────────────────────────────────

interface FormValues {
  gradeId: string
  sectionId: string
  classTeacherId: string
  roomNumber: string
  academicYearId: string
  maximumStudents: string
}

interface FormErrors {
  gradeId?: string
  sectionId?: string
  classTeacherId?: string
  roomNumber?: string
  academicYearId?: string
  maximumStudents?: string
}

const EMPTY_FORM: FormValues = {
  gradeId: '',
  sectionId: '',
  classTeacherId: '',
  roomNumber: '',
  academicYearId: '',
  maximumStudents: '',
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.gradeId) {
    errors.gradeId = 'Grade is required.'
  }

  if (!values.sectionId) {
    errors.sectionId = 'Section is required.'
  }

  if (!values.classTeacherId) {
    errors.classTeacherId = 'Class teacher is required.'
  }

  // roomNumber is optional — no required error, but cap length for safety
  if (values.roomNumber && values.roomNumber.trim().length > 20) {
    errors.roomNumber = 'Room number must be 20 characters or fewer.'
  }

  if (!values.academicYearId) {
    errors.academicYearId = 'Academic year is required.'
  }

  if (!values.maximumStudents.trim()) {
    errors.maximumStudents = 'Maximum students is required.'
  } else {
    const num = Number(values.maximumStudents)
    if (!Number.isInteger(num) || isNaN(num)) {
      errors.maximumStudents = 'Maximum students must be a whole number.'
    } else if (num <= 0) {
      errors.maximumStudents = 'Maximum students must be greater than 0.'
    } else if (num > 200) {
      errors.maximumStudents = 'Maximum students cannot exceed 200.'
    }
  }

  return errors
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function CreateClassPage() {
  const navigate = useNavigate()

  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [createdClass, setCreatedClass] = useState<SchoolClass | null>(null)

  // ── Field helpers ────────────────────────────────────────────────────────────

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear the error for this field as the user edits it
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
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
      const newClass = await createClass({
        gradeId: values.gradeId,
        sectionId: values.sectionId,
        classTeacherId: values.classTeacherId,
        roomNumber: values.roomNumber.trim(),
        academicYearId: values.academicYearId,
        maximumStudents: Number(values.maximumStudents),
      })
      setCreatedClass(newClass)
      // Brief pause so the user sees the success banner, then navigate back to the dashboard classes section
      setTimeout(() => navigate('/dashboard#classes'), 2000)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to create class. Please try again.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Derived display values ───────────────────────────────────────────────────

  const selectedGrade = grades.find((g) => g.id === values.gradeId)
  const selectedSection = sections.find((s) => s.id === values.sectionId)
  const currentAcademicYear = academicYears.find((a) => a.isCurrent)

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <span className="section-kicker">School management</span>
          <h1 className="admin-page-title">Create Class</h1>
          <p className="admin-page-subtitle">
            Set up a new class by assigning a grade, section, and teacher.
          </p>
        </div>
      </div>

      {/* Success banner */}
      {createdClass ? (
        <div className="alert alert--success" role="status" aria-live="polite">
          <CheckCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Class created successfully</strong>
            <p>{createdClass.displayName} has been created successfully.</p>
          </div>
        </div>
      ) : null}

      {/* API error banner */}
      {apiError ? (
        <div className="alert alert--error" role="alert" aria-live="assertive" style={{ marginBottom: '24px' }}>
          <AlertCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Unable to create class</strong>
            <p>{apiError}</p>
          </div>
        </div>
      ) : null}

      {/* Form card */}
      {!createdClass ? (
        <Card className="create-class-card">
          <form
            className="create-class-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Create class form"
          >
            {/* Row 1 – Grade + Section */}
            <div className="create-class-form__row">
              {/* Grade */}
              <div className="field-group">
                <Label htmlFor="gradeId" required>Grade</Label>
                <Select
                  id="gradeId"
                  name="gradeId"
                  value={values.gradeId}
                  onChange={(e) => setField('gradeId', e.target.value)}
                  hasError={Boolean(errors.gradeId)}
                  aria-describedby={errors.gradeId ? 'gradeId-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </Select>
                {errors.gradeId ? (
                  <p className="field-error" id="gradeId-error" role="alert">
                    {errors.gradeId}
                  </p>
                ) : null}
              </div>

              {/* Section */}
              <div className="field-group">
                <Label htmlFor="sectionId" required>Section</Label>
                <Select
                  id="sectionId"
                  name="sectionId"
                  value={values.sectionId}
                  onChange={(e) => setField('sectionId', e.target.value)}
                  hasError={Boolean(errors.sectionId)}
                  aria-describedby={errors.sectionId ? 'sectionId-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </Select>
                {errors.sectionId ? (
                  <p className="field-error" id="sectionId-error" role="alert">
                    {errors.sectionId}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Class Teacher – full width */}
            <div className="field-group">
              <Label htmlFor="classTeacherId" required>Class Teacher</Label>
              <Select
                id="classTeacherId"
                name="classTeacherId"
                value={values.classTeacherId}
                onChange={(e) => setField('classTeacherId', e.target.value)}
                hasError={Boolean(errors.classTeacherId)}
                aria-describedby={errors.classTeacherId ? 'classTeacherId-error' : undefined}
                aria-required="true"
                disabled={isSubmitting}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullName} — {teacher.subject}
                  </option>
                ))}
              </Select>
              {errors.classTeacherId ? (
                <p className="field-error" id="classTeacherId-error" role="alert">
                  {errors.classTeacherId}
                </p>
              ) : null}
            </div>

            {/* Row 2 – Room Number + Academic Year */}
            <div className="create-class-form__row">
              {/* Room Number */}
              <div className="field-group">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  type="text"
                  placeholder="e.g. 101"
                  value={values.roomNumber}
                  onChange={(e) => setField('roomNumber', e.target.value)}
                  hasError={Boolean(errors.roomNumber)}
                  aria-describedby={errors.roomNumber ? 'roomNumber-error' : undefined}
                  maxLength={20}
                  disabled={isSubmitting}
                />
                {errors.roomNumber ? (
                  <p className="field-error" id="roomNumber-error" role="alert">
                    {errors.roomNumber}
                  </p>
                ) : null}
              </div>

              {/* Academic Year */}
              <div className="field-group">
                <Label htmlFor="academicYearId" required>Academic Year</Label>
                <Select
                  id="academicYearId"
                  name="academicYearId"
                  value={values.academicYearId}
                  onChange={(e) => setField('academicYearId', e.target.value)}
                  hasError={Boolean(errors.academicYearId)}
                  aria-describedby={errors.academicYearId ? 'academicYearId-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.label}
                      {year.isCurrent ? ' (Current)' : ''}
                    </option>
                  ))}
                </Select>
                {errors.academicYearId ? (
                  <p className="field-error" id="academicYearId-error" role="alert">
                    {errors.academicYearId}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Maximum Students – half width on desktop */}
            <div className="create-class-form__row">
              <div className="field-group">
                <Label htmlFor="maximumStudents" required>Maximum Students</Label>
                <Input
                  id="maximumStudents"
                  name="maximumStudents"
                  type="number"
                  placeholder="e.g. 40"
                  min={1}
                  max={200}
                  value={values.maximumStudents}
                  onChange={(e) => setField('maximumStudents', e.target.value)}
                  hasError={Boolean(errors.maximumStudents)}
                  aria-describedby={errors.maximumStudents ? 'maximumStudents-error' : undefined}
                  aria-required="true"
                  disabled={isSubmitting}
                />
                {errors.maximumStudents ? (
                  <p className="field-error" id="maximumStudents-error" role="alert">
                    {errors.maximumStudents}
                  </p>
                ) : null}
              </div>
              {/* Intentionally empty second column to preserve half-width layout */}
              <div aria-hidden="true" />
            </div>

            {/* Actions */}
            <div className="create-class-form__actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard#classes')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner label="Saving class" />
                    Saving…
                  </>
                ) : (
                  'Save Class'
                )}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {/* Invisible context helper for screen readers about the pre-filled academic year */}
      {currentAcademicYear && !values.academicYearId ? (
        <p className="visually-hidden" aria-live="polite">
          Current academic year is {currentAcademicYear.label}.
        </p>
      ) : null}

      {/* Summary of what will be created (rendered once grade+section are chosen) */}
      {!createdClass && selectedGrade && selectedSection ? (
        <p style={{ marginTop: '16px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
          Creating: <strong style={{ color: 'var(--color-text-primary)' }}>
            {selectedGrade.name} – {selectedSection.name}
          </strong>
        </p>
      ) : null}
    </DashboardLayout>
  )
}
