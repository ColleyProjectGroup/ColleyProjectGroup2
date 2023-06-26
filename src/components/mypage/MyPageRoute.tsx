import { Outlet } from 'react-router-dom'
import { MyPageNav } from 'components/mypage/index'
import { Header } from 'components/index'
import styles from 'styles/components/mypage/mypageroute.module.scss'
import { LoginContext, LoginedUserContext } from 'contexts/index'
import { useLocalStorage } from 'hooks/index'

export const MyPageRoute = () => {
  const [isLogined, setIsLogined] = useLocalStorage<boolean>('isLogined', false)
  const [userEmail, setUserEmail] = useLocalStorage<string>('ColleyUser', '')

  return (
    <>
      <div>
        <LoginContext.Provider value={{ isLogined, setIsLogined }}>
          <LoginedUserContext.Provider value={{ userEmail, setUserEmail }}>
            <Header />
            <div className={styles.wrapper}>
              <MyPageNav />
              <Outlet />
            </div>
          </LoginedUserContext.Provider>
        </LoginContext.Provider>
      </div>
    </>
  )
}
