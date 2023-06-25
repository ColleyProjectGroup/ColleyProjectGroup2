import { createContext } from 'react'
import { Product } from 'types/index'

type CartState = {
  userCart: Product[]
  setUserCart: (products: Product[]) => void
}

export const CartContext = createContext<CartState>({} as CartState)
