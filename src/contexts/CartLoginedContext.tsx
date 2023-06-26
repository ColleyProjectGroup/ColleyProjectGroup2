import { createContext } from 'react'
import { CartProduct } from 'types/index'

type CartLoginedState = {
  userLoginedCart: CartProduct[]
  setUserLoginedCart: (products: CartProduct[]) => void
}

export const CartLoginedContext = createContext<CartLoginedState>(
  {} as CartLoginedState
)
