export type TeacherStatus = 'active' | 'on-leave' | 'inactive'

export interface TeacherSubject {
  name: string
  classes: string[]
}

export interface Teacher {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  department: string
  subjects: TeacherSubject[]
  classes: string[]
  joinDate: string
  status: TeacherStatus
  qualification: string
  experience: number
  studentsCount: number
  classesCount: number
  attendanceRate: number
}

export const teachers: Teacher[] = [
  {
    id: 'T001',
    name: 'Priya Sharma',
    initials: 'PS',
    email: 'priya.sharma@schoolhub.edu',
    phone: '+91 98765 43210',
    department: 'Science',
    subjects: [
      { name: 'Physics', classes: ['Grade 10-A', 'Grade 11-B', 'Grade 12-A'] },
      { name: 'Chemistry', classes: ['Grade 9-A', 'Grade 10-B'] },
    ],
    classes: ['Grade 10-A', 'Grade 11-B', 'Grade 12-A', 'Grade 9-A', 'Grade 10-B'],
    joinDate: '2019-06-15',
    status: 'active',
    qualification: 'M.Sc. Physics, B.Ed.',
    experience: 7,
    studentsCount: 148,
    classesCount: 5,
    attendanceRate: 97.2,
  },
  {
    id: 'T002',
    name: 'Rajan Mehta',
    initials: 'RM',
    email: 'rajan.mehta@schoolhub.edu',
    phone: '+91 87654 32109',
    department: 'Mathematics',
    subjects: [
      { name: 'Mathematics', classes: ['Grade 9-A', 'Grade 9-B', 'Grade 10-A'] },
      { name: 'Statistics', classes: ['Grade 11-A', 'Grade 12-A'] },
    ],
    classes: ['Grade 9-A', 'Grade 9-B', 'Grade 10-A', 'Grade 11-A', 'Grade 12-A'],
    joinDate: '2016-07-01',
    status: 'active',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: 10,
    studentsCount: 162,
    classesCount: 5,
    attendanceRate: 98.8,
  },
  {
    id: 'T003',
    name: 'Anita Desai',
    initials: 'AD',
    email: 'anita.desai@schoolhub.edu',
    phone: '+91 76543 21098',
    department: 'English',
    subjects: [
      { name: 'English Literature', classes: ['Grade 8-A', 'Grade 9-A', 'Grade 10-A'] },
      { name: 'English Grammar', classes: ['Grade 7-A', 'Grade 7-B'] },
    ],
    classes: ['Grade 7-A', 'Grade 7-B', 'Grade 8-A', 'Grade 9-A', 'Grade 10-A'],
    joinDate: '2021-03-10',
    status: 'active',
    qualification: 'M.A. English, B.Ed.',
    experience: 5,
    studentsCount: 134,
    classesCount: 5,
    attendanceRate: 95.5,
  },
  {
    id: 'T004',
    name: 'Vikram Nair',
    initials: 'VN',
    email: 'vikram.nair@schoolhub.edu',
    phone: '+91 65432 10987',
    department: 'History & Social Science',
    subjects: [
      { name: 'History', classes: ['Grade 8-B', 'Grade 9-B', 'Grade 10-B'] },
      { name: 'Civics', classes: ['Grade 8-A', 'Grade 9-A'] },
    ],
    classes: ['Grade 8-A', 'Grade 8-B', 'Grade 9-A', 'Grade 9-B', 'Grade 10-B'],
    joinDate: '2022-06-01',
    status: 'on-leave',
    qualification: 'M.A. History, B.Ed.',
    experience: 4,
    studentsCount: 120,
    classesCount: 5,
    attendanceRate: 91.0,
  },
  {
    id: 'T005',
    name: 'Kavita Rao',
    initials: 'KR',
    email: 'kavita.rao@schoolhub.edu',
    phone: '+91 54321 09876',
    department: 'Computer Science',
    subjects: [
      { name: 'Computer Science', classes: ['Grade 10-A', 'Grade 11-A', 'Grade 12-A'] },
      { name: 'Information Technology', classes: ['Grade 9-A', 'Grade 9-B'] },
    ],
    classes: ['Grade 9-A', 'Grade 9-B', 'Grade 10-A', 'Grade 11-A', 'Grade 12-A'],
    joinDate: '2020-08-15',
    status: 'active',
    qualification: 'M.Tech. CS, B.Ed.',
    experience: 6,
    studentsCount: 145,
    classesCount: 5,
    attendanceRate: 96.8,
  },
  {
    id: 'T006',
    name: 'Suresh Pillai',
    initials: 'SP',
    email: 'suresh.pillai@schoolhub.edu',
    phone: '+91 43210 98765',
    department: 'Physical Education',
    subjects: [
      { name: 'Physical Education', classes: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'] },
    ],
    classes: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'],
    joinDate: '2018-04-20',
    status: 'inactive',
    qualification: 'M.P.Ed.',
    experience: 8,
    studentsCount: 210,
    classesCount: 5,
    attendanceRate: 89.5,
  },
]
