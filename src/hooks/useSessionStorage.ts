import { useState, useEffect } from 'react'

export function useSessionStorage<T>(key: string, initialState: T) {
  const [state, setState] = useState(
    () =>
      JSON.parse(window.sessionStorage.getItem(key) as string) || initialState
  )

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
