import { createContext } from 'react'
import { Product } from 'types/index'

type WishListState = {
  wishList: Product[]
  setWishList: (products: Product[]) => void
}

export const WishListContext = createContext<WishListState>({} as WishListState)
