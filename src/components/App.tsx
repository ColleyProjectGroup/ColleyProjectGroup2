import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header, Badge, Modal } from 'components/index'
import { CommonError, Product, ModalProps } from 'types/index'
import {
  LoginContext,
  RecentlyContext,
  LoginedUserContext,
  WishListContext,
  CartContext
} from 'contexts/index'
import {
  useLocalStorage,
  useSessionStorage,
  useCartLocalStorage,
  useAxiosInterceptor
} from 'hooks/index'

//App은 Outlet을 통해 슬래시로 페이지 경로 이동시의 최상위 컴포넌트로 설정했습니다
export const App = () => {
  const path: string = useLocation().pathname
  const navigate = useNavigate()
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isLogined, setIsLogined] = useLocalStorage<boolean>('isLogined', false)
  const [userEmail, setUserEmail] = useLocalStorage<string>('ColleyUser', '')
  const [userCart, setUserCart] = useCartLocalStorage(userEmail, [])
  const [recentlyViewedList, setRecentlyViewedList] = useSessionStorage<
    Product[]
  >('RecentlyViewed', [])
  const [wishList, setWishList] = useLocalStorage<Product[]>(
    `wish-${userEmail}`,
    [],
    isLogined
  )

  useEffect(() => {
    if (path === '/mypage') {
      if (isLogined === false) {
        setIsModalShow(true)
        setModalProps({
          title: '로그인',
          content: '로그인이 필요한 서비스입니다.',
          isTwoButton: false,
          okButtonText: '확인',
          onClickOkButton: () => {
            setIsModalShow(false)
            navigate('/signin')
          }
        })
      }
    } else if (path === '/signin' || path === '/signup') {
      if (isLogined === true) {
        setIsModalShow(true)
        setModalProps({
          title: '로그인',
          content: '이미 로그인되었습니다.',
          isTwoButton: false,
          okButtonText: '확인',
          onClickOkButton: () => {
            setIsModalShow(false)
            navigate('/')
          }
        })
      }
    }
  }, [path])

  const handleLogout = () => {
    setIsLogined(false)
    setUserEmail('')
    setUserCart([])
    localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN)
  }

  const handleErrorModal = (error: CommonError) => {
    setIsModalShow(true)
    setModalProps({
      title: '오류',
      content: error.message,
      isTwoButton: false,
      okButtonText: '확인',
      onClickOkButton: () => {
        setIsModalShow(false)
      }
    })
  }

  useAxiosInterceptor(handleLogout, handleErrorModal)

  return (
    <>
      <LoginContext.Provider value={{ isLogined, setIsLogined }}>
        <LoginedUserContext.Provider value={{ userEmail, setUserEmail }}>
          <CartContext.Provider value={{ userCart, setUserCart }}>
            <RecentlyContext.Provider
              value={{ recentlyViewedList, setRecentlyViewedList }}>
              <WishListContext.Provider value={{ wishList, setWishList }}>
                <Header />
                <Badge />
                <Outlet />
                {isModalShow && modalProps ? (
                  <Modal
                    isTwoButton={modalProps.isTwoButton}
                    title={modalProps.title}
                    content={modalProps.content}
                    okButtonText={modalProps.okButtonText}
                    onClickOkButton={modalProps.onClickOkButton}
                    cancelButtonText={modalProps.cancelButtonText}
                    onClickCancelButton={modalProps.onClickCancelButton}
                  />
                ) : null}
              </WishListContext.Provider>
            </RecentlyContext.Provider>
          </CartContext.Provider>
        </LoginedUserContext.Provider>
      </LoginContext.Provider>
      {/* 결제 페이지/회원가입 페이지 등은 footer미적용일 것 같아서 header만 기본으로 outlet과 함께 배치시켰습니다 */}

      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          content={modalProps.content}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
        />
      ) : null}
    </>
  )
}
