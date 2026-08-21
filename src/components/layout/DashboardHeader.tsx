import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NotificationDropdown } from '../notifications/NotificationDropdown'

interface DashboardHeaderProps {
  onMenuOpen: () => void
  isMenuOpen?: boolean
}

export function DashboardHeader({ onMenuOpen, isMenuOpen }: DashboardHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="dashboard-header">
      <button
        className="dashboard-icon-button dashboard-menu-button"
        type="button"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation-dialog"
      >
        <Menu size={21} aria-hidden="true" />
      </button>
      <div className="dashboard-header__copy">
        <span className="eyebrow">Overview</span>
        <h1>Good morning, Suneel <span aria-hidden="true">👋</span></h1>
        <p>Here&apos;s what&apos;s happening at your school today.</p>
      </div>
      <div className="dashboard-header__actions">
        <NotificationDropdown />
        <button
          className="dashboard-profile-button"
          type="button"
          aria-label="Open Suneel Reddy profile"
          onClick={() => navigate('/profile')}
        >
          <span className="dashboard-avatar dashboard-avatar--header" aria-hidden="true">SR</span>
        </button>
      </div>
    </header>
  )
}
