import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { ClassesPage } from '../pages/classes/ClassesPage'
import { CreateClassPage } from '../pages/classes/CreateClassPage'
import { ClassDetailPage } from '../pages/classes/ClassDetailPage'
import { EditClassPage } from '../pages/classes/EditClassPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/classes/new" element={<CreateClassPage />} />
      <Route path="/classes/:id" element={<ClassDetailPage />} />
      <Route path="/classes/:id/edit" element={<EditClassPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
