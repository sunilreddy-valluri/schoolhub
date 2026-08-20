import { Card } from '../ui/Card'
import { recentActivities } from '../../data/dashboardData'
import { dashboardIcons } from './iconMap'

export function RecentActivity() {
  return (
    <Card className="activity-card">
      <div className="dashboard-section__header">
        <div>
          <span className="section-kicker">What&apos;s new</span>
          <h2 id="recent-activity-heading">Recent activity</h2>
        </div>
        <button className="section-link" type="button">View all</button>
      </div>
      <div className="activity-list" aria-labelledby="recent-activity-heading">
        {recentActivities.map((activity) => {
          const Icon = dashboardIcons[activity.icon]
          return (
            <div className="activity-item" key={activity.title}>
              <span className={`activity-item__icon activity-item__icon--${activity.tone}`} aria-hidden="true"><Icon size={16} /></span>
              <span className="activity-item__copy">
                <strong>{activity.title}</strong>
                <small>{activity.description}</small>
              </span>
              <time>{activity.time}</time>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
