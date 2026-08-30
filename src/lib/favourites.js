import { useEffect, useState } from 'react'
import { DASH_NAV, pathForView } from './dashboardNav.js'

const STORAGE_KEY = 'resiq-favourites-v1'

export function flattenFavouriteTargets() {
  const items = []
  for (const item of DASH_NAV) {
    if (item.children) {
      for (const child of item.children) {
        items.push({ id: child.id, icon: item.icon })
      }
    } else if (item.id !== 'overview') {
      items.push({ id: item.id, icon: item.icon })
    }
  }
  return items
}

function readFavourites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeFavourites(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* ignore */
  }
}

export function useFavourites() {
  const [ids, setIds] = useState(() => (typeof window === 'undefined' ? [] : readFavourites()))

  useEffect(() => {
    setIds(readFavourites())
  }, [])

  const add = (id) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      writeFavourites(next)
      return next
    })
  }

  const remove = (id) => {
    setIds((prev) => {
      const next = prev.filter((item) => item !== id)
      writeFavourites(next)
      return next
    })
  }

  const items = flattenFavouriteTargets().filter((item) => ids.includes(item.id))

  return { ids, items, add, remove, has: (id) => ids.includes(id), pathFor: pathForView }
}
