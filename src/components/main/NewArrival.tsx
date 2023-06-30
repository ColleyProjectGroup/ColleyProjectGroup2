import { useEffect, useState, useContext } from 'react'
import { adminInstance } from 'api/index'
import 'styles/layout/NewArrival.scss'
import { Link } from 'react-router-dom'
import { RecentlyContext } from 'contexts/index'
import { Product } from 'types/index'
import noImage from 'public/no-photo.png'

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminInstance.get('/products')

        const filteredProducts = response.data.filter(
          (product: { tags: string | string[] }) => product.tags.includes('NEW')
        )
        setNewProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    fetchProducts()
  }, [])

  const calculateDiscountedPrice = (price: number, discountRate?: number) => {
    if (discountRate) {
      const discountAmount = price * (discountRate / 100)
      return price - discountAmount
    }
    return price
  }

  // 최근 본 상품 세션 저장 처리
  const { recentlyViewedList, setRecentlyViewedList } =
    useContext(RecentlyContext)

  const onSaveProductRecently = (product: Product) => {
    const isExist = recentlyViewedList.find(p => p.id === product.id)
    if (!isExist) {
      setRecentlyViewedList([...recentlyViewedList, product])
    } else {
      const removeList = recentlyViewedList.filter(p => p.id !== product.id)
      setRecentlyViewedList([...removeList, product])
    }
  }

  return (
    <div className="new-arrival">
      <div className="inner">
        <h2 className="title">NEW ARRIVAL</h2>
        <h3 className="sub-title">콜리에 새롭게 들어온 제품을 소개합니다.</h3>
        <div className="products">
          {newProducts.map(product => (
            <div key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => onSaveProductRecently(product)}>
                <div className="image">
                  <img
                    src={product.thumbnail || noImage}
                    alt={product.title}
                  />
                </div>
                <div className="title">{product.title}</div>
              </Link>
              <div className="price">
                {product.discountRate ? (
                  <>
                    <span className="originalPrice">
                      <del>{product.price.toLocaleString()}원</del>
                    </span>{' '}
                    <span className="discountedPrice">
                      {calculateDiscountedPrice(
                        product.price,
                        product.discountRate
                      ).toLocaleString()}
                      원
                    </span>
                  </>
                ) : (
                  <>{product.price.toLocaleString()}원</>
                )}
              </div>
              <div className="product__tags">
                {product.tags.includes('NEW') ? (
                  <div className="product__new">NEW</div>
                ) : null}
                {product.tags.includes('BEST') ? (
                  <div className="product__best">HOT</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { NewArrival }
