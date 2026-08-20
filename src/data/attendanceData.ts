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
