// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  classId: string // References SchoolClass.id
  dueDate: string // YYYY-MM-DD
  priority: 'Low' | 'Medium' | 'High'
  attachmentName: string | null
  createdAt: string
}

// ─── Create-assignment form payload ────────────────────────────────────────────

export interface CreateAssignmentPayload {
  title: string
  description: string
  subject: string
  classId: string
  dueDate: string
  priority: 'Low' | 'Medium' | 'High'
  attachmentName: string | null
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

export const subjects: string[] = [
  'Mathematics',
  'Science',
  'English',
  'Chemistry',
  'Physics',
  'Biology',
  'Social Studies',
  'Hindi',
  'Computer Science',
  'Physical Education',
]

/** In-memory store of assignments (simulates a database table). */
export const assignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'Algebra Worksheet 1',
    description: 'Solve problems 1 to 15 on page 42 of the textbook. Show all workings clearly.',
    subject: 'Mathematics',
    classId: 'class-001', // Grade 7 – Section A
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    priority: 'Medium',
    attachmentName: 'algebra_worksheet_1.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'assignment-2',
    title: 'Photosynthesis Lab Report',
    description: 'Write a detailed report on the photosynthesis experiment we conducted in class yesterday.',
    subject: 'Science',
    classId: 'class-001', // Grade 7 – Section A
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
    priority: 'High',
    attachmentName: null,
    createdAt: new Date().toISOString(),
  },
]

// ─── Simulated API ─────────────────────────────────────────────────────────────

/**
 * Simulates an async assignment-creation API call.
 * Returns the newly created assignment on success, or throws with a message on failure.
 */
export async function createAssignment(payload: CreateAssignmentPayload): Promise<Assignment> {
  // Simulate network latency
  await new Promise<void>((resolve) => setTimeout(resolve, 800))

  // Validate title is unique for the class to simulate business logic constraint
  const duplicate = assignments.find(
    (a) => a.classId === payload.classId && a.title.trim().toLowerCase() === payload.title.trim().toLowerCase()
  )
  if (duplicate) {
    throw new Error('An assignment with this title already exists for the selected class.')
  }

  const newAssignment: Assignment = {
    id: `assignment-${Date.now()}`,
    ...payload,
    title: payload.title.trim(),
    description: payload.description.trim(),
    createdAt: new Date().toISOString(),
  }

  // Persist to the in-memory store
  assignments.push(newAssignment)

  return newAssignment
}
