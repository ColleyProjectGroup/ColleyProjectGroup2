export interface RemoveRequest {
  accountId: string // 계좌 ID (필수!)
  signature: boolean // 사용자 서명 (필수!)
}

export interface CreateRequest {
  bankCode: string // 연결할 은행 코드 (필수!)
  accountNumber: string // 연결할 계좌번호 (필수!)
  phoneNumber: string // 사용자 전화번호 (필수!)
  signature: boolean // 사용자 서명 (필수!)
}

export interface AccountsRequest {
  totalBalance: number // 사용자 계좌 잔액 총합
  accounts: Bank[] // 사용자 계좌 정보 목록
}

export interface Bank {
  // 사용자 계좌 정보
  id: string // 계좌 ID
  bankName: string // 은행 이름
  bankCode: string // 은행 코드
  accountNumber: string // 계좌 번호
  balance: number // 계좌 잔액
}

export interface Transaction {
  productId: string // 거래할 제품 ID (필수!)
  accountId: string // 결제할 사용자 계좌 ID (필수!)
}

export interface childProps {
  setValid: React.Dispatch<React.SetStateAction<boolean>>
}
