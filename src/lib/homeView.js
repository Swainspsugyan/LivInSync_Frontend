const VIEW_ALIASES = {
  home: 'home',
  features: 'features',
  modules: 'modules',
  solutions: 'solutions',
  about: 'about',
  'about-us': 'about',
  team: 'about',
  contact: 'about',
}

export const HOME_TABS = ['home', 'features', 'modules', 'solutions', 'about']

export function tabHref(tab) {
  return tab === 'home' ? '/' : `/?tab=${tab}`
}

export function viewFromLocation(location) {
  const tab = new URLSearchParams(location.search || '').get('tab')
  if (tab && VIEW_ALIASES[tab]) return VIEW_ALIASES[tab]
  const hash = (location.hash || '').replace('#', '')
  if (hash && VIEW_ALIASES[hash]) return VIEW_ALIASES[hash]
  return 'home'
}
