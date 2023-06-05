import {
  PaymentInfo,
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods,
  Confirmation
} from 'components/index'

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
