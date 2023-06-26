import { TransactionDetail } from 'types/index'

export type MyOrderItemProps = {
  detail: TransactionDetail
  isLast: boolean
  onClickConfirm: (id: string) => void
  onClickCancel: (id: string) => void
}
