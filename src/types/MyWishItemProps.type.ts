import { Product } from 'types/index'

export type MyWishItemProps = {
  product: Product
  isLast: boolean
  isChecked: boolean
  onChange: (id: string) => void
}
