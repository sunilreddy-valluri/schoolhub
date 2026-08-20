import { ArrowUpRight } from 'lucide-react'
import { Card } from '../ui/Card'
import type { Statistic } from '../../data/dashboardData'
import { dashboardIcons } from './iconMap'

interface StatCardProps {
  statistic: Statistic
}

export function StatCard({ statistic }: StatCardProps) {
  const Icon = dashboardIcons[statistic.icon]

  return (
    <Card className="stat-card">
      <div className="stat-card__topline">
        <span className="stat-card__icon" aria-hidden="true"><Icon size={19} /></span>
        <ArrowUpRight className="stat-card__trend-icon" size={16} aria-hidden="true" />
      </div>
      <div className="stat-card__value">{statistic.value}</div>
      <div className="stat-card__label">{statistic.label}</div>
      <div className="stat-card__change">{statistic.change}</div>
    </Card>
  )
}
