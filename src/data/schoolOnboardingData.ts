export interface SchoolBasicDetails {
  // Identity
  schoolName: string
  schoolCode: string
  affiliationBoard: string
  affiliationNumber: string
  establishedYear: string
  schoolType: string
  motto: string
  accreditation: string
  campusSize: string

  // Contact & Location
  officialEmail: string
  supportEmail: string
  primaryPhone: string
  secondaryPhone: string
  website: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string

  // Academic & Operational
  academicYear: string
  academicSessionDates: string
  workingDays: string
  schoolHours: string
  gradeRange: string
  gradingScale: string
  studentCapacity: number
  currentEnrollment: number

  // Administration & Leadership
  principalName: string
  principalEmail: string
  vicePrincipalName: string
  adminContactName: string
  adminContactRole: string
  emergencyHotline: string

  // Campus Facilities
  facilities: string[]
}

export interface OnboardingStep {
  id: string
  stepNumber: number
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
  link?: string
  actionLabel?: string
}

export const defaultSchoolDetails: SchoolBasicDetails = {
  // Identity
  schoolName: 'Greenwood International Academy',
  schoolCode: 'GIA-HYD-1029',
  affiliationBoard: 'Central Board of Secondary Education (CBSE) & Cambridge IGCSE',
  affiliationNumber: 'CBSE/AFF/3630248/2024',
  establishedYear: '1998',
  schoolType: 'Private Co-educational (Day & Residential)',
  motto: 'Inspiring Excellence, Cultivating Character, Shaping Tomorrow',
  accreditation: 'Grade A++ (National School Accreditation Board)',
  campusSize: '18.5 Acres',

  // Contact & Location
  officialEmail: 'info@greenwoodacademy.edu',
  supportEmail: 'admissions@greenwoodacademy.edu',
  primaryPhone: '+91 (040) 2345-6789',
  secondaryPhone: '+91 (040) 2345-6790',
  website: 'https://greenwoodacademy.edu',
  streetAddress: 'Survey No. 42, Silicon Knowledge Corridor, Gachibowli',
  city: 'Hyderabad',
  state: 'Telangana',
  postalCode: '500032',
  country: 'India',

  // Academic & Operational
  academicYear: '2024 - 2025',
  academicSessionDates: 'June 10, 2024 – April 18, 2025',
  workingDays: 'Monday – Friday (Selected Saturdays for Grades 9-12)',
  schoolHours: '08:15 AM – 03:45 PM',
  gradeRange: 'Pre-Kindergarten to Grade 12',
  gradingScale: 'Continuous Comprehensive Evaluation (CCE) & 10-point GPA',
  studentCapacity: 1500,
  currentEnrollment: 1248,

  // Administration & Leadership
  principalName: 'Dr. Evelyn Reed, Ph.D. in Educational Leadership',
  principalEmail: 'principal@greenwoodacademy.edu',
  vicePrincipalName: 'Prof. Rajesh Varma, M.Sc, M.Ed',
  adminContactName: 'Suneel Reddy',
  adminContactRole: 'Senior System Administrator',
  emergencyHotline: '+91 98765 43210',

  // Campus Facilities
  facilities: [
    'Smart Classrooms with Interactive Flat Panels',
    'Advanced STEM & Robotics Laboratories',
    'Modern Central Library (20,000+ volumes & digital journals)',
    'Olympic Standard Swimming Pool & 400m Athletic Track',
    'Indoor Multi-Sport Complex (Badminton, Basketball, Squash)',
    'Air-conditioned Auditorium (Capacity: 800 seats)',
    'GPS-tracked Bus Fleet with CCTV Surveillance (24 routes)',
    'Health Center with Full-time Medical Officer & Registered Nurse',
    'Hygienic Organic Cafeteria with Nutritionist Oversight',
  ],
}

export const initialOnboardingSteps: OnboardingStep[] = [
  {
    id: 'school-profile',
    stepNumber: 1,
    title: 'Basic School Profile & Identity',
    description: 'Set school name, affiliation numbers, campus address, and official communication channels.',
    status: 'completed',
    actionLabel: 'View Details',
  },
  {
    id: 'academic-calendar',
    stepNumber: 2,
    title: 'Academic Year & Operating Schedule',
    description: 'Establish the active academic session dates, bell timings, working days, and grading standards.',
    status: 'completed',
    link: '/calendar',
    actionLabel: 'Check Calendar',
  },
  {
    id: 'classes-sections',
    stepNumber: 3,
    title: 'Classes & Section Architecture',
    description: 'Configure grade divisions, class sections, room allocations, and assign primary class teachers.',
    status: 'completed',
    link: '/classes',
    actionLabel: 'Manage Classes',
  },
  {
    id: 'staff-onboarding',
    stepNumber: 4,
    title: 'Faculty & Administrative Staff Roster',
    description: 'Add teacher profiles, assign departmental disciplines, subject allocations, and staff permissions.',
    status: 'completed',
    link: '/teachers',
    actionLabel: 'Manage Teachers',
  },
  {
    id: 'student-admissions',
    stepNumber: 5,
    title: 'Student Enrollment & Records',
    description: 'Register student cohorts, track bio data, assign roll numbers, guardian contacts, and attendance profiles.',
    status: 'in-progress',
    link: '/students',
    actionLabel: 'View Students',
  },
  {
    id: 'attendance-rollout',
    stepNumber: 6,
    title: 'Daily Attendance & Reporting Setup',
    description: 'Enable daily attendance sheets, automated parent SMS notifications, and absence tracking.',
    status: 'in-progress',
    link: '/attendance',
    actionLabel: 'Mark Attendance',
  },
]

const STORAGE_KEY = 'schoolhub_basic_details'

export function getSchoolDetails(): SchoolBasicDetails {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...defaultSchoolDetails, ...JSON.parse(saved) }
    }
  } catch {
    // Return default on parse failure
  }
  return defaultSchoolDetails
}

export function saveSchoolDetails(details: SchoolBasicDetails): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details))
  } catch (error) {
    console.error('Failed to persist school details to localStorage', error)
  }
}

export function resetSchoolDetails(): SchoolBasicDetails {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to reset school details in localStorage', error)
  }
  return defaultSchoolDetails
}
