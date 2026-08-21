import { GraduationCap, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardIcons } from '../dashboard/iconMap'
import { useUser } from '../../context/UserContext'

export interface DashboardNavItem {
  label: string
  icon: keyof typeof dashboardIcons
  href: string
}

interface DashboardSidebarProps {
  navItems: DashboardNavItem[]
  onNavigate?: () => void
  activePath?: string
}

export function DashboardSidebar({ navItems, onNavigate, activePath }: DashboardSidebarProps) {
  const navigate = useNavigate()
  const { profile } = useUser()
  const currentPath = activePath ?? '/dashboard'

  const handleLogout = () => {
    onNavigate?.()
    navigate('/login')
  }

  const handleProfileClick = () => {
    onNavigate?.()
    navigate('/profile')
  }

  // Derive initials from the user's name
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <aside className="dashboard-sidebar" aria-label="Main navigation">
      <div className="dashboard-sidebar__top">
        <div className="dashboard-brand">
          <span className="dashboard-brand__mark" aria-hidden="true">
            <GraduationCap size={19} strokeWidth={2.2} />
          </span>
          <span>SchoolHub</span>
        </div>

        <nav className="dashboard-nav" aria-label="School management">
          {navItems.map((item) => {
            const Icon = dashboardIcons[item.icon]
            const isActive =
              currentPath === item.href ||
              (item.href !== '/dashboard' && currentPath.startsWith(item.href))
            return (
              <Link
                className={`dashboard-nav__item${isActive ? ' dashboard-nav__item--active' : ''}`}
                to={item.href}
                key={item.label}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="dashboard-sidebar__bottom">
        <button
          className="dashboard-user dashboard-user-button"
          type="button"
          onClick={handleProfileClick}
          aria-label="View user profile"
        >
          <span
            className="dashboard-avatar"
            aria-hidden="true"
            style={{ backgroundColor: profile.avatarColor, color: '#ffffff', borderColor: 'transparent' }}
          >
            {initials}
          </span>
          <span className="dashboard-user__details">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </button>
        <button
          className="dashboard-logout"
          type="button"
          onClick={handleLogout}
          aria-label="Log out of SchoolHub"
        >
          <LogOut size={17} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
