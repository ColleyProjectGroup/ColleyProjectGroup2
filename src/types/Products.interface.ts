export interface Product {
  id: string
  thumbnail: string
  title: string
  price: number
  discountRate?: number
  tags: string[]
}

export interface ProductsProps {
  tagFilter?: string[] // 상품 카테고리 태그
  limit?: number // 상품 렌더링 제한 수
  sortOption?: string | null // 상품 정렬 옵션
  getProductCount: (count: number) => void // 상품 개수
}
