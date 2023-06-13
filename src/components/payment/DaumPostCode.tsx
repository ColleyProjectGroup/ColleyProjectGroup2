import { useState } from 'react'
// import styles from 'src/styles/components/payment/DaumPostCode.module.scss'
import { useDaumPostcodePopup } from 'react-daum-postcode'

export const DaumPostCode = () => {
  const [address, setAddress] = useState('')
  const [zoneCode, setZoneCode] = useState('')

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
    console.log(data)
    console.log(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(fullAddress)
    setZoneCode(data.zonecode)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete }) //onComplete: 사용자 선택정보 수신 콜백
  }
  return (
    <div>
      <label>
        <span> 우편번호</span>
        <input value={zoneCode} />
        <button
          type="button"
          onClick={handleClick}>
          우편번호
        </button>
      </label>
      <label>
        <span>주소</span>
        <input value={address} />
      </label>
      <label>
        <span>상세주소</span>
        <input />
      </label>
    </div>
  )
}
