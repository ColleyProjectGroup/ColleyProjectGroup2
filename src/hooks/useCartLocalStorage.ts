import { useState, useEffect } from 'react'
import { CartProduct } from 'types/index'

export function useCartLocalStorage(
  email: string,
  initialState: CartProduct[]
) {
  const [state, setState] = useState(
    () =>
      JSON.parse(
        window.localStorage.getItem(
          `${email !== '' ? `cart-${email}` : 'cart-guest'}`
        ) as string
      ) || initialState
  )

  useEffect(() => {
    const guestItems = localStorage.getItem('cart-guest')
    const userCartList = localStorage.getItem(`cart-${email}`)
    if (email === '' && guestItems != null) {
      // 로그인 X + 장바구니에 상품이 있는데 또 추가하는 경우
      localStorage.setItem(`cart-guest`, JSON.stringify(state))
    } else if (email === '') {
      // 로그인 X + guest 장바구니 초기화
      localStorage.setItem(`cart-guest`, JSON.stringify([]))
    } else {
      if (guestItems !== null && guestItems.length > 0) {
        // 로그인 직후 guest 상태에서 장바구니에 상품이 있는 경우
        // 이전 장바구니와 합쳐서 저장
        userCartList !== null
          ? localStorage.setItem(
              `cart-${email}`,
              JSON.stringify([
                ...JSON.parse(userCartList),
                ...JSON.parse(guestItems)
              ])
            )
          : localStorage.setItem(`cart-${email}`, guestItems)
        delete localStorage['cart-guest']
      } else {
        // 로그인 후 사용자가 장바구니에 상품을 추가하는 경우
        localStorage.setItem(`cart-${email}`, JSON.stringify(state))
      }
    }
  }, [email, state])

  return [state, setState]
}
