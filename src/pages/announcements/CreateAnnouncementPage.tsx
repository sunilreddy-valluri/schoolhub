import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { AnnouncementForm } from '../../components/announcements/AnnouncementForm'
import { useNavigate } from 'react-router-dom'

export function CreateAnnouncementPage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="flex flex-col mb-8 gap-4">
        <div className="dashboard-header__copy">
          <span className="eyebrow block mb-2 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">Communications</span>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] m-0">Create Announcement</h1>
          <p className="mt-2 text-[var(--color-text-secondary)] text-sm">Draft and publish a new announcement for the school community.</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:justify-start">
        <AnnouncementForm onCancel={() => navigate('/announcements')} />
      </div>
    </DashboardLayout>
  )
}
