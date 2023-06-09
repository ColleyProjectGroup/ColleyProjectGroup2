export interface ProductAddBody {
  id?: string
  title: string
  price: number
  description: string
  tags: string[]
  thumbnailBase64?: string | null
  photoBase64?: string | null
  discountRate?: number
}

export interface ProductResponse {
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 상세 설명
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null // 제품 상세 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
  // reservations: Reservation[] // 제품의 모든 예약 정보 목록
  discountRate: number // 제품 할인율
}
