import { Card } from '../ui/Card'
import { StudentListItem } from './StudentListItem'
import { type ClassStudent } from '../../data/classData'

interface StudentListProps {
    students: ClassStudent[]
    totalCount: number
}

export function StudentList({ students, totalCount }: StudentListProps) {
    return (
        <Card className="student-list">
            <div className="student-list__header">
                <h3 className="student-list__title">Student List</h3>
                <span className="student-list__count">{totalCount} Students</span>
            </div>

            {students.length === 0 ? (
                <div className="student-list__empty">No students in this class</div>
            ) : (
                <div className="student-list__items">
                    {students.map((student) => (
                        <StudentListItem key={student.studentId} student={student} />
                    ))}
                </div>
            )}
        </Card>
    )
}
