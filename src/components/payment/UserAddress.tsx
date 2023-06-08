import styles from 'src/styles/components/payment/UserAddress.module.scss'
import { useDaumPostcodePopup } from 'react-daum-postcode'

export const UserAddress = (props: any) => {
  const open = useDaumPostcodePopup() //미입력시 기본값 => 우편번호 스크립트 주소

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      //R(도로명), J(지번)
      if (data.bname !== '') {
        //법정동/법정리 이름
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    console.log(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  const handleClick = () => {
    open({ onComplete: handleComplete }) //onComplete: 사용자 선택정보 수신 콜백
  }

  return (
    <div className={styles.container}>
      <h3>배송지</h3>
      <label className={styles.receiver}>
        <span>받는사람</span>
        <input />
      </label>
      <label className={styles.address}>
        <span>주소</span>
        <input />
        <button
          type="button"
          onClick={handleClick}>
          Open
        </button>
      </label>
      <label className={styles.mobile}>
        <span>휴대전화</span>
        <input />
      </label>
      <label className={styles.email}>
        <span>이메일</span>
        <input />
      </label>
      <label>
        <input />
      </label>
    </div>
  )
}
