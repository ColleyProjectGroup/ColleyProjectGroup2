import { RefObject, useEffect, useCallback } from 'react'

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      const el = ref?.current

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return
      }

      callback()
    },
    [callback, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}
