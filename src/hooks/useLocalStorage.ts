import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key) as string) || initialState
  )

  useEffect(() => {
    if (state === '') {
      delete localStorage[key]
    } else {
      window.localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState]
}
