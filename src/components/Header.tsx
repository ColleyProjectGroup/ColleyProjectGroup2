import { useNavigate } from 'react-router-dom'
import { checkIsAdmin } from 'utils/index'
import { LoginedUserContext, LoginContext, CartContext } from 'contexts/index'
import React, { useState, useRef, useEffect, useContext } from 'react'
import { logOut } from 'api/index'
import styles from 'styles/layout/header.module.scss'
import { CommonError } from 'types/index'
import { useInView } from 'react-intersection-observer'

export const Header: React.FC = () => {
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const { userEmail, setUserEmail } = useContext(LoginedUserContext)
  const { setUserCart } = useContext(CartContext)
  const [hideInput, setHideInput] = useState<boolean>(true)
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [scrollActive, setScrollActive] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const { ref, inView } = useInView()

  const onClickSearch = () => {
    setHideInput(false)
  }

  useEffect(() => {
    if (inView || scrollY < 100) {
      setScrollActive(false)
    } else {
      setScrollActive(true)
    }
  }, [inView])

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

  const handleLogout = () => {
    setUserEmail('')
    setUserCart([])
    localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN)
    setIsLogined(false)
    navigate('/')
  }

  const logOutId = () => {
    logOut()
      .then(isSuccess => {
        if (isSuccess) {
          handleLogout()
          alert('로그아웃되었습니다.')
        }
      })
      .catch((error: CommonError) => {
        if (error.status === 401) {
          navigate('/')
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

  const navigateDetail = (path: string) => {
    event?.preventDefault()
    navigate(`/productlist?category=${path}`)
  }

  return (
    <div className={styles.header}>
      <div
        className={styles.headerTop}
        ref={ref}>
        <div className={styles.inner}>
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
                        <a href="/mypage">MYPAGE</a>
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
                  <a href="/cart">CART</a>
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
      </div>
      <div
        className={`${scrollActive ? styles['fixed'] : ''} ${
          styles['navigation']
        }`}>
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
            <a href="/productlist?category=LIVING">
              Living
              <ul className={styles.dropdown}>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('TABLE')
                    }}>
                    테이블
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('ROOM')
                    }}>
                    거실화
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('LIGHT')
                    }}>
                    조명
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('BED')
                    }}>
                    침구
                  </div>
                </li>
              </ul>
            </a>
          </li>
          <li>
            <a href="/productlist?category=KITCHEN">
              Kitchen
              <ul className={styles.dropdown}>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('CUP')
                    }}>
                    컵/머그
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('DISHES')
                    }}>
                    식기
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('PLATE')
                    }}>
                    쟁반/접시
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('GOODS')
                    }}>
                    주방잡화
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      navigateDetail('CUTTING_BOARD')
                    }}>
                    도마
                  </div>
                </li>
              </ul>
            </a>
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
