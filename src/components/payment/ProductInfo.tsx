import styles from 'src/styles/components/payment/ProductInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from 'contexts/index'

export const ProductInfo = () => {
  const { userCart } = useContext(CartContext)
  const chosenProduct = useLocation().state.products
  console.log(chosenProduct)
  return (
    <div className={styles.container}>
      <h3>상품정보</h3>
      <ul>
        {chosenProduct.map(product => {
          return (
            <li
              className={styles.wrapper}
              key={product.product.id}>
              <img
                src={product.product.thumbnail}
                alt=""
              />
              <div className={styles.product}>
                <span className={styles.title}>{product.product.title}</span>
                <span className={styles.quantity}>
                  수량: {product.quantity}개
                </span>
                <span className={styles.price}>
                  {product.product.price.toLocaleString()}원
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
