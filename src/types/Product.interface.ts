export interface Product {
  title: string
  price: number
  description: string
  tags: string[]
  thumbnailBase64?: string
  photoBase64?: string
  discountRate?: number
}
