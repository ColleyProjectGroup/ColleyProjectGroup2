export interface Customer {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}

export interface CustomerInfo {
  user: Customer
  totalTransaction: number
  totalTransactionPrice: number
}
