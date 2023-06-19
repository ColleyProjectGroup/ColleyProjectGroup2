import styles from 'src/styles/components/payment/ProductInfo.module.scss'
export const ProductInfo = () => {
  return (
    <div className={styles.container}>
      <h3>상품정보</h3>
      <div>ProductInfo/바로구매 클릭시 /payment?query</div>
    </div>
  )
}
