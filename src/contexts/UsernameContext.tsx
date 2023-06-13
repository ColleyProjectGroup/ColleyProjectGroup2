import { createContext } from 'react'
// interface ContextProps {
//   name: string
//   setName: React.Dispatch<React.SetStateAction<string>>
// }
// type UserContextType = {
//   context: string | null
//   setContext: React.Dispatch<React.SetStateAction<string | null>>
// }
// const iUserContextState = {
//   context: null,
//   setContext: () => void
// }
type UsernameState = {
  name: string
  setName: (value: string) => void
}

export const UsernameContext = createContext<UsernameState>({} as UsernameState)
