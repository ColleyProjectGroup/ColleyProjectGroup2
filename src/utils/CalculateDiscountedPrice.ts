export const calculateDiscountedPrice = (
  price: number,
  discountRate: number | null | undefined
) => {
  if (discountRate && discountRate != 0) {
    const discountAmount = price * (discountRate / 100)
    return price - discountAmount
  }
  return price
}
