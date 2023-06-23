import { createContext } from 'react'
import { Product } from 'types/index'

type RecentlyState = {
  recentlyViewedList: Product[]
  setRecentlyViewedList: (products: Product[]) => void
}

export const RecentlyContext = createContext<RecentlyState>({} as RecentlyState)
