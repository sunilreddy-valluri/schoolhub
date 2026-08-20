import type { LabelHTMLAttributes, ReactNode } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
  required?: boolean
}

export function Label({ children, required = false, ...props }: LabelProps) {
  return (
    <label className="label" {...props}>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </label>
  )
}
