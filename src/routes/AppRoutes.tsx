import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { AnnouncementsPage } from '../pages/announcements/AnnouncementsPage'
import { ClassesPage } from '../pages/classes/ClassesPage'
import { CreateClassPage } from '../pages/classes/CreateClassPage'
import { CreateAssignmentPage } from '../pages/assignments/CreateAssignmentPage'
import { AttendancePage } from '../pages/dashboard/AttendancePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/classes/new" element={<CreateClassPage />} />
      <Route path="/assignments/new" element={<CreateAssignmentPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
