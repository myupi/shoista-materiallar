import { ArrowUpRight } from 'lucide-react'
import { navigateTo } from '../routes'

export function FeatureCard({
  description,
  disabled = false,
  href,
  icon: Icon,
  title,
}) {
  function handleClick(event) {
    const isPlainLeftClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey

    if (!isPlainLeftClick || !href?.startsWith('/')) {
      return
    }

    event.preventDefault()
    navigateTo(href)
  }

  const content = (
    <>
      <span className="card-icon" aria-hidden="true">
        <Icon size={24} strokeWidth={2} />
      </span>
      <span>
        <h2>{title}</h2>
        <p>{description}</p>
      </span>
      <span className={`card-footer${disabled ? ' is-muted' : ''}`}>
        {disabled ? 'Tez orada' : 'Ochish'}
        {!disabled && <ArrowUpRight size={18} aria-hidden="true" />}
      </span>
    </>
  )

  if (disabled) {
    return (
      <div className="feature-card is-disabled" aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <a className="feature-card" href={href} onClick={handleClick}>
      {content}
    </a>
  )
}
