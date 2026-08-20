import { ClipboardCheck } from 'lucide-react'
import { Card } from '../ui/Card'
import { attendance } from '../../data/dashboardData'

export function AttendanceOverview() {
  return (
    <Card className="attendance-card">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">Daily overview</span>
          <h2>Today&apos;s attendance</h2>
        </div>
        <span className="section-icon section-icon--blue" aria-hidden="true"><ClipboardCheck size={19} /></span>
      </div>

      <div className="attendance-card__summary">
        <strong>{attendance.percentage}%</strong>
        <span>Present today</span>
      </div>
      <div className="attendance-progress" role="progressbar" aria-label="Today's attendance" aria-valuenow={attendance.percentage} aria-valuemin={0} aria-valuemax={100}>
        <span className="attendance-progress__present" style={{ width: `${attendance.percentage}%` }} />
        <span className="attendance-progress__absent" style={{ width: `${(attendance.absent / 1248) * 100}%` }} />
      </div>
      <div className="attendance-legend">
        <div><span className="attendance-legend__dot attendance-legend__dot--present" /> <span>Present <strong>{attendance.present.toLocaleString()}</strong></span></div>
        <div><span className="attendance-legend__dot attendance-legend__dot--absent" /> <span>Absent <strong>{attendance.absent}</strong></span></div>
        <div><span className="attendance-legend__dot attendance-legend__dot--late" /> <span>Late <strong>{attendance.late}</strong></span></div>
      </div>
    </Card>
  )
}
