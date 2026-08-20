// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Grade {
  id: string
  name: string
  /** Numeric order used for sorting (e.g. 1 for Grade 1, 12 for Grade 12) */
  order: number
}

export interface Section {
  id: string
  name: string
}

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  /** Convenience getter used in dropdowns */
  fullName: string
  subject: string
}

export interface AcademicYear {
  id: string
  /** Human-readable label, e.g. "2025-26" */
  label: string
  /** ISO date string for the start of the academic year */
  startDate: string
  /** ISO date string for the end of the academic year */
  endDate: string
  isCurrent: boolean
}

export interface SchoolClass {
  id: string
  gradeId: string
  sectionId: string
  classTeacherId: string
  roomNumber: string
  academicYearId: string
  maximumStudents: number
  /** Derived display label, e.g. "Grade 8 – Section A" */
  displayName: string
  createdAt: string
}

// ─── Create-class form payload ─────────────────────────────────────────────────

export interface CreateClassPayload {
  gradeId: string
  sectionId: string
  classTeacherId: string
  roomNumber: string
  academicYearId: string
  maximumStudents: number
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

export const grades: Grade[] = [
  { id: 'grade-1',  name: 'Grade 1',  order: 1  },
  { id: 'grade-2',  name: 'Grade 2',  order: 2  },
  { id: 'grade-3',  name: 'Grade 3',  order: 3  },
  { id: 'grade-4',  name: 'Grade 4',  order: 4  },
  { id: 'grade-5',  name: 'Grade 5',  order: 5  },
  { id: 'grade-6',  name: 'Grade 6',  order: 6  },
  { id: 'grade-7',  name: 'Grade 7',  order: 7  },
  { id: 'grade-8',  name: 'Grade 8',  order: 8  },
  { id: 'grade-9',  name: 'Grade 9',  order: 9  },
  { id: 'grade-10', name: 'Grade 10', order: 10 },
  { id: 'grade-11', name: 'Grade 11', order: 11 },
  { id: 'grade-12', name: 'Grade 12', order: 12 },
]

export const sections: Section[] = [
  { id: 'section-a', name: 'Section A' },
  { id: 'section-b', name: 'Section B' },
  { id: 'section-c', name: 'Section C' },
  { id: 'section-d', name: 'Section D' },
  { id: 'section-e', name: 'Section E' },
]

export const teachers: Teacher[] = [
  { id: 'teacher-1',  firstName: 'Priya',    lastName: 'Sharma',    fullName: 'Priya Sharma',    subject: 'Mathematics' },
  { id: 'teacher-2',  firstName: 'Rajesh',   lastName: 'Kumar',     fullName: 'Rajesh Kumar',    subject: 'Science' },
  { id: 'teacher-3',  firstName: 'Anita',    lastName: 'Verma',     fullName: 'Anita Verma',     subject: 'English' },
  { id: 'teacher-4',  firstName: 'Suresh',   lastName: 'Nair',      fullName: 'Suresh Nair',     subject: 'Social Studies' },
  { id: 'teacher-5',  firstName: 'Meena',    lastName: 'Iyer',      fullName: 'Meena Iyer',      subject: 'Hindi' },
  { id: 'teacher-6',  firstName: 'Arjun',    lastName: 'Pillai',    fullName: 'Arjun Pillai',    subject: 'Physics' },
  { id: 'teacher-7',  firstName: 'Kavitha',  lastName: 'Reddy',     fullName: 'Kavitha Reddy',   subject: 'Chemistry' },
  { id: 'teacher-8',  firstName: 'Deepak',   lastName: 'Menon',     fullName: 'Deepak Menon',    subject: 'Biology' },
  { id: 'teacher-9',  firstName: 'Sunita',   lastName: 'Joshi',     fullName: 'Sunita Joshi',    subject: 'Computer Science' },
  { id: 'teacher-10', firstName: 'Vikram',   lastName: 'Singh',     fullName: 'Vikram Singh',    subject: 'Physical Education' },
]

export const academicYears: AcademicYear[] = [
  { id: 'ay-2024-25', label: '2024-25', startDate: '2024-06-01', endDate: '2025-03-31', isCurrent: false },
  { id: 'ay-2025-26', label: '2025-26', startDate: '2025-06-01', endDate: '2026-03-31', isCurrent: false },
  { id: 'ay-2026-27', label: '2026-27', startDate: '2026-06-01', endDate: '2027-03-31', isCurrent: true  },
  { id: 'ay-2027-28', label: '2027-28', startDate: '2027-06-01', endDate: '2028-03-31', isCurrent: false },
]

/** In-memory store of created classes (simulates a database table). */
export const classes: SchoolClass[] = [
  {
    id: 'class-001',
    gradeId: 'grade-7',
    sectionId: 'section-a',
    classTeacherId: 'teacher-1',
    roomNumber: '201',
    academicYearId: 'ay-2026-27',
    maximumStudents: 40,
    displayName: 'Grade 7 – Section A',
    createdAt: new Date().toISOString(),
  },
]

// ─── Simulated API ─────────────────────────────────────────────────────────────

/**
 * Simulates an async class-creation API call.
 * Returns the newly created class on success, or throws with a message on failure.
 *
 * When a real backend is wired up, replace this function body with an actual
 * fetch/axios call and keep the signature unchanged.
 */
export async function createClass(payload: CreateClassPayload): Promise<SchoolClass> {
  // Simulate network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 800))

  // Duplicate check: same grade + section + academic year
  const duplicate = classes.find(
    (c) =>
      c.gradeId === payload.gradeId &&
      c.sectionId === payload.sectionId &&
      c.academicYearId === payload.academicYearId,
  )
  if (duplicate) {
    throw new Error(
      'A class with this grade, section, and academic year already exists.',
    )
  }

  const grade       = grades.find((g) => g.id === payload.gradeId)
  const section     = sections.find((s) => s.id === payload.sectionId)
  const academicYear = academicYears.find((a) => a.id === payload.academicYearId)

  const newClass: SchoolClass = {
    id: `class-${Date.now()}`,
    ...payload,
    displayName: `${grade?.name ?? 'Unknown'} – ${section?.name ?? 'Unknown'}`,
    createdAt: new Date().toISOString(),
  }

  // Persist to the in-memory store
  classes.push(newClass)

  // Unused variable kept to avoid TS warning; academicYear used for future display
  void academicYear

  return newClass
}
