import axios, { AxiosInstance } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.headers.common['apikey'] = import.meta.env.VITE_APIKEY
axios.defaults.headers.common['username'] = import.meta.env.VITE_USERNAME

// Authorization 설정이 없는 일반 사용자 API용 Instance
export const baseInstance: AxiosInstance = axios.create()

// Authorization 설정이 추가된 로그인한 사용자 API용 Instance
export const authInstance: AxiosInstance = baseInstance

// 관리자 API용 Instance
export const adminInstance: AxiosInstance = axios.create({
  headers: { masterKey: true }
})
