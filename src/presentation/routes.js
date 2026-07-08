export const routes = {
  home: '/',
  lessonTopics: '/sarxisob-darslari',
}

export function getCurrentRoute(pathname = window.location.pathname) {
  if (pathname === routes.lessonTopics) {
    return routes.lessonTopics
  }

  return routes.home
}

export function navigateTo(route) {
  window.history.pushState({}, '', route)
  window.dispatchEvent(new Event('app:navigate'))
}
