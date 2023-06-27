export const networkErrors = {
  EXPIRE_TOKEN: {
    status: 401,
    message: 'AccessToken 만료',
    isShowModal: false
  },
  SERVER_ERROR: {
    status: 500,
    message: '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    isShowModal: true
  }
}
