import { useNavigate } from 'react-router-dom'
import { checkIsAdmin } from 'utils/index'
import { LoginedUserContext, LoginContext } from 'contexts/index'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { logOut } from 'api/signApi'
import styles from 'styles/layout/header.module.scss'

export const Header: React.FC = () => {
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const { userEmail, setUserEmail } = useContext(LoginedUserContext)
  const [hideInput, setHideInput] = useState<boolean>(true)
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const searchRef = useRef<HTMLInputElement | null>(null)

  const onClickSearch = () => {
    setHideInput(false)
  }

  useEffect(() => {
    function handleOutside(e: Event) {
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

  const logOutId = () => {
    // event.preventDefault() // 통합 테스트 때 확인 필요
    logOut().then(isSuccess => {
      if (isSuccess) {
        setUserEmail('')
        localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN)
        setIsLogined(!isLogined)
        navigate('/')
      } else {
        // 예외처리
      }
    })
  }

  const onSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (searchKeyword.trim() !== '') {
        // 검색어를 `ProductList` 컴포넌트로 전달합니다.
        window.location.href = `/productlist?category=SEARCH&keyword=${encodeURIComponent(
          searchKeyword
        )}`
      }
    }
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
                  {checkIsAdmin(userEmail) ? (
                    <span>
                      <a href="/admin">ADMIN</a>
                    </span>
                  ) : (
                    <span>
                      <a href="/about">MYPAGE</a>
                    </span>
                  )}
                  <span onClick={logOutId}>LOGOUT</span>
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
            <div>
              <span>
                <a href="/mypage/order">ORDER</a>
              </span>
              <span>
                <a href="/">CART</a>
              </span>
            </div>
          </div>
          <div className={styles.inputBox}>
            <input
              id="SearchInput"
              type="text"
              className={styles[hideInput ? 'hide' : 'show']}
              ref={searchRef}
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyPress={onSearchEnter}
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
      <div className={styles.navigation}>
        <ul className={styles.navInner}>
          <li>
            <a href="/productlist">ALL</a>
          </li>
          <li>
            <a href="/productlist?category=NEW">NEW</a>
          </li>
          <li>
            <a href="/productlist?category=BEST">BEST</a>
          </li>
          <li>
            <a href="/productlist?category=LIVING">Living</a>
          </li>
          <li>
            <a href="/productlist?category=KITCHEN">Kitchen</a>
          </li>
          <li>
            <a href="/productlist?category=STATIONERY">Stationery</a>
          </li>
          <li>
            <a href="/productlist?category=BABY/KIDS">Baby/Kids</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
