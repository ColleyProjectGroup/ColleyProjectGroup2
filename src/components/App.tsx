import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header'
import { Badge } from 'components/index'
import styles from 'styles/layout/header.module.scss'
import { Product } from 'types/index'
import {
  LoginContext,
  RecentlyContext,
  LoginedUserContext
} from 'contexts/index'
import { useLocalStorage, useSessionStorage } from 'hooks/index'

//App은 Outlet을 통해 슬래시로 페이지 경로 이동시의 최상위 컴포넌트로 설정했습니다
export const App = () => {
  const [isLogined, setIsLogined] = useLocalStorage<boolean>('isLogined', false)
  const [userEmail, setUserEmail] = useLocalStorage<string>('ColleyUser', '')
  const [recentlyViewedList, setRecentlyViewedList] = useSessionStorage<
    Product[]
  >('RecentlyViewed', [])

  return (
    <div className={styles.header}>
      <LoginContext.Provider value={{ isLogined, setIsLogined }}>
        <LoginedUserContext.Provider value={{ userEmail, setUserEmail }}>
          <RecentlyContext.Provider
            value={{ recentlyViewedList, setRecentlyViewedList }}>
            <Header />
            <Badge />
            <Outlet />
          </RecentlyContext.Provider>
        </LoginedUserContext.Provider>
      </LoginContext.Provider>
      {/* 결제 페이지/회원가입 페이지 등은 footer미적용일 것 같아서 header만 기본으로 outlet과 함께 배치시켰습니다 */}
    </div>
  )
}
