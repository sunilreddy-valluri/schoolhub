import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

export function Select({ hasError = false, className = '', children, ...props }: SelectProps) {
  return (
    <div className={`select-wrapper${hasError ? ' select-wrapper--error' : ''}${className ? ` ${className}` : ''}`}>
      <select
        className={`select${hasError ? ' select--error' : ''}`}
        aria-invalid={hasError || undefined}
        {...props}
      >
        {children}
      </select>
      {/* Chevron icon rendered purely via CSS — no extra JS dependency */}
    </div>
  )
}
