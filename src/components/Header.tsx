import styles from 'styles/layout/header.module.scss'
import { useState } from 'react'

export const Header = () => {
  const [isClicked, setClicked] = useState<boolean>(false)
  const [hideInput, setShowInput] = useState<boolean>(true)
  const setClickedChange = () => {
    setClicked(!isClicked)
    setShowInput(!hideInput)
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
            <span>
              <a href="/signup">JOIN</a>
            </span>
            <span>
              <a href="/signin">LOGIN</a>
            </span>
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
              onBlur={setClickedChange}
            />
            <div
              className={`material-icons ${styles['icon']} ${
                styles[isClicked ? 'hide' : 'show']
              }`}
              onClick={setClickedChange}>
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
          <a href="/">Livinig</a>
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
