import { ArrowUpRight } from 'lucide-react'
import { quickActions } from '../../data/dashboardData'
import { Button } from '../ui/Button'
import { dashboardIcons } from './iconMap'

export function QuickActions() {
  return (
    <section className="dashboard-section" aria-labelledby="quick-actions-heading">
      <div className="dashboard-section__header">
        <div>
          <span className="section-kicker">Shortcuts</span>
          <h2 id="quick-actions-heading">Quick actions</h2>
        </div>
      </div>
      <div className="quick-actions-grid">
        {quickActions.map((action) => {
          const Icon = dashboardIcons[action.icon]
          return (
            <Button className="quick-action" variant="secondary" key={action.title} type="button">
              <span className="quick-action__icon" aria-hidden="true"><Icon size={18} /></span>
              <span className="quick-action__copy">
                <strong>{action.title}</strong>
                <small>{action.description}</small>
              </span>
              <ArrowUpRight className="quick-action__arrow" size={16} aria-hidden="true" />
            </Button>
          )
        })}
      </div>
    </section>
  )
}
