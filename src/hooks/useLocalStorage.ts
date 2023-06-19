import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialState: boolean) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key) as string) || initialState
  )

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
