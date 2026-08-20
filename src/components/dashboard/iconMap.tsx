import {
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  School,
  User,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
import type { DashboardIconName } from '../../data/dashboardData'

export const dashboardIcons: Record<DashboardIconName, typeof Users> = {
  users: Users,
  graduationCap: GraduationCap,
  school: School,
  clipboardCheck: ClipboardCheck,
  userPlus: UserPlus,
  bookOpen: BookOpen,
  calendarCheck: CalendarCheck,
  userCheck: UserCheck,
  layers: Layers3,
  user: User,
}

