import { ProductResponse } from 'types/index'

export type AdminMoreButtonProps = {
  isShow: boolean
  onToggleMenu: () => void
  onClickEdit: () => void
  onClickDelete: (product: ProductResponse) => void
  product: ProductResponse
  onClickChangeStatus: () => void
}
