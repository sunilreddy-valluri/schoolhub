import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react'

interface DashboardHeaderProps {
  onMenuOpen: () => void
  isMenuOpen?: boolean
}

export function DashboardHeader({ onMenuOpen }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isProfileOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isProfileOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsProfileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isProfileOpen])

  function handleMenuAction(action: () => void) {
    setIsProfileOpen(false)
    action()
  }

  return (
    <header className="dashboard-header">
      <button
        className="dashboard-icon-button dashboard-menu-button"
        type="button"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
      >
        <Menu size={21} aria-hidden="true" />
      </button>

      <div className="dashboard-header__copy">
        <span className="eyebrow">Overview</span>
        <h1>Good morning, Suneel <span aria-hidden="true">👋</span></h1>
        <p>Here&apos;s what&apos;s happening at your school today.</p>
      </div>

      <div className="dashboard-header__actions">
        {/* Notifications */}
        <button
          className="dashboard-icon-button"
          type="button"
          aria-label="View notifications"
        >
          <Bell size={19} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        {/* Profile button + dropdown */}
        <div className="profile-dropdown-wrap" ref={profileRef}>
          <button
            id="profile-menu-btn"
            className="dashboard-profile-button"
            type="button"
            aria-label="Open Suneel Reddy profile menu"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <span className="dashboard-avatar dashboard-avatar--header" aria-hidden="true">
              SR
            </span>
          </button>

          {isProfileOpen && (
            <div
              className="profile-dropdown"
              role="menu"
              aria-label="Profile menu"
            >
              {/* Identity header */}
              <div className="profile-dropdown__header">
                <span className="profile-dropdown__avatar" aria-hidden="true">SR</span>
                <div className="profile-dropdown__identity">
                  <strong>Suneel Reddy</strong>
                  <small>School Administrator</small>
                </div>
              </div>

              <div className="profile-dropdown__divider" aria-hidden="true" />

              {/* Menu items */}
              <button
                id="profile-menu-my-profile"
                className="profile-dropdown__item"
                type="button"
                role="menuitem"
                onClick={() => handleMenuAction(() => navigate('/students/1'))}
              >
                <User size={15} aria-hidden="true" />
                My Profile
              </button>

              <button
                id="profile-menu-settings"
                className="profile-dropdown__item"
                type="button"
                role="menuitem"
                onClick={() => handleMenuAction(() => navigate('/settings'))}
              >
                <Settings size={15} aria-hidden="true" />
                Settings
              </button>

              <div className="profile-dropdown__divider" aria-hidden="true" />

              <button
                id="profile-menu-logout"
                className="profile-dropdown__item profile-dropdown__item--danger"
                type="button"
                role="menuitem"
                onClick={() => handleMenuAction(() => navigate('/login'))}
              >
                <LogOut size={15} aria-hidden="true" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
