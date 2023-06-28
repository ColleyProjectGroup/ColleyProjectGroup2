import { useState, useContext } from 'react'
import { UserAddressContext, AddressDetailContext } from 'contexts/index'
import styles from 'src/styles/components/payment/DaumPostCode.module.scss'
import { useDaumPostcodePopup } from 'react-daum-postcode'

export const DaumPostCode = () => {
  const { address, setAddress } = useContext(UserAddressContext)
  const { setAddressDetail } = useContext(AddressDetailContext)

  const [zoneCode, setZoneCode] = useState<string>('')

  const open = useDaumPostcodePopup() //미입력시 기본값 => 우편번호 스크립트 주소
  const handleComplete = (data: any) => {
    console.log(data)
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
    setAddress(fullAddress)
    setZoneCode(data.zonecode)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete }) //onComplete: 사용자 선택정보 수신 콜백
  }
  const handleAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value)
  }
  return (
    <div>
      <label>
        <span>우편번호</span>
        <input
          value={zoneCode}
          placeholder="주소를 검색해주세요."
          className={styles.zonecode}
          readOnly
        />
        <button
          type="button"
          onClick={handleClick}>
          주소검색
        </button>
      </label>
      <label>
        <span>주소</span>
        <input
          value={address}
          className={address !== '' ? styles.address : styles.empty}
          placeholder="도로명 주소가 입력됩니다."
          readOnly
        />
      </label>
      <label>
        <span>상세주소</span>
        <input
          placeholder="상세주소를 입력해주세요."
          onChange={handleAddressDetail}
        />
      </label>
    </div>
  )
}
