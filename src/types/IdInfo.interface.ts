export interface IdInfo {
  email: string
  password: string
}

export interface RequestBody {
  displayName?: string // 새로운 표시 이름
  profileImgBase64?: string // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
  oldPassword?: string // 기존 비밀번호
  newPassword?: string // 새로운 비밀번호
}
