import axios, { AxiosError, AxiosInstance } from 'axios'
import { CommonError } from 'types/index'
import { networkErrors } from 'constants/index'

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

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError): Promise<CommonError> | void => {
      if (
        error.request?.responseURL &&
        error.request?.responseURL.includes('logout') &&
        error?.response?.status === 401
      ) {
        return Promise.reject(networkErrors.EXPIRE_TOKEN)
      }

      if (error?.response?.status === 401) {
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
        location.replace('/signin')
        // TODO 로그아웃 처리
      } else if (error?.response?.status === 500) {
        return Promise.reject(networkErrors.SERVER_ERROR)
      } else {
        return Promise.reject({
          status: error?.response?.status,
          message: error?.response?.data
        })
      }
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

////////////////////////////////
// * Axios Instance 기본 사용법
// * 1. 필요한 instance import
// * 2. instance.method({API_PATH}, {필요한 경우 Body})
// adminInstance.get('/products');
// authInstance.post('/auth/me');
// baseInstance.post('/auth/login', { email: '', password: ''});
////////////////////////////////
