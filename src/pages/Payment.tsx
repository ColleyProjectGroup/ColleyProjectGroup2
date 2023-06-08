import {
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods,
  Confirmation
} from 'components/payment/index'
import styles from 'styles/components/payment/Payment.module.scss'

export const Payment = () => {
  return (
    <div className={styles.container}>
      <ProductInfo />
      <UserAddress />
      <PriceInfo />
      <PaymentMethods />
      <Confirmation />
    </div>
  )
}
