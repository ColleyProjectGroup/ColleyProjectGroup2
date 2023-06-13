export interface TransactionDetail {
  // 거래 내역 정보
  detailId: string // 거래 내역 ID
  user: {
    // 거래한 사용자 정보
    email: string
    displayName: string
    profileImg: string | null
  }
  account: {
    // 거래한 사용자의 계좌 정보
    bankName: string
    bankCode: string
    accountNumber: string
  }
  product: {
    // 거래한 제품 정보
    productId: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
    discountRate: number
  }
  reservation: Reservation | null // 거래한 제품의 예약 정보
  timePaid: string // 제품을 거래한 시간
  isCanceled: boolean // 거래 취소 여부
  done: boolean // 거래 완료 여부
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}
