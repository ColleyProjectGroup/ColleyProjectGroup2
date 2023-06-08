export interface Product {
  id?: string
  title: string
  price: number
  description: string
  tags: string[]
  thumbnailBase64?: string | null
  photoBase64?: string | null
  discountRate?: number
}
