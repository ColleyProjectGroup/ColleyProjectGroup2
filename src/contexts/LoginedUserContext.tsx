import { createContext } from 'react'

type LoginedUserState = {
  userEmail: string
  setUserEmail: (value: string) => void
}

export const LoginedUserContext = createContext<LoginedUserState>(
  {} as LoginedUserState
)
