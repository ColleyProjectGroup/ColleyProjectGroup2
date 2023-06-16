import { ProductResponse } from 'types/index'

export type ProductItemProps = {
  product: ProductResponse
  isMenuShow: boolean
  showMenu: (id: string) => void
  hideMenu: () => void
  onClickDelete: (product: ProductResponse) => void
  onChangeSaleStatus: (id: string, isChangedSoldout: boolean) => void
}
