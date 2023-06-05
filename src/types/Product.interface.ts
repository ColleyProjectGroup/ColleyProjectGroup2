export interface Product {
  id?: string
  title: string
  price: number
  description: string
  tags: string[]
  thumbnailBase64?: string
  photoBase64?: string
  discountRate?: number
}
