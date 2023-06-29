import { useEffect } from 'react'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { baseInstance, adminInstance } from 'api/index'
import { CommonError } from 'types/index'
import { networkErrors } from 'constants/index'

export const useAxiosInterceptor = (
  handleLogout: () => void,
  setErrorModal: (error: CommonError) => void
) => {
  const accessToken = localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN
  )

  const apiErrorInterceptor = (error: AxiosError): Promise<CommonError> => {
    const errorObj = {
      status: error?.response?.status,
      message: (error?.response?.data as string) ?? '',
      isShowModal: false
    }
    setErrorModal(errorObj)
    return Promise.reject(errorObj)
  }

  const adminConfig = (config: InternalAxiosRequestConfig<any>) => {
    config.headers['masterKey'] = true
    return config
  }

  const authConfig = (config: InternalAxiosRequestConfig<any>) => {
    if (config.headers && accessToken) {
      // AccessToken이 정상적으로 저장되어 있으면 headers에 Authorization에 값을 추가해준다.
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    // authorization을 추가한 config 반환
    return config
  }

  const responseErrorInterceptor = (
    error: AxiosError
  ): Promise<CommonError> | void => {
    if (!accessToken) {
      if (error?.response?.status === 500) {
        return Promise.reject(networkErrors.SERVER_ERROR)
      } else {
        const errorObj = {
          status: error?.response?.status,
          message: (error?.response?.data as string) ?? '',
          isShowModal: false
        }
        if (errorObj.isShowModal) {
          setErrorModal(errorObj)
        }
        return Promise.reject(errorObj)
      }
    } else {
      const url = error.request?.responseURL ?? ''
      const showModal =
        !url.includes('/auth/login') &&
        !url.includes('/auth/signup') &&
        !url.includes('/products/transactions/details')

      if (
        error.request?.responseURL &&
        error.request?.responseURL.includes('logout') &&
        error?.response?.status === 401
      ) {
        handleLogout()
        return Promise.reject(networkErrors.EXPIRE_TOKEN)
      } else if (error?.response?.status === 401) {
        localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN)
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
        location.replace('/signin')
        handleLogout()
        return
      } else if (error?.response?.status === 500) {
        setErrorModal(networkErrors.SERVER_ERROR)
        return
      } else {
        const errorObj = {
          status: error?.response?.status,
          message: (error?.response?.data as string) ?? '',
          isShowModal: showModal
        }
        if (errorObj.isShowModal) {
          setErrorModal(errorObj)
        }

        return Promise.reject(errorObj)
      }
    }
  }

  const adminRequestInterceptor = adminInstance.interceptors.request.use(
    adminConfig,
    apiErrorInterceptor
  )

  const requestInterceptor = baseInstance.interceptors.request.use(
    authConfig,
    apiErrorInterceptor
  )

  const adminResponseInterceptor = adminInstance.interceptors.response.use(
    response => response,
    responseErrorInterceptor
  )

  const responseInterceptor = baseInstance.interceptors.response.use(
    response => response,
    responseErrorInterceptor
  )

  useEffect(() => {
    return () => {
      // interceptor 해제
      baseInstance.interceptors.request.eject(requestInterceptor)
      baseInstance.interceptors.response.eject(responseInterceptor)
      adminInstance.interceptors.request.eject(adminRequestInterceptor)
      adminInstance.interceptors.response.eject(adminResponseInterceptor)
    }
  }, [
    responseInterceptor,
    requestInterceptor,
    adminRequestInterceptor,
    adminResponseInterceptor
  ])
}
