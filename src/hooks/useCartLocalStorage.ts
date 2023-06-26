import { useState, useEffect } from 'react'
import { CartProduct } from 'types/index'

export function useCartLocalStorage(
  email: string,
  initialState: CartProduct[]
) {
  const [state, setState] = useState<CartProduct[]>(
    () =>
      JSON.parse(
        window.localStorage.getItem(
          `${email !== '' ? `cart-${email}` : 'cart-guest'}`
        ) as string
      ) || initialState
  )

  useEffect(() => {
    const guestItems = localStorage.getItem('cart-guest')
    if (email === '' && guestItems != null) {
      window.localStorage.setItem(`cart-guest`, JSON.stringify(state))
    } else if (email === '') {
      window.localStorage.setItem(`cart-guest`, JSON.stringify([]))
    } else {
      console.log(guestItems)
      if (guestItems !== null && guestItems.length > 0) {
        console.log(guestItems)
        console.log(email)

        window.localStorage.setItem(`cart-${email}`, guestItems)
        delete localStorage['cart-guest']
      } else {
        window.localStorage.setItem(`cart-${email}`, JSON.stringify(state))
      }
    }
  }, [email, state])

  return [state, setState]
}
