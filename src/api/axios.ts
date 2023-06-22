import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

const authInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    config => {
      // 로컬스토리지에 저장 되어 있는 AccessToken을 가져온다.
      const accessToken = localStorage.getItem(
        import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN
      )
      if (config.headers && accessToken) {
        // AccessToken이 정상적으로 저장되어 있으면 headers에 Authorization에 값을 추가해준다.
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      // authorization을 추가한 config 반환
      return config
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error)
    }
  )

  return instance
}

// Authorization 설정이 없는 일반 사용자 API용 Instance
export const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    apikey: import.meta.env.VITE_APIKEY,
    username: import.meta.env.VITE_USERNAME
  }
})
// Authorization 설정이 추가된 로그인한 사용자 API용 Instance
export const authInstance: AxiosInstance = authInterceptors(baseInstance)

// 관리자 API용 Instance
export const adminInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    apikey: import.meta.env.VITE_APIKEY,
    username: import.meta.env.VITE_USERNAME,
    masterKey: true
  }
})
const config: AxiosRequestConfig<any> = {
  // Your configuration options
}

////////////////////////////////
// * Axios Instance 기본 사용법
// * 1. 필요한 instance import
// * 2. instance.method({API_PATH}, {필요한 경우 Body})
// adminInstance.get('/products');
// authInstance.post('/auth/me');
// baseInstance.post('/auth/login', { email: '', password: ''});
////////////////////////////////
