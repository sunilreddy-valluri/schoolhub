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
  fullName: string
  subject: string
}

export interface AcademicYear {
  id: string
  label: string
  startDate: string
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
  /** Current number of enrolled students */
  studentCount: number
  displayName: string
  createdAt: string
}

export interface CreateClassPayload {
  gradeId: string
  sectionId: string
  classTeacherId: string
  roomNumber: string
  academicYearId: string
  maximumStudents: number
}

export interface UpdateClassPayload extends CreateClassPayload {}

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
  { id: 'teacher-3',  firstName: 'Anita',   lastName: 'Verma',  fullName: 'Anita Verma',   subject: 'English' },
  { id: 'teacher-6',  firstName: 'Arjun',   lastName: 'Pillai', fullName: 'Arjun Pillai',  subject: 'Physics' },
  { id: 'teacher-8',  firstName: 'Deepak',  lastName: 'Menon',  fullName: 'Deepak Menon',  subject: 'Biology' },
  { id: 'teacher-7',  firstName: 'Kavitha', lastName: 'Reddy',  fullName: 'Kavitha Reddy', subject: 'Chemistry' },
  { id: 'teacher-5',  firstName: 'Meena',   lastName: 'Iyer',   fullName: 'Meena Iyer',    subject: 'Hindi' },
  { id: 'teacher-1',  firstName: 'Priya',   lastName: 'Sharma', fullName: 'Priya Sharma',  subject: 'Mathematics' },
  { id: 'teacher-2',  firstName: 'Rajesh',  lastName: 'Kumar',  fullName: 'Rajesh Kumar',  subject: 'Science' },
  { id: 'teacher-9',  firstName: 'Sunita',  lastName: 'Joshi',  fullName: 'Sunita Joshi',  subject: 'Computer Science' },
  { id: 'teacher-4',  firstName: 'Suresh',  lastName: 'Nair',   fullName: 'Suresh Nair',   subject: 'Social Studies' },
  { id: 'teacher-10', firstName: 'Vikram',  lastName: 'Singh',  fullName: 'Vikram Singh',  subject: 'Physical Education' },
]

export const academicYears: AcademicYear[] = [
  { id: 'ay-2024-25', label: '2024-25', startDate: '2024-06-01', endDate: '2025-03-31', isCurrent: false },
  { id: 'ay-2025-26', label: '2025-26', startDate: '2025-06-01', endDate: '2026-03-31', isCurrent: false },
  { id: 'ay-2026-27', label: '2026-27', startDate: '2026-06-01', endDate: '2027-03-31', isCurrent: true  },
  { id: 'ay-2027-28', label: '2027-28', startDate: '2027-06-01', endDate: '2028-03-31', isCurrent: false },
]

export const classes: SchoolClass[] = [
  {
    id: 'class-001',
    gradeId: 'grade-7',
    sectionId: 'section-a',
    classTeacherId: 'teacher-1',
    roomNumber: '201',
    academicYearId: 'ay-2026-27',
    maximumStudents: 40,
    studentCount: 36,
    displayName: 'Grade 7 – Section A',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-002',
    gradeId: 'grade-7',
    sectionId: 'section-b',
    classTeacherId: 'teacher-2',
    roomNumber: '202',
    academicYearId: 'ay-2026-27',
    maximumStudents: 40,
    studentCount: 38,
    displayName: 'Grade 7 – Section B',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-003',
    gradeId: 'grade-8',
    sectionId: 'section-a',
    classTeacherId: 'teacher-3',
    roomNumber: '301',
    academicYearId: 'ay-2026-27',
    maximumStudents: 42,
    studentCount: 40,
    displayName: 'Grade 8 – Section A',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-004',
    gradeId: 'grade-8',
    sectionId: 'section-b',
    classTeacherId: 'teacher-4',
    roomNumber: '302',
    academicYearId: 'ay-2026-27',
    maximumStudents: 42,
    studentCount: 35,
    displayName: 'Grade 8 – Section B',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-005',
    gradeId: 'grade-9',
    sectionId: 'section-a',
    classTeacherId: 'teacher-5',
    roomNumber: '401',
    academicYearId: 'ay-2026-27',
    maximumStudents: 45,
    studentCount: 43,
    displayName: 'Grade 9 – Section A',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-006',
    gradeId: 'grade-9',
    sectionId: 'section-b',
    classTeacherId: 'teacher-6',
    roomNumber: '402',
    academicYearId: 'ay-2026-27',
    maximumStudents: 45,
    studentCount: 29,
    displayName: 'Grade 9 – Section B',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-007',
    gradeId: 'grade-10',
    sectionId: 'section-a',
    classTeacherId: 'teacher-7',
    roomNumber: '501',
    academicYearId: 'ay-2026-27',
    maximumStudents: 40,
    studentCount: 40,
    displayName: 'Grade 10 – Section A',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'class-008',
    gradeId: 'grade-10',
    sectionId: 'section-b',
    classTeacherId: 'teacher-8',
    roomNumber: '502',
    academicYearId: 'ay-2026-27',
    maximumStudents: 40,
    studentCount: 33,
    displayName: 'Grade 10 – Section B',
    createdAt: new Date().toISOString(),
  },
]

