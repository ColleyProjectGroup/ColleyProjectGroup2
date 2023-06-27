import { createContext } from 'react'

type UserAddressState = {
  address: string
  setAddress: (value: string) => void
}

export const UserAddressContext = createContext<UserAddressState>(
  {} as UserAddressState
)
