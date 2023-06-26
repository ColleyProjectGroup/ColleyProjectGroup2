export interface CartProduct {
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 설명(최대 100자)
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
  discountRate: number // 제품 할인율
  quantity?: number
}
