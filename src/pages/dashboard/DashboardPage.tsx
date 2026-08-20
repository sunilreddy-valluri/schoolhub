import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { AttendanceOverview } from '../../components/dashboard/AttendanceOverview'
import { ClassesSection } from '../../components/dashboard/ClassesSection'
import { AssignmentsSection } from '../../components/dashboard/AssignmentsSection'
import { QuickActions } from '../../components/dashboard/QuickActions'
import { RecentActivity } from '../../components/dashboard/RecentActivity'
import { StatCard } from '../../components/dashboard/StatCard'
import { UpcomingEvents } from '../../components/dashboard/UpcomingEvents'
import { statistics } from '../../data/dashboardData'

export function DashboardPage() {
  return (
    <DashboardLayout>
      <section className="dashboard-section" aria-labelledby="statistics-heading">
        <div className="dashboard-section__header dashboard-section__header--stats">
          <div>
            <span className="section-kicker">School snapshot</span>
            <h2 id="statistics-heading">Overview</h2>
          </div>
          <span className="dashboard-updated">Updated today, 9:42 AM</span>
        </div>
        <div className="statistics-grid">
          {statistics.map((statistic) => <StatCard key={statistic.label} statistic={statistic} />)}
        </div>
      </section>

      <section className="dashboard-section dashboard-section--split" aria-label="School details">
        <AttendanceOverview />
        <UpcomingEvents />
      </section>

      <QuickActions />

      <section className="dashboard-section" aria-label="Activity details">
        <RecentActivity />
      </section>

      <AssignmentsSection />

      <ClassesSection />
    </DashboardLayout>
  )
}
