import { createContext } from 'react'
import { CartProduct } from 'types/index'

type CartState = {
  userCart: CartProduct[]
  setUserCart: (products: CartProduct[]) => void
}

export const CartContext = createContext<CartState>({} as CartState)

type CheckedState = {
  checkedItems: Set<string>
  setCheckedItems: (products: Set<string>) => void
}

export const CheckedContext = createContext<CheckedState>({} as CheckedState)
