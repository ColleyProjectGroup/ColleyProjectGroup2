import { Link } from 'react-router-dom'
import styles from 'styles/components/cart/cartHeader.module.scss'
export const CartHeader = () => {
  return (
    <div>
      <div className={styles.path}>
        <Link to="/">홈 /</Link>
        <strong> 장바구니</strong>
      </div>
      <h2>장바구니</h2>
      <ol className={styles.step}>
        <li className={styles.selected}>장바구니</li>
        <li className={styles.selected}>주문서작성</li>
        <li>주문완료</li>
      </ol>
      <div className={styles.tabs}>
        {/* 국내배송상품 주문숫자 연동 */}
        <div className={`${styles.tab} ${styles.active}`}>국내배송상품 (0)</div>
        <div className={`${styles.tab} ${styles.inactive}`}></div>
        <div className={`${styles.tab} ${styles.inactive}`}></div>
        <div className={`${styles.tab} ${styles.inactive}`}></div>
        <div className={`${styles.tab} ${styles.inactive}`}></div>
      </div>
    </div>
  )
}
