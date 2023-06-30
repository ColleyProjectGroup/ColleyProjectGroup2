import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyWishList } from 'components/index'
import { WishListContext } from 'contexts/index'
import { LoginContext } from 'contexts/index'
import styled from 'styles/pages/myWishList.module.scss'

export const WishList = () => {
  const { isLogined } = useContext(LoginContext)
  const { wishList } = useContext(WishListContext)

  return (
    <>
      {isLogined ? (
        <div className={styled.container}>
          <div className={styled.path}>
            <Link to="/">홈</Link>
            <span>/</span>
            <Link to="/mypage">마이쇼핑</Link>
            <span>/ 나의 위시리스트</span>
          </div>
          <h4>나의 위시리스트</h4>
          <MyWishList wishList={wishList} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
