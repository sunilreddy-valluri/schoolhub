import { GraduationCap, LogOut } from 'lucide-react'
import { dashboardIcons } from '../dashboard/iconMap'

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
  const currentPath = activePath ?? '/dashboard'
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
            const isActive = item.href === currentPath
            return (
              <a
                className={`dashboard-nav__item${isActive ? ' dashboard-nav__item--active' : ''}`}
                href={item.href}
                key={item.label}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
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
