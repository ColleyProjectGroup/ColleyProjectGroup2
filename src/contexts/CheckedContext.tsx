import { createContext } from 'react'

type CheckedState = {
  isChecked: boolean
  setIsChecked: (value: boolean) => void
}

export const CheckedContext = createContext<CheckedState>({} as CheckedState)
