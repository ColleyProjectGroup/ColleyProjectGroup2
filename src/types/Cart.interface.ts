import { Product } from 'types/index'
// export interface Cart {
//   total: string
//   delivery: string
//   products: string
// }

export interface CartProduct {
  product: Product
  quantity: number // 저장되어있는 수량
  checkedItemHandler?: (id: string, isChecked: boolean) => void
  isChecked?: boolean
}
