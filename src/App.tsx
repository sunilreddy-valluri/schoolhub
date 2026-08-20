import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

/**
 * SchoolHub Main Application Component
 * 
 * Provides the root routing context and layout for the application.
 * All pages and features are accessible through the AppRoutes component.
 * 
 * Features:
 * - Dashboard: School overview and statistics
 * - Attendance: Student attendance tracking and history
 * - Classes: Class management and student details
 * - Students, Teachers, Assignments, Announcements: Coming soon
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
