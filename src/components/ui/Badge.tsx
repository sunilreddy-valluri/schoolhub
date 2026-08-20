import type { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  tone?: 'info' | 'success' | 'warning' | 'error'
}

export function Badge({ children, tone = 'info', className = '', ...props }: BadgeProps) {
  return (
    <span className={`badge badge--${tone}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </span>
  )
}
