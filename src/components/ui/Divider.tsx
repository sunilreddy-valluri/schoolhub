interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="divider" role="separator">
      <span className="divider__line" />
      {label ? <span className="divider__label">{label}</span> : null}
      <span className="divider__line" />
    </div>
  )
}
