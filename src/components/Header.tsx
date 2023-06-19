import styles from 'styles/layout/header.module.scss'
import { useState, useRef, useEffect, useContext } from 'react'
import { logOut } from 'api/signApi'
import { LoginContext } from '@/contexts/LoginContext'

export const Header = () => {
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const [hideInput, setHideInput] = useState<boolean>(true)
  const onClickSearch = () => {
    setHideInput(false)
  }

  const searchRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    function handleOutside(e: Event) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        if (!hideInput) {
          setHideInput(true)
        }
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [searchRef, hideInput])

  const logOutId = (event: Event) => {
    event.preventDefault()
    logOut()
  }

  return (
    <div className={styles.inner}>
      <div className={styles.headerTop}>
        <a href="/">
          <img
            src="https://colley.market/web/upload/category/logo/9dec339bd19e5e585ab528ff4c0b5dad_dATXM62tzO_5_top.jpg"
            alt="logo"
            className={styles.logo}
          />
        </a>
        <div className={styles.loginTop}>
          <div className={styles.loginLink}>
            <div>
              {isLogined ? (
                <div>
                  <span>
                    <a href="/about">MYPAGE</a>
                  </span>
                  <span>
                    <a
                      href="/"
                      onClick={() => {
                        logOutId
                        localStorage.removeItem(
                          import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN
                        )
                        setIsLogined(!isLogined)
                      }}>
                      LOGOUT
                    </a>
                  </span>
                </div>
              ) : (
                <div>
                  <span>
                    <a href="/signup">JOIN</a>
                  </span>
                  <span>
                    <a href="/signin">LOGIN</a>
                  </span>
                </div>
              )}
            </div>
            <span>
              <a href="/">ORDER</a>
            </span>
            <span>
              <a href="/">CART</a>
            </span>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles[hideInput ? 'hide' : 'show']}
              ref={searchRef}
            />
            <div
              className={`material-icons ${styles['icon']} ${
                styles[hideInput ? 'show' : 'hide']
              }`}
              onClick={onClickSearch}>
              search
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.navigation}>
        <li>
          <a href="/">ALL</a>
        </li>
        <li>
          <a href="/">NEW</a>
        </li>
        <li>
          <a href="/">BEST</a>
        </li>
        <li>
          <a href="/">Living</a>
        </li>
        <li>
          <a href="/">Kitchen</a>
        </li>
        <li>
          <a href="/">Stationery</a>
        </li>
        <li>
          <a href="/">Baby/Kids</a>
        </li>
      </ul>
    </div>
  )
}
