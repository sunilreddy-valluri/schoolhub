import { CheckCircle2, XCircle, Clock, Shield } from 'lucide-react'

interface AttendanceStatsProps {
    presentCount: number
    absentCount: number
    lateCount: number
    excusedCount: number
    attendancePercentage: number
}

export function AttendanceStats({
    presentCount,
    absentCount,
    lateCount,
    excusedCount,
    attendancePercentage,
}: AttendanceStatsProps) {
    const getPercentageColor = (percentage: number): string => {
        if (percentage >= 95) return 'success'
        if (percentage >= 85) return 'warning'
        return 'error'
    }

    const percentageColor = getPercentageColor(attendancePercentage)

    return (
        <div className="attendance-stats">
            <div className="attendance-stats__percentage">
                <div className={`attendance-percentage attendance-percentage--${percentageColor}`}>
                    <div className="attendance-percentage__value">{attendancePercentage.toFixed(1)}%</div>
                    <div className="attendance-percentage__label">Attendance Rate</div>
                </div>
            </div>

            <div className="attendance-stats__totals">
                <div className="attendance-total attendance-total--present">
                    <CheckCircle2 size={20} aria-hidden="true" className="attendance-total__icon" />
                    <div className="attendance-total__content">
                        <div className="attendance-total__count">{presentCount}</div>
                        <div className="attendance-total__label">Present</div>
                    </div>
                </div>

                <div className="attendance-total attendance-total--absent">
                    <XCircle size={20} aria-hidden="true" className="attendance-total__icon" />
                    <div className="attendance-total__content">
                        <div className="attendance-total__count">{absentCount}</div>
                        <div className="attendance-total__label">Absent</div>
                    </div>
                </div>

                <div className="attendance-total attendance-total--late">
                    <Clock size={20} aria-hidden="true" className="attendance-total__icon" />
                    <div className="attendance-total__content">
                        <div className="attendance-total__count">{lateCount}</div>
                        <div className="attendance-total__label">Late</div>
                    </div>
                </div>

                <div className="attendance-total attendance-total--excused">
                    <Shield size={20} aria-hidden="true" className="attendance-total__icon" />
                    <div className="attendance-total__content">
                        <div className="attendance-total__count">{excusedCount}</div>
                        <div className="attendance-total__label">Excused</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
