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
  const location = useLocation()

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
              item.href === location.pathname ||
              (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
            return (
              <Link
                className={`dashboard-nav__item${isActive ? ' dashboard-nav__item--active' : ''}`}
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
