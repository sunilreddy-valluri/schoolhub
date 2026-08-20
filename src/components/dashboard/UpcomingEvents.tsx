import { CalendarDays } from 'lucide-react'
import { Card } from '../ui/Card'
import { upcomingEvents } from '../../data/dashboardData'

export function UpcomingEvents() {
  return (
    <Card className="upcoming-card">
      <div className="dashboard-section__header">
        <div>
          <span className="section-kicker">On the calendar</span>
          <h2 id="upcoming-heading">Upcoming</h2>
        </div>
        <CalendarDays size={19} className="upcoming-card__calendar" aria-hidden="true" />
      </div>
      <div className="upcoming-list" aria-labelledby="upcoming-heading">
        {upcomingEvents.map((event) => (
          <div className="upcoming-item" key={event.title}>
            <span className="upcoming-item__date" aria-hidden="true" />
            <span>
              <strong>{event.title}</strong>
              <small>{event.schedule}</small>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
