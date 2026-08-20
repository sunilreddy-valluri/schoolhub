import { CheckCircle2, XCircle, Clock, Shield } from 'lucide-react'
import { Card } from '../ui/Card'

interface AttendanceSummaryProps {
    presentCount: number
    absentCount: number
    lateCount: number
    excusedCount: number
    totalCount: number
}

export function AttendanceSummary({
    presentCount,
    absentCount,
    lateCount,
    excusedCount,
    totalCount,
}: AttendanceSummaryProps) {
    const attendancePercentage =
        totalCount > 0 ? ((presentCount + excusedCount) / totalCount) * 100 : 0

    return (
        <Card className="attendance-summary">
            <h3 className="attendance-summary__title">Today's Attendance Summary</h3>

            <div className="attendance-summary__percentage-section">
                <div className="attendance-summary__percentage-circle">
                    <div className="attendance-summary__percentage-value">
                        {attendancePercentage.toFixed(1)}%
                    </div>
                    <div className="attendance-summary__percentage-label">Overall Attendance</div>
                </div>

                <div className="attendance-summary__stats">
                    <div className="attendance-summary__stat">
                        <CheckCircle2 size={20} aria-hidden="true" className="attendance-summary__icon attendance-summary__icon--present" />
                        <div className="attendance-summary__stat-content">
                            <div className="attendance-summary__stat-count">{presentCount}</div>
                            <div className="attendance-summary__stat-label">Present</div>
                        </div>
                    </div>

                    <div className="attendance-summary__stat">
                        <XCircle size={20} aria-hidden="true" className="attendance-summary__icon attendance-summary__icon--absent" />
                        <div className="attendance-summary__stat-content">
                            <div className="attendance-summary__stat-count">{absentCount}</div>
                            <div className="attendance-summary__stat-label">Absent</div>
                        </div>
                    </div>

                    <div className="attendance-summary__stat">
                        <Clock size={20} aria-hidden="true" className="attendance-summary__icon attendance-summary__icon--late" />
                        <div className="attendance-summary__stat-content">
                            <div className="attendance-summary__stat-count">{lateCount}</div>
                            <div className="attendance-summary__stat-label">Late</div>
                        </div>
                    </div>

                    <div className="attendance-summary__stat">
                        <Shield size={20} aria-hidden="true" className="attendance-summary__icon attendance-summary__icon--excused" />
                        <div className="attendance-summary__stat-content">
                            <div className="attendance-summary__stat-count">{excusedCount}</div>
                            <div className="attendance-summary__stat-label">Excused</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="attendance-summary__progress">
                <div className="attendance-summary__progress-bar">
                    <div
                        className="attendance-summary__progress-fill"
                        style={{
                            width: `${Math.min((presentCount + excusedCount) / totalCount) * 100 || 0}%`,
                        }}
                        aria-hidden="true"
                    />
                </div>
                <div className="attendance-summary__progress-labels">
                    <span>{presentCount + excusedCount} out of {totalCount} students present/excused</span>
                </div>
            </div>
        </Card>
    )
}
