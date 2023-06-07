import { Product } from 'types/index'

export type ProductItemProps = {
  product: Product
  isMenuShow: boolean
  showMenu: () => void
  hideMenu: () => void
}
