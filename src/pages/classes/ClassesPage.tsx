import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Search, Eye, Pencil, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Spinner } from '../../components/ui/Spinner'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { ConfirmDeleteModal } from '../../components/ui/Modal'
import {
  getClasses,
  deleteClass,
  grades,
  sections,
  teachers,
  academicYears,
  type SchoolClass,
} from '../../data/classData'

// ─── Resolver helpers ──────────────────────────────────────────────────────────

function getGradeName(id: string)    { return grades.find((g) => g.id === id)?.name ?? '—' }
function getSectionName(id: string)  { return sections.find((s) => s.id === id)?.name ?? '—' }
function getTeacherName(id: string)  { return teachers.find((t) => t.id === id)?.fullName ?? '—' }
function getYearLabel(id: string)    { return academicYears.find((a) => a.id === id)?.label ?? '—' }
function isCurrentYear(id: string)   { return academicYears.find((a) => a.id === id)?.isCurrent ?? false }

// ─── Component ─────────────────────────────────────────────────────────────────

export function ClassesPage() {
  const navigate = useNavigate()

  // ── Data state ───────────────────────────────────────────────────────────────
  const [allClasses, setAllClasses]     = useState<SchoolClass[]>([])
  const [isLoading, setIsLoading]       = useState(true)
  const [loadError, setLoadError]       = useState<string | null>(null)

  // ── Filter state ─────────────────────────────────────────────────────────────
  const [search, setSearch]       = useState('')
  const [gradeFilter, setGradeFilter] = useState('')

  // ── Delete state ─────────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget]   = useState<SchoolClass | null>(null)
  const [isDeleting, setIsDeleting]       = useState(false)
  const [deleteError, setDeleteError]     = useState<string | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null)

  // ── Load classes ─────────────────────────────────────────────────────────────
  const loadClasses = useCallback(async () => {
    setIsLoading(true)
    setLoadError(null)
    try {
      const data = await getClasses()
      setAllClasses(data)
    } catch {
      setLoadError('Unable to load classes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { loadClasses() }, [loadClasses])

  // ── Client-side filtering ────────────────────────────────────────────────────
  const filtered = allClasses.filter((cls) => {
    const q = search.trim().toLowerCase()

    if (gradeFilter && cls.gradeId !== gradeFilter) return false

    if (q) {
      const grade   = getGradeName(cls.gradeId).toLowerCase()
      const section = getSectionName(cls.sectionId).toLowerCase()
      const teacher = getTeacherName(cls.classTeacherId).toLowerCase()
      const room    = cls.roomNumber.toLowerCase()
      if (!grade.includes(q) && !section.includes(q) && !teacher.includes(q) && !room.includes(q)) {
        return false
      }
    }

    return true
  })

  // ── Delete handlers ──────────────────────────────────────────────────────────
  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteClass(deleteTarget.id)
      setDeleteSuccess(`${deleteTarget.displayName} has been deleted.`)
      setAllClasses((prev) => prev.filter((c) => c.id !== deleteTarget.id))
      setDeleteTarget(null)
      setTimeout(() => setDeleteSuccess(null), 4000)
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : 'Unable to delete class. Please try again.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const hasClasses   = allClasses.length > 0
  const hasResults   = filtered.length > 0
  const isFiltering  = search.trim() !== '' || gradeFilter !== ''

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="admin-page-header">
        <div className="admin-page-header__copy">
          <span className="section-kicker">School management</span>
          <h1 className="admin-page-title">Classes</h1>
          <p className="admin-page-subtitle">
            Manage all classes, sections, and assigned teachers.
          </p>
        </div>
        <Button onClick={() => navigate('/classes/new')}>+ Create Class</Button>
      </div>

      {/* Delete success banner */}
      {deleteSuccess ? (
        <div className="alert alert--success" role="status" aria-live="polite" style={{ marginBottom: '20px' }}>
          <CheckCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Class deleted</strong>
            <p>{deleteSuccess}</p>
          </div>
        </div>
      ) : null}

      {/* Delete error banner */}
      {deleteError ? (
        <div className="alert alert--error" role="alert" aria-live="assertive" style={{ marginBottom: '20px' }}>
          <AlertCircle className="alert__icon" size={18} aria-hidden="true" />
          <div>
            <strong>Unable to delete class</strong>
            <p>{deleteError}</p>
          </div>
        </div>
      ) : null}

      {/* Search + filter toolbar */}
      <div className="classes-toolbar">
        <div className="classes-toolbar__search">
          <Search className="classes-toolbar__search-icon" size={16} aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search classes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search classes"
            className="classes-toolbar__search-input"
          />
        </div>
        <div className="classes-toolbar__filter">
          <Select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            aria-label="Filter by grade"
          >
            <option value="">All Grades</option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <Card>
          <div className="classes-state-center">
            <Spinner label="Loading classes" />
            <p>Loading classes…</p>
          </div>
        </Card>
      ) : loadError ? (
        /* Error state */
        <Card>
          <div className="classes-state-center classes-state-center--error">
            <AlertCircle size={32} aria-hidden="true" />
            <p>{loadError}</p>
            <Button variant="secondary" onClick={loadClasses}>Retry</Button>
          </div>
        </Card>
      ) : !hasClasses ? (
        /* Empty state – no classes exist at all */
        <Card>
          <div className="classes-list-empty">
            <span className="classes-list-empty__icon" aria-hidden="true">
              <BookOpen size={26} />
            </span>
            <h3>No classes yet</h3>
            <p>Create your first class to organise students and teachers.</p>
            <Button onClick={() => navigate('/classes/new')}>+ Create Class</Button>
          </div>
        </Card>
      ) : !hasResults ? (
        /* Empty state – filters returned nothing */
        <Card>
          <div className="classes-list-empty">
            <span className="classes-list-empty__icon" aria-hidden="true">
              <Search size={26} />
            </span>
            <h3>No classes found</h3>
            <p>
              {isFiltering
                ? 'Try changing your search or grade filter.'
                : 'No classes match the current filter.'}
            </p>
            <Button
              variant="secondary"
              onClick={() => { setSearch(''); setGradeFilter('') }}
            >
              Clear filters
            </Button>
          </div>
        </Card>
      ) : (
        /* ── Table (desktop) / Cards (mobile) ── */
        <Card>
          {/* Desktop table */}
          <div className="classes-table-wrapper">
            <table className="classes-table" aria-label="Classes list">
              <thead>
                <tr>
                  <th scope="col">Grade</th>
                  <th scope="col">Section</th>
                  <th scope="col">Class Teacher</th>
                  <th scope="col">Students</th>
                  <th scope="col">Room</th>
                  <th scope="col">Academic Year</th>
                  <th scope="col"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cls) => (
                  <tr key={cls.id}>
                    <td className="classes-table__name">{getGradeName(cls.gradeId)}</td>
                    <td>{getSectionName(cls.sectionId)}</td>
                    <td className="classes-table__teacher">{getTeacherName(cls.classTeacherId)}</td>
                    <td>
                      <span className={cls.studentCount >= cls.maximumStudents ? 'student-count student-count--full' : 'student-count'}>
                        {cls.studentCount} / {cls.maximumStudents}
                      </span>
                    </td>
                    <td className="classes-table__room">
                      {cls.roomNumber || <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {getYearLabel(cls.academicYearId)}
                        {isCurrentYear(cls.academicYearId) ? (
                          <Badge tone="success">Current</Badge>
                        ) : null}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="table-action table-action--view"
                          type="button"
                          onClick={() => navigate(`/classes/${cls.id}`)}
                          aria-label={`View ${cls.displayName}`}
                          title="View"
                        >
                          <Eye size={15} aria-hidden="true" />
                          <span>View</span>
                        </button>
                        <button
                          className="table-action table-action--edit"
                          type="button"
                          onClick={() => navigate(`/classes/${cls.id}/edit`)}
                          aria-label={`Edit ${cls.displayName}`}
                          title="Edit"
                        >
                          <Pencil size={15} aria-hidden="true" />
                          <span>Edit</span>
                        </button>
                        <button
                          className="table-action table-action--delete"
                          type="button"
                          onClick={() => { setDeleteError(null); setDeleteTarget(cls) }}
                          aria-label={`Delete ${cls.displayName}`}
                          title="Delete"
                        >
                          <Trash2 size={15} aria-hidden="true" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="class-cards" aria-label="Classes list">
            {filtered.map((cls) => (
              <div className="class-card" key={cls.id}>
                <div className="class-card__header">
                  <span className="class-card__title">{cls.displayName}</span>
                  {isCurrentYear(cls.academicYearId) ? (
                    <Badge tone="success">Current</Badge>
                  ) : null}
                </div>
                <dl className="class-card__meta">
                  <div className="class-card__meta-row">
                    <dt>Teacher</dt>
                    <dd>{getTeacherName(cls.classTeacherId)}</dd>
                  </div>
                  <div className="class-card__meta-row">
                    <dt>Students</dt>
                    <dd>
                      <span className={cls.studentCount >= cls.maximumStudents ? 'student-count student-count--full' : 'student-count'}>
                        {cls.studentCount} / {cls.maximumStudents}
                      </span>
                    </dd>
                  </div>
                  <div className="class-card__meta-row">
                    <dt>Room</dt>
                    <dd>{cls.roomNumber || '—'}</dd>
                  </div>
                  <div className="class-card__meta-row">
                    <dt>Year</dt>
                    <dd>{getYearLabel(cls.academicYearId)}</dd>
                  </div>
                </dl>
                <div className="class-card__actions">
                  <Button variant="secondary" onClick={() => navigate(`/classes/${cls.id}`)}>
                    <Eye size={14} aria-hidden="true" /> View
                  </Button>
                  <Button variant="secondary" onClick={() => navigate(`/classes/${cls.id}/edit`)}>
                    <Pencil size={14} aria-hidden="true" /> Edit
                  </Button>
                  <Button variant="danger" onClick={() => { setDeleteError(null); setDeleteTarget(cls) }}>
                    <Trash2 size={14} aria-hidden="true" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Delete confirmation modal */}
      <ConfirmDeleteModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Class?"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.displayName}? This action cannot be undone.`
            : undefined
        }
      />
    </DashboardLayout>
  )
}
