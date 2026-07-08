import { useEffect, useState } from 'react'
import { getCurrentRoute } from '../routes'

export function useCurrentRoute() {
  const [route, setRoute] = useState(() => getCurrentRoute())

  useEffect(() => {
    function handleLocationChange() {
      setRoute(getCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('app:navigate', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('app:navigate', handleLocationChange)
    }
  }, [])

  return route
}
