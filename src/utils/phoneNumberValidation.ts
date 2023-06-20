function isMobile(phoneNumber: number) {
  const regExp = /^010-\d{4}-\d{4}$/
  return regExp.test(phoneNumber) // 형식에 맞는 경우 true 리턴
}
