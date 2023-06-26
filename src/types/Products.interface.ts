export interface Product {
  isSoldOut: any
  id: string
  thumbnail: string
  title: string
  price: number
  discountRate?: number | undefined
  tags: string[]
  photo: string
}

export interface ProductsProps {
  tagFilter?: string[]
  limit?: number
  sortOption?: string | null
  keyword?: string
  getProductCount?: ((count: number) => void) | undefined
  excludeProductIds?: string[]
}

export interface RouteParams {
  id: string
  [key: string]: string | undefined
}
