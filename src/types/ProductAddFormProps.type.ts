import { ProductAddBody, ProductResponse } from 'types/index'

export type ProductAddFormProps = {
  product: ProductResponse | null
  onSubmit: (product: ProductAddBody) => void
}
