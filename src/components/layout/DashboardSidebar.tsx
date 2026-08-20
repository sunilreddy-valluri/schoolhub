import { GraduationCap, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { dashboardIcons } from '../dashboard/iconMap'

export interface DashboardNavItem {
  label: string
  icon: keyof typeof dashboardIcons
  href: string
}

interface DashboardSidebarProps {
  navItems: DashboardNavItem[]
  onNavigate?: () => void
}

export function DashboardSidebar({ navItems, onNavigate }: DashboardSidebarProps) {
  const { pathname } = useLocation()

  /**
   * A nav item is active when the current pathname starts with its href.
   * Hash-only links (e.g. "#students") are never treated as active routes.
   * The root "/" check is excluded to avoid false positives.
   */
  function isActive(href: string): boolean {
    if (href.startsWith('#') || href === '/') return false
    return pathname === href || pathname.startsWith(href + '/')
  }

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
            const active = isActive(item.href)

            // Hash links don't navigate to a real route — keep as plain <a>
            if (item.href.startsWith('#')) {
              return (
                <a
                  className="dashboard-nav__item"
                  href={item.href}
                  key={item.label}
                  onClick={onNavigate}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              )
            }

            return (
              <Link
                className={`dashboard-nav__item${active ? ' dashboard-nav__item--active' : ''}`}
                to={item.href}
                key={item.label}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="dashboard-sidebar__bottom">
        <div className="dashboard-user">
          <span className="dashboard-avatar" aria-hidden="true">SR</span>
          <span className="dashboard-user__details">
            <strong>Suneel Reddy</strong>
            <small>School Administrator</small>
          </span>
        </div>
        <button className="dashboard-logout" type="button">
          <LogOut size={17} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
