import { createContext } from 'react'

type UserAddressState = {
  address: string
  setAddress: (value: string) => void
}

export const UserAddressContext = createContext<UserAddressState>(
  {} as UserAddressState
)
type AddressDetailState = {
  addressDetail: string
  setAddressDetail: (value: string) => void
}

export const AddressDetailContext = createContext<AddressDetailState>(
  {} as AddressDetailState
)
