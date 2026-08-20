import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { DashboardHeader } from './DashboardHeader'
import { DashboardSidebar, type DashboardNavItem } from './DashboardSidebar'
import { MobileDashboardNav } from './MobileDashboardNav'

const navItems: DashboardNavItem[] = [
  { label: 'Dashboard', icon: 'school', href: '/dashboard' },
  { label: 'Students', icon: 'users', href: '/students' },
  { label: 'Teachers', icon: 'graduationCap', href: '#teachers' },
  { label: 'Classes', icon: 'bookOpen', href: '#classes' },
  { label: 'Attendance', icon: 'clipboardCheck', href: '/attendance' },
  { label: 'Assignments', icon: 'layers', href: '/assignments' },
  { label: 'Announcements', icon: 'bookOpen', href: '/announcements' },
  { label: 'Calendar', icon: 'calendarCheck', href: '/calendar' },
  { label: 'Profile', icon: 'user', href: '/profile' },
]

interface DashboardLayoutProps {
  children: ReactNode
  activePath?: string
}

export function DashboardLayout({ children, activePath }: DashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const location = useLocation()
  const currentPath = activePath ?? location.pathname

  return (
    <div className="dashboard-layout">
      <DashboardSidebar navItems={navItems} activePath={currentPath} />
      <MobileDashboardNav
        navItems={navItems}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activePath={currentPath}
      />
      <div className="dashboard-main">
        <DashboardHeader
          onMenuOpen={() => setIsMobileNavOpen(true)}
          isMenuOpen={isMobileNavOpen}
        />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}

