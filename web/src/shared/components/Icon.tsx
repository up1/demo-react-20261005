interface IconProps {
  name: string
  className?: string
}

/** Material Symbols icon (font loaded in index.html) */
export function Icon({ name, className = '' }: IconProps) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}
