import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { quickActions } from '../../data/dashboardData'
import { Button } from '../ui/Button'
import { dashboardIcons } from './iconMap'

/** Maps quick-action titles to their target routes. */
const quickActionRoutes: Record<string, string> = {
  'Create Class': '/classes/new',
}

export function QuickActions() {
  const navigate = useNavigate()

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
          const route = quickActionRoutes[action.title]

          return (
            <Button
              className="quick-action"
              variant="secondary"
              key={action.title}
              type="button"
              onClick={route ? () => navigate(route) : undefined}
              aria-label={action.title}
            >
              <span className="quick-action__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
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
