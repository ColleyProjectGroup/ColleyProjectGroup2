import { createContext } from 'react'

type AccountNumber = {
  accountNumber: string
  setAccountNumber: (value: string) => void
}

export const AccountNumberContext = createContext<AccountNumber>(
  {} as AccountNumber
)
