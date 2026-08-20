export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused'

export interface AttendanceRecord {
    id: string
    date: Date
    status: AttendanceStatus
    note?: string
}

export interface StudentAttendance {
    studentId: string
    studentName: string
    studentGrade: string
    studentPhoto?: string
    records: AttendanceRecord[]
}

// Sample data for demonstration
export const sampleStudentAttendance: StudentAttendance = {
    studentId: 'STU001',
    studentName: 'Bhargav',
    studentGrade: '10-A',
    records: [
        { id: '1', date: new Date('2024-01-22'), status: 'Present' },
        { id: '2', date: new Date('2024-01-21'), status: 'Present' },
        { id: '3', date: new Date('2024-01-20'), status: 'Late', note: 'Traffic' },
        { id: '4', date: new Date('2024-01-19'), status: 'Present' },
        { id: '5', date: new Date('2024-01-18'), status: 'Absent', note: 'Medical appointment' },
        { id: '6', date: new Date('2024-01-17'), status: 'Present' },
        { id: '7', date: new Date('2024-01-16'), status: 'Present' },
        { id: '8', date: new Date('2024-01-15'), status: 'Excused', note: 'Family emergency' },
        { id: '9', date: new Date('2024-01-14'), status: 'Present' },
        { id: '10', date: new Date('2024-01-13'), status: 'Present' },
        // December 2023
        { id: '11', date: new Date('2023-12-22'), status: 'Present' },
        { id: '12', date: new Date('2023-12-21'), status: 'Present' },
        { id: '13', date: new Date('2023-12-20'), status: 'Late' },
        { id: '14', date: new Date('2023-12-19'), status: 'Present' },
        { id: '15', date: new Date('2023-12-18'), status: 'Present' },
        { id: '16', date: new Date('2023-12-15'), status: 'Present' },
        { id: '17', date: new Date('2023-12-14'), status: 'Absent' },
        { id: '18', date: new Date('2023-12-13'), status: 'Present' },
        { id: '19', date: new Date('2023-12-12'), status: 'Present' },
        { id: '20', date: new Date('2023-12-11'), status: 'Present' },
    ],
}

export interface SchoolAttendanceRecord {
    id: string
    studentId: string
    studentName: string
    grade: string
    classId: string
    status: AttendanceStatus
    note?: string
}

export interface SchoolAttendanceSummary {
    totalStudents: number
    present: number
    absent: number
    late: number
    excused: number
    percentage: number
}

// Sample data for admin view

export const sampleSchoolSummary: SchoolAttendanceSummary = {
    totalStudents: 1250,
    present: 1150,
    absent: 45,
    late: 35,
    excused: 20,
    percentage: 94.4
}

export const sampleSchoolRecords: SchoolAttendanceRecord[] = [
    { id: 'rec-1', studentId: 'STU001', studentName: 'Bhargav', grade: '10', classId: '10-A', status: 'Present' },
    { id: 'rec-2', studentId: 'STU002', studentName: 'Aditi', grade: '10', classId: '10-A', status: 'Late', note: 'Traffic' },
    { id: 'rec-3', studentId: 'STU003', studentName: 'Rohan', grade: '10', classId: '10-B', status: 'Absent' },
    { id: 'rec-4', studentId: 'STU004', studentName: 'Meera', grade: '9', classId: '9-C', status: 'Present' },
    { id: 'rec-5', studentId: 'STU005', studentName: 'Karan', grade: '9', classId: '9-C', status: 'Excused', note: 'Medical' },
    { id: 'rec-6', studentId: 'STU006', studentName: 'Priya', grade: '11', classId: '11-Sci', status: 'Present' },
    { id: 'rec-7', studentId: 'STU007', studentName: 'Vikram', grade: '11', classId: '11-Sci', status: 'Late' },
    { id: 'rec-8', studentId: 'STU008', studentName: 'Neha', grade: '12', classId: '12-Com', status: 'Present' },
    { id: 'rec-9', studentId: 'STU009', studentName: 'Rahul', grade: '8', classId: '8-A', status: 'Absent' },
    { id: 'rec-10', studentId: 'STU010', studentName: 'Sneha', grade: '8', classId: '8-B', status: 'Present' },
]
