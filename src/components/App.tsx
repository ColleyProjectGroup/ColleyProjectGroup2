import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header'
import styles from 'styles/layout/header.module.scss'
import { LoginContext } from '@/contexts/LoginContext'
import { useLocalStorage } from 'hooks/useLocalStorage'

//App은 Outlet을 통해 슬래시로 페이지 경로 이동시의 최상위 컴포넌트로 설정했습니다
export const App = () => {
  const [isLogined, setIsLogined] = useLocalStorage('isLogined', false)

  return (
    <div className={styles.header}>
      <LoginContext.Provider value={{ isLogined, setIsLogined }}>
        <Header />
        <Outlet />
      </LoginContext.Provider>
      {/* 결제 페이지/회원가입 페이지 등은 footer미적용일 것 같아서 header만 기본으로 outlet과 함께 배치시켰습니다 */}
    </div>
  )
}
