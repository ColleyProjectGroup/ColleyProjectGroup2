import { useState, useEffect, useContext } from 'react'
import { TransactionDetail } from 'types/index'
import { featchUserOrders } from 'api/index'
import { MyOrderList } from 'components/index'
import { Link } from 'react-router-dom'
import { LoginContext } from 'contexts/index'
import styled from 'styles/pages/myOrders.module.scss'

export const Order = () => {
  const { isLogined } = useContext(LoginContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<TransactionDetail[]>([])

  const fetchOrders = () => {
    setIsLoading(true)
    featchUserOrders()
      .then(res => {
        setOrders(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      {isLogined ? (
        <div className={styled.container}>
          <div className={styled.path}>
            <Link to="/">홈</Link>
            <span>/</span>
            <Link to="/mypage">마이쇼핑</Link>
            <span>/ 주문조회</span>
          </div>
          <h4>주문 조회</h4>
          <div className={styled.tabs}>
            <div className={`${styled.tab} ${styled.active}`}>
              주문내역조회 ({orders.length.toLocaleString()})
            </div>
            <div className={`${styled.tab} ${styled.inactive}`}></div>
          </div>
          <MyOrderList
            title={''}
            orders={orders}
            onFetch={fetchOrders}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
