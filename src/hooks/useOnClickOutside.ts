import { useEffect } from 'react'

export const useOutsideClick = (callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    callback()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
