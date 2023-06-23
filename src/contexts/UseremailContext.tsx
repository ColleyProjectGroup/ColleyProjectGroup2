import { createContext } from 'react'

type UseremailState = {
  email: string
  setEmail: (value: string) => void
}

export const UseremailContext = createContext<UseremailState>(
  {} as UseremailState
)
