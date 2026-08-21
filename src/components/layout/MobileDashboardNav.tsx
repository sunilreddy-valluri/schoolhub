import { useEffect, useRef } from 'react'
import { GraduationCap, LogOut, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardIcons } from '../dashboard/iconMap'
import type { DashboardNavItem } from './DashboardSidebar'
import { useUser } from '../../context/UserContext'

interface MobileDashboardNavProps {
  navItems: DashboardNavItem[]
  isOpen: boolean
  onClose: () => void
  activePath?: string
}

export function MobileDashboardNav({ navItems, isOpen, onClose, activePath }: MobileDashboardNavProps) {
  const navigate = useNavigate()
  const { profile } = useUser()
  const panelRef = useRef<HTMLDivElement>(null)
  const currentPath = activePath ?? '/dashboard'

  useEffect(() => {
    if (!isOpen) return

    // Prevent background scrolling when mobile menu is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Close on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleLogout = () => {
    onClose()
    navigate('/login')
  }

  const handleProfileClick = () => {
    onClose()
    navigate('/profile')
  }

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      id="mobile-navigation-dialog"
      className="mobile-dashboard-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        className="mobile-dashboard-nav__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close navigation menu"
      />
      <div className="mobile-dashboard-nav__panel" ref={panelRef}>
        <div className="mobile-dashboard-nav__header">
          <div className="dashboard-brand">
            <span className="dashboard-brand__mark" aria-hidden="true">
              <GraduationCap size={19} strokeWidth={2.2} />
            </span>
            <span>SchoolHub</span>
          </div>
          <button
            className="dashboard-icon-button mobile-dashboard-nav__close"
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-dashboard-nav__body">
          <nav className="dashboard-nav" aria-label="Mobile main navigation">
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
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mobile-dashboard-nav__footer">
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
      </div>
    </div>
  )
}
