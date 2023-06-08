import { Product } from 'types/index'

export type ProductItemProps = {
  product: Product
  isMenuShow: boolean
  showMenu: (id: string) => void
  hideMenu: () => void
}
