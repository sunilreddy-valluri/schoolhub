import { Bell, Menu } from 'lucide-react'

interface DashboardHeaderProps {
  onMenuOpen: () => void
}

export function DashboardHeader({ onMenuOpen }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <button className="dashboard-icon-button dashboard-menu-button" type="button" onClick={onMenuOpen} aria-label="Open navigation menu">
        <Menu size={21} aria-hidden="true" />
      </button>
      <div className="dashboard-header__copy">
        <span className="eyebrow">Overview</span>
        <h1>Good morning, Suneel <span aria-hidden="true">👋</span></h1>
        <p>Here&apos;s what&apos;s happening at your school today.</p>
      </div>
      <div className="dashboard-header__actions">
        <button className="dashboard-icon-button" type="button" aria-label="View notifications">
          <Bell size={19} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true" />
        </button>
        <button className="dashboard-profile-button" type="button" aria-label="Open Suneel Reddy profile">
          <span className="dashboard-avatar dashboard-avatar--header" aria-hidden="true">SR</span>
        </button>
      </div>
    </header>
  )
}