// ─── Simulated API ─────────────────────────────────────────────────────────────

function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fetch all classes (simulates GET /api/classes) */
export async function getClasses(): Promise<SchoolClass[]> {
  await delay()
  // Return a shallow copy so mutations don't silently affect callers
  return [...classes]
}

/** Fetch a single class by ID (simulates GET /api/classes/:id) */
export async function getClassById(id: string): Promise<SchoolClass> {
  await delay()
  const found = classes.find((c) => c.id === id)
  if (!found) throw new Error('Class not found.')
  return { ...found }
}

/** Create a new class (simulates POST /api/classes) */
export async function createClass(payload: CreateClassPayload): Promise<SchoolClass> {
  await delay(800)

  const duplicate = classes.find(
    (c) =>
      c.gradeId === payload.gradeId &&
      c.sectionId === payload.sectionId &&
      c.academicYearId === payload.academicYearId,
  )
  if (duplicate) {
    throw new Error('A class with this grade, section, and academic year already exists.')
  }

  const grade   = grades.find((g) => g.id === payload.gradeId)
  const section = sections.find((s) => s.id === payload.sectionId)

  const newClass: SchoolClass = {
    id: `class-${Date.now()}`,
    ...payload,
    studentCount: 0,
    displayName: `${grade?.name ?? 'Unknown'} – ${section?.name ?? 'Unknown'}`,
    createdAt: new Date().toISOString(),
  }

  classes.push(newClass)
  return { ...newClass }
}

/** Update an existing class (simulates PUT /api/classes/:id) */
export async function updateClass(id: string, payload: UpdateClassPayload): Promise<SchoolClass> {
  await delay(800)

  const index = classes.findIndex((c) => c.id === id)
  if (index === -1) throw new Error('Class not found.')

  // Duplicate check — exclude the current class itself
  const duplicate = classes.find(
    (c) =>
      c.id !== id &&
      c.gradeId === payload.gradeId &&
      c.sectionId === payload.sectionId &&
      c.academicYearId === payload.academicYearId,
  )
  if (duplicate) {
    throw new Error('A class with this grade, section, and academic year already exists.')
  }

  const grade   = grades.find((g) => g.id === payload.gradeId)
  const section = sections.find((s) => s.id === payload.sectionId)

  const updated: SchoolClass = {
    ...classes[index],
    ...payload,
    displayName: `${grade?.name ?? 'Unknown'} – ${section?.name ?? 'Unknown'}`,
  }

  classes[index] = updated
  return { ...updated }
}

/** Delete a class (simulates DELETE /api/classes/:id) */
export async function deleteClass(id: string): Promise<void> {
  await delay(600)
  const index = classes.findIndex((c) => c.id === id)
  if (index === -1) throw new Error('Class not found.')
  classes.splice(index, 1)
}
