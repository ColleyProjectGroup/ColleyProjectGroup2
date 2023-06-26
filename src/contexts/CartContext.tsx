import { createContext } from 'react'
import { CartProduct } from 'types/index'

type CartState = {
  userCart: CartProduct[]
  setUserCart: (products: CartProduct[]) => void
}

export const CartContext = createContext<CartState>({} as CartState)
