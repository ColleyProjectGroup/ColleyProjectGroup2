import { useCallback, useEffect, useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkIsAdmin } from 'api/index'
import { AdminNav, Modal } from 'components/index'
import { CommonError, ModalProps } from 'types/index'
import { LoginContext, LoginedUserContext, CartContext } from 'contexts/index'
import { useAxiosInterceptor } from 'hooks/index'
import styled from 'styles/pages/admin.module.scss'

export const AdminPrivateRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate()

  const moveSignIn = useCallback(() => {
    alert('관리자만 접근할 수 있습니다.')
    navigate('/signin')
  }, [navigate])

  const moveHome = useCallback(() => {
    alert('관리자만 접근할 수 있습니다.')
    navigate('/')
  }, [navigate])

  useEffect(() => {
    checkIsAdmin()
      .then(user => {
        if (user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
          moveHome()
        } else {
          setIsAdmin(true)
        }
      })
      .catch(error => {
        console.log(error)
        moveSignIn()
      })
  }, [moveSignIn, moveHome])

  const { setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)
  const { setUserCart } = useContext(CartContext)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

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

  return isAdmin ? (
    <div className={styled.admin}>
      <AdminNav />
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
    </div>
  ) : null
}
