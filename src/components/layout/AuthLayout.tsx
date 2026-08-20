import type { ReactNode } from 'react'
import { ArrowUpRight, GraduationCap } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
  eyebrow?: string
  heading?: ReactNode
  description?: string
}

export function AuthLayout({
  children,
  eyebrow = 'The calm center of your school',
  heading = 'Manage your school, simply.',
  description = 'Everything you need to manage students, teachers, classes, and daily school operations in one place.',
}: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__brand" aria-label="SchoolHub introduction">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            <GraduationCap size={20} strokeWidth={2.2} />
          </span>
          <span>SchoolHub</span>
        </div>

        <div className="brand-message">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{heading}</h1>
          <p>{description}</p>
        </div>

        <div className="brand-footer">
          <span>Built for the people who keep schools moving.</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </aside>

      <section className="auth-layout__content">{children}</section>
    </div>
  )
}
