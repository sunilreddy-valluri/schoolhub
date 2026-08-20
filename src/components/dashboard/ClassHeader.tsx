import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { type ClassDetails } from '../../data/classData'

interface ClassHeaderProps {
    classDetails: ClassDetails
    onBack: () => void
    onEdit: () => void
}

export function ClassHeader({ classDetails, onBack, onEdit }: ClassHeaderProps) {
    return (
        <Card className="class-header">
            <div className="class-header__top">
                <button
                    onClick={onBack}
                    className="class-header__back-button"
                    type="button"
                    aria-label="Back to Classes"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    <span>Back</span>
                </button>
                <Button onClick={onEdit} variant="secondary">
                    Edit Class
                </Button>
            </div>

            <div className="class-header__content">
                <div className="class-header__title-section">
                    <h1 className="class-header__title">
                        Grade {classDetails.grade} - Section {classDetails.section}
                    </h1>
                    <p className="class-header__meta">
                        Academic Year: {classDetails.academicYear}
                    </p>
                </div>

                <div className="class-header__info-grid">
                    <div className="class-header__info-item">
                        <span className="class-header__label">Class Teacher</span>
                        <span className="class-header__value">{classDetails.classTeacher.teacherName}</span>
                        <span className="class-header__detail">{classDetails.classTeacher.subject}</span>
                    </div>

                    <div className="class-header__info-item">
                        <span className="class-header__label">Room</span>
                        <span className="class-header__value">{classDetails.room.roomNumber}</span>
                        <span className="class-header__detail">{classDetails.room.location}</span>
                    </div>

                    <div className="class-header__info-item">
                        <span className="class-header__label">Capacity</span>
                        <span className="class-header__value">{classDetails.room.capacity}</span>
                        <span className="class-header__detail">
                            {classDetails.totalStudents} enrolled
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
