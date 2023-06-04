import { Product } from 'types'

export type AdminProductAddPros = {
  onSumit: (product: Product) => void
}
