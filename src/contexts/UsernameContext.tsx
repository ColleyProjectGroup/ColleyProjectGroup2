import { createContext } from 'react'

type UsernameState = {
  name: string
  setName: (value: string) => void
}

export const UsernameContext = createContext<UsernameState>({} as UsernameState)
