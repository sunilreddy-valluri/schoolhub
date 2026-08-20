import { X } from 'lucide-react'
import { DashboardSidebar, type DashboardNavItem } from './DashboardSidebar'

interface MobileDashboardNavProps {
  navItems: DashboardNavItem[]
  isOpen: boolean
  onClose: () => void
}

export function MobileDashboardNav({ navItems, isOpen, onClose }: MobileDashboardNavProps) {
  if (!isOpen) return null

  return (
    <div className="mobile-dashboard-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button className="mobile-dashboard-nav__backdrop" type="button" onClick={onClose} aria-label="Close navigation menu" />
      <div className="mobile-dashboard-nav__panel">
        <div className="mobile-dashboard-nav__header">
          <span className="dashboard-brand">
            <span className="dashboard-brand__mark" aria-hidden="true">S</span>
            <span>SchoolHub</span>
          </span>
          <button className="dashboard-icon-button" type="button" onClick={onClose} aria-label="Close navigation menu">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <DashboardSidebar navItems={navItems} onNavigate={onClose} />
      </div>
    </div>
  )
}
