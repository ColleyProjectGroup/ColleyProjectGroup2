import { createContext } from 'react'

type ClickedState = {
  isClicked: boolean
  setIsClicked: (value: boolean) => void
}

export const ClickedContext = createContext<ClickedState>({} as ClickedState)
