export interface Product {
  id: string
  thumbnail: string
  title: string
  price: number
  discountRate?: number
  tags: string[]
  photo: string
}

export interface ProductsProps {
  tagFilter?: string[]
  limit?: number
  sortOption?: string | null
  getProductCount: (count: number) => void
}

export interface RouteParams {
  id: string
  [key: string]: string | undefined
}
