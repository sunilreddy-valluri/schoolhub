import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { AnnouncementsPage } from '../pages/announcements/AnnouncementsPage'
import { CreateAnnouncementPage } from '../pages/announcements/CreateAnnouncementPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/announcements/new" element={<CreateAnnouncementPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
