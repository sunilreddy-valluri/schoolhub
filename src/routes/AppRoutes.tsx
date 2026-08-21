import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { CalendarPage } from '../pages/dashboard/CalendarPage'
import { AttendancePage } from '../pages/dashboard/AttendancePage'
import { AdminAttendancePage } from '../pages/dashboard/AdminAttendancePage'
import { MarkAttendancePage } from '../pages/dashboard/MarkAttendancePage'
import { ClassDetailsPage } from '../pages/dashboard/ClassDetailsPage'
import { ClassesPage } from '../pages/classes/ClassesPage'
import { CreateClassPage } from '../pages/classes/CreateClassPage'
import { TeachersListPage } from '../pages/teachers/TeachersListPage'
import { TeacherProfilePage } from '../pages/teachers/TeacherProfilePage'
import { TeacherDetailPage } from '../pages/teachers/TeacherDetailPage'
import { AssignmentsPage } from '../pages/assignments/AssignmentsPage'
import { CreateAssignmentPage } from '../pages/assignments/CreateAssignmentPage'
import { AnnouncementsPage } from '../pages/announcements/AnnouncementsPage'
import { CreateAnnouncementPage } from '../pages/announcements/CreateAnnouncementPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/attendance" element={<AdminAttendancePage />} />
      <Route path="/attendance/mark" element={<MarkAttendancePage />} />
      <Route path="/students" element={<AttendancePage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/classes/new" element={<CreateClassPage />} />
      <Route path="/class/:classId" element={<ClassDetailsPage />} />
      <Route path="/teachers" element={<TeachersListPage />} />
      <Route path="/teachers/:id" element={<TeacherDetailPage />} />
      <Route path="/teachers-profile" element={<TeacherProfilePage />} />
      <Route path="/profile" element={<TeacherProfilePage />} />
      <Route path="/assignments" element={<AssignmentsPage />} />
      <Route path="/assignments/new" element={<CreateAssignmentPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
      <Route path="/announcements/new" element={<CreateAnnouncementPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
