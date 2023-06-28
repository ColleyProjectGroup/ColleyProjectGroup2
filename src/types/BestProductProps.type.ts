import { Product } from 'types/index'

export type BestProductProps = {
  product: Product
  onSaveProductRecently: (product: Product) => void
}
