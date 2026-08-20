export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface Guardian {
  name: string
  relationship: string
  phone: string
  email: string
}

export interface AttendanceSummary {
  totalDays: number
  present: number
  absent: number
  late: number
  percentage: number
}

export interface SubjectGrade {
  subject: string
  grade: string
  score: number
  maxScore: number
}

export interface AcademicSummary {
  gpa: string
  rank: number
  totalStudents: number
  subjects: SubjectGrade[]
}

export interface Student {
  id: string
  name: string
  studentId: string
  grade: string
  className: string
  avatarInitials: string
  enrollmentDate: string
  dateOfBirth: string
  gender: string
  contact: ContactInfo
  guardians: Guardian[]
  attendance: AttendanceSummary
  academics: AcademicSummary
  status: 'active' | 'inactive' | 'suspended'
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Aarav Kumar',
    studentId: 'STU-2024-0042',
    grade: 'Grade 8',
    className: 'Section A',
    avatarInitials: 'AK',
    enrollmentDate: '2021-06-14',
    dateOfBirth: '2011-03-22',
    gender: 'Male',
    status: 'active',
    contact: {
      email: 'aarav.kumar@student.schoolhub.in',
      phone: '+91 98765 43210',
      address: '12, MG Road, Koramangala, Bengaluru – 560034',
    },
    guardians: [
      {
        name: 'Ramesh Kumar',
        relationship: 'Father',
        phone: '+91 98765 43210',
        email: 'ramesh.kumar@email.com',
      },
      {
        name: 'Sunita Kumar',
        relationship: 'Mother',
        phone: '+91 98123 45678',
        email: 'sunita.kumar@email.com',
      },
    ],
    attendance: {
      totalDays: 220,
      present: 204,
      absent: 10,
      late: 6,
      percentage: 92.7,
    },
    academics: {
      gpa: '8.6',
      rank: 7,
      totalStudents: 42,
      subjects: [
        { subject: 'Mathematics', grade: 'A', score: 88, maxScore: 100 },
        { subject: 'Science', grade: 'A+', score: 94, maxScore: 100 },
        { subject: 'English', grade: 'B+', score: 82, maxScore: 100 },
        { subject: 'Social Studies', grade: 'A', score: 87, maxScore: 100 },
        { subject: 'Hindi', grade: 'B', score: 76, maxScore: 100 },
        { subject: 'Computer Science', grade: 'A+', score: 96, maxScore: 100 },
      ],
    },
  },
  {
    id: '2',
    name: 'Priya Sharma',
    studentId: 'STU-2024-0078',
    grade: 'Grade 10',
    className: 'Section B',
    avatarInitials: 'PS',
    enrollmentDate: '2019-06-10',
    dateOfBirth: '2009-08-05',
    gender: 'Female',
    status: 'active',
    contact: {
      email: 'priya.sharma@student.schoolhub.in',
      phone: '+91 99887 76655',
      address: '45, Jayanagar 4th Block, Bengaluru – 560041',
    },
    guardians: [
      {
        name: 'Vijay Sharma',
        relationship: 'Father',
        phone: '+91 99887 76655',
        email: 'vijay.sharma@email.com',
      },
    ],
    attendance: {
      totalDays: 220,
      present: 215,
      absent: 3,
      late: 2,
      percentage: 97.7,
    },
    academics: {
      gpa: '9.4',
      rank: 2,
      totalStudents: 45,
      subjects: [
        { subject: 'Mathematics', grade: 'A+', score: 97, maxScore: 100 },
        { subject: 'Science', grade: 'A+', score: 95, maxScore: 100 },
        { subject: 'English', grade: 'A', score: 91, maxScore: 100 },
        { subject: 'Social Studies', grade: 'A', score: 89, maxScore: 100 },
        { subject: 'Hindi', grade: 'A+', score: 93, maxScore: 100 },
      ],
    },
  },
]

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id)
}
