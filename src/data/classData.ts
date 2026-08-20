export interface ClassStudent {
    studentId: string
    studentName: string
    status: 'Present' | 'Absent' | 'Late' | 'Excused'
}

export interface ClassRoom {
    roomNumber: string
    capacity: number
    location: string
}

export interface ClassTeacher {
    teacherId: string
    teacherName: string
    subject: string
    email: string
}

export interface ClassDetails {
    classId: string
    grade: string
    section: string
    academicYear: string
    classTeacher: ClassTeacher
    room: ClassRoom
    students: ClassStudent[]
    totalStudents: number
    presentToday: number
    absentToday: number
    lateToday: number
    excusedToday: number
}

// Sample data for demonstration
export const sampleClassDetails: ClassDetails = {
    classId: 'CLS001',
    grade: '10',
    section: 'A',
    academicYear: '2024-2025',
    classTeacher: {
        teacherId: 'TCH001',
        teacherName: 'Ms. Priya Sharma',
        subject: 'Mathematics',
        email: 'priya.sharma@schoolhub.edu',
    },
    room: {
        roomNumber: '201',
        capacity: 40,
        location: 'Second Floor, Block A',
    },
    students: [
        { studentId: 'STU001', studentName: 'Aarav Kumar', status: 'Present' },
        { studentId: 'STU002', studentName: 'Anaya Singh', status: 'Present' },
        { studentId: 'STU003', studentName: 'Rohan Patel', status: 'Absent' },
        { studentId: 'STU004', studentName: 'Neha Gupta', status: 'Present' },
        { studentId: 'STU005', studentName: 'Arjun Reddy', status: 'Late' },
        { studentId: 'STU006', studentName: 'Divya Nair', status: 'Present' },
        { studentId: 'STU007', studentName: 'Karan Singh', status: 'Excused' },
        { studentId: 'STU008', studentName: 'Priya Kapoor', status: 'Present' },
        { studentId: 'STU009', studentName: 'Vikas Verma', status: 'Present' },
        { studentId: 'STU010', studentName: 'Sneha Iyer', status: 'Absent' },
        { studentId: 'STU011', studentName: 'Aditya Malhotra', status: 'Present' },
        { studentId: 'STU012', studentName: 'Shreya Desai', status: 'Present' },
        { studentId: 'STU013', studentName: 'Rahul Chopra', status: 'Late' },
        { studentId: 'STU014', studentName: 'Maya Bhat', status: 'Present' },
        { studentId: 'STU015', studentName: 'Sanjay Kumar', status: 'Present' },
    ],
    totalStudents: 15,
    presentToday: 11,
    absentToday: 2,
    lateToday: 2,
    excusedToday: 1,
}
