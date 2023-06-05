import {  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods,
  Confirmation } from 'components/payment/index'

export const Payment = () => {
  return (
    <div>
    <ProductInfo />
      <UserAddress />
      <PriceInfo />
      <PaymentMethods />
      <Confirmation />
    </div>
  )
}
