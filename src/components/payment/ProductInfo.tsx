import styles from 'src/styles/components/payment/ProductInfo.module.scss'
import { useLocation } from 'react-router-dom'

export const ProductInfo = () => {
  const chosenProduct = useLocation().state
  console.log(chosenProduct)
  return (
    <div className={styles.container}>
      <h3>상품정보</h3>
      <div className={styles.wrapper}>
        <img
          src={chosenProduct.thumbnail}
          alt=""
        />
        <div className={styles.info}>
          <span className={styles.title}>{chosenProduct.title}</span>
          <span className={styles.quantity}>
            수량: {chosenProduct.quantity}개
          </span>
          <span className={styles.price}>{chosenProduct.price}원</span>
        </div>
      </div>
    </div>
  )
}
