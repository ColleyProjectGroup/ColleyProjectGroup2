import { createContext } from 'react'

type BankState = {
  bank: string
  setBank: (value: string) => void
}

export const BankContext = createContext<BankState>(
  {} as BankState
)
