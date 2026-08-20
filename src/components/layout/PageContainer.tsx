import type { HTMLAttributes, ReactNode } from 'react'

interface PageContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function PageContainer({ children, className = '', ...props }: PageContainerProps) {
  return (
    <main className={`page-container${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </main>
  )
}
