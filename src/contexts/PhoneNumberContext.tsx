import { createContext } from 'react'

type PhoneNumberState = {
  phoneNumber: string
  setPhoneNumber: (value: string) => void
}

export const PhoneNumberContext = createContext<PhoneNumberState>(
  {} as PhoneNumberState
)
