import { useState, useEffect, type FormEvent } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Select } from '../ui/Select'
import { Spinner } from '../ui/Spinner'
import {
  grades,
  sections,
  teachers,
  academicYears,
  createClass,
  updateClass,
  type SchoolClass,
  type CreateClassPayload,
} from '../../data/classData'

// ─── Types ─────────────────────────────────────────────────────────────────────

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

function toFormValues(cls: SchoolClass): FormValues {
  return {
    gradeId: cls.gradeId,
    sectionId: cls.sectionId,
    classTeacherId: cls.classTeacherId,
    roomNumber: cls.roomNumber,
    academicYearId: cls.academicYearId,
    maximumStudents: String(cls.maximumStudents),
  }
}

// ─── Validation ────────────────────────────────────────────────────────────────

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.gradeId)
    errors.gradeId = 'Grade is required.'

  if (!values.sectionId)
    errors.sectionId = 'Section is required.'

  if (!values.classTeacherId)
    errors.classTeacherId = 'Class teacher is required.'

  if (values.roomNumber && values.roomNumber.trim().length > 20)
    errors.roomNumber = 'Room number must be 20 characters or fewer.'

  if (!values.academicYearId)
    errors.academicYearId = 'Academic year is required.'

  if (!values.maximumStudents.trim()) {
    errors.maximumStudents = 'Maximum students is required.'
  } else {
    const num = Number(values.maximumStudents)
    if (!Number.isInteger(num) || isNaN(num))
      errors.maximumStudents = 'Maximum students must be a whole number.'
    else if (num <= 0)
      errors.maximumStudents = 'Maximum students must be greater than 0.'
    else if (num > 200)
      errors.maximumStudents = 'Maximum students cannot exceed 200.'
  }

  return errors
}

// ─── Props ─────────────────────────────────────────────────────────────────────

interface ClassFormProps {
  mode: 'create' | 'edit'
  /** Required when mode === 'edit' */
  existingClass?: SchoolClass
  /** Called after a successful save with the resulting class */
  onSuccess: (cls: SchoolClass) => void
  /** Called when the user clicks Cancel */
  onCancel: () => void
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ClassForm({ mode, existingClass, onSuccess, onCancel }: ClassFormProps) {
  const isEdit = mode === 'edit'

  const [values, setValues] = useState<FormValues>(
    isEdit && existingClass ? toFormValues(existingClass) : EMPTY_FORM,
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [savedClass, setSavedClass] = useState<SchoolClass | null>(null)

  // If the existing class changes (e.g. parent re-fetches), re-sync form values
  useEffect(() => {
    if (isEdit && existingClass) {
      setValues(toFormValues(existingClass))
    }
  }, [isEdit, existingClass])

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setApiError(null)

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload: CreateClassPayload = {
      gradeId: values.gradeId,
      sectionId: values.sectionId,
      classTeacherId: values.classTeacherId,
      roomNumber: values.roomNumber.trim(),
      academicYearId: values.academicYearId,
      maximumStudents: Number(values.maximumStudents),
    }

    setIsSubmitting(true)
    try {
      const result = isEdit && existingClass
        ? await updateClass(existingClass.id, payload)
        : await createClass(payload)

      setSavedClass(result)
      // Let the parent handle navigation after a short delay for UX
      setTimeout(() => onSuccess(result), 1800)
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : `Unable to ${isEdit ? 'update' : 'create'} class. Please try again.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedGrade   = grades.find((g) => g.id === values.gradeId)
  const selectedSection = sections.find((s) => s.id === values.sectionId)

  return (
    <>
      {/* Success banner */}
      {savedClass ? (
        <div className="alert alert--success" role="status" aria-live="polite" style={{ marginBottom: '24px' }}>
          <CheckCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Class {isEdit ? 'updated' : 'created'} successfully</strong>
            <p>{savedClass.displayName} has been {isEdit ? 'updated' : 'created'} successfully.</p>
          </div>
        </div>
      ) : null}

      {/* API error banner */}
      {apiError ? (
        <div className="alert alert--error" role="alert" aria-live="assertive" style={{ marginBottom: '24px' }}>
          <AlertCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Unable to {isEdit ? 'update' : 'create'} class</strong>
            <p>{apiError}</p>
          </div>
        </div>
      ) : null}

      {/* Form card — hidden after success so the banner is the focus */}
      {!savedClass ? (
        <Card className="create-class-card">
          <form
            className="create-class-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label={isEdit ? 'Edit class form' : 'Create class form'}
          >
            {/* Row 1 – Grade + Section */}
            <div className="create-class-form__row">
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
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </Select>
                {errors.gradeId ? (
                  <p className="field-error" id="gradeId-error" role="alert">{errors.gradeId}</p>
                ) : null}
              </div>

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
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
                {errors.sectionId ? (
                  <p className="field-error" id="sectionId-error" role="alert">{errors.sectionId}</p>
                ) : null}
              </div>
            </div>

            {/* Class Teacher */}
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
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} — {t.subject}
                  </option>
                ))}
              </Select>
              {errors.classTeacherId ? (
                <p className="field-error" id="classTeacherId-error" role="alert">{errors.classTeacherId}</p>
              ) : null}
            </div>

            {/* Row 2 – Room + Academic Year */}
            <div className="create-class-form__row">
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
                  <p className="field-error" id="roomNumber-error" role="alert">{errors.roomNumber}</p>
                ) : null}
              </div>

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
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.label}{y.isCurrent ? ' (Current)' : ''}
                    </option>
                  ))}
                </Select>
                {errors.academicYearId ? (
                  <p className="field-error" id="academicYearId-error" role="alert">{errors.academicYearId}</p>
                ) : null}
              </div>
            </div>

            {/* Maximum Students – half width */}
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
                  <p className="field-error" id="maximumStudents-error" role="alert">{errors.maximumStudents}</p>
                ) : null}
              </div>
              <div aria-hidden="true" />
            </div>

            {/* Actions */}
            <div className="create-class-form__actions">
              <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Spinner label={isEdit ? 'Saving changes' : 'Saving class'} /> {isEdit ? 'Saving…' : 'Saving…'}</>
                ) : (
                  isEdit ? 'Save Changes' : 'Save Class'
                )}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {/* Live preview below form */}
      {!savedClass && selectedGrade && selectedSection ? (
        <p style={{ marginTop: '16px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
          {isEdit ? 'Editing' : 'Creating'}:{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {selectedGrade.name} – {selectedSection.name}
          </strong>
        </p>
      ) : null}
    </>
  )
}
