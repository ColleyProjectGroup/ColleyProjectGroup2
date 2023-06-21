import { TransactionDetail } from 'types/index'

export type AdminSalesItemProps = {
  detail: TransactionDetail
  onChangeOrderIsCanceled: (id: string, isCanceled: boolean) => void
  onClickOrderConfirm: (id: string) => void
}
