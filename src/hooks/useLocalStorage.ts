import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialState: T,
  isAccessible = true
) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key) as string) || initialState
  )

  useEffect(() => {
    // 빈 위시리스트 생성 금지
    if (!isAccessible) {
      return
    }

    // 위시리스트 재로그인 예외처리
    if (key.includes('wish') && state) {
      const wishList = JSON.parse(localStorage.getItem(key) as string)
      if (wishList && wishList.length > 0 && state.length === 0) {
        localStorage.setItem(key, JSON.stringify([...wishList]))
        return
      }
    }

    if (state === '') {
      delete localStorage[key]
    } else {
      window.localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state, isAccessible])

  return [state, setState]
}
