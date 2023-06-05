import {
  PaymentInfo,
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods,
  Confirmation
} from 'components/payment/index'

export const Payment = () => {
  return (
    <>
      <PaymentInfo>
        <ProductInfo />
        <UserAddress />
        <PriceInfo />
        <PaymentMethods />
        <Confirmation />
      </PaymentInfo>
    </>
  )
}
