export type ModalProps = {
  isTwoButton: boolean // * true면 ok, cancel 버튼 2개
  title: string // * Modal title
  content?: string // * Modal content message
  okButtonText: string // * 기본 확인 버튼명(필수) 확인(닫기)
  children?: JSX.Element
  cancelButtonText?: string // * 취소 버튼명(isTwoButton이 true인 경우 필수 작성)
  onClickOkButton: () => void // * 확인 버튼 클릭 이벤트
  onClickCancelButton?: () => void // * 취소 버튼 클릭 이벤트
}

export const defaultModalProps = {
  isTwoButton: false,
  okButtonText: '확인'
}
