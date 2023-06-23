import { createContext } from 'react'

type AccountNumberState = {
  accountNumber: string
  setAccountNumber: (value: string) => void
}

export const AccountNumberContext = createContext<AccountNumberState>(
  {} as AccountNumberState
)

type BankState = {
  bank: string
  setBank: (value: string) => void
}

export const BankContext = createContext<BankState>({} as BankState)
