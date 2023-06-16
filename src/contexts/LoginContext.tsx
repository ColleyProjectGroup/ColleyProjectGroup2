import { createContext } from 'react'

type LoginState = {
  isLogined: boolean
  setIsLogined: (value: boolean) => void
}

export const LoginContext = createContext<LoginState>({} as LoginState)
