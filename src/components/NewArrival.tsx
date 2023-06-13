import React, { useEffect, useState } from "react";
import { adminInstance } from "../api/axios";
import "../styles/layout/NewArrival.scss";

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  discountRate?: number;
}

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminInstance.get("/products");

        const filteredProducts = response.data.filter(
          (product: { tags: string | string[] }) => product.tags.includes("NEW")
        );

        setNewProducts(filteredProducts);
        console.log("신규 상품 리스트", filteredProducts);
      } catch (error) {
        console.error("상품 조회 오류 발생", error);
      }
    };

    fetchProducts();
  }, []);

  const calculateDiscountedPrice = (price: number, discountRate?: number) => {
    if (discountRate) {
      const discountAmount = price * (discountRate / 100);
      return price - discountAmount;
    }
    return price;
  };

  return (
    <div className="NewArrival">
      <div className="Inner">
        <h2 className="Title">NEW ARRIVAL</h2>
        <h3 className="SubTitle">콜리에 새롭게 들어온 제품을 소개합니다.</h3>
        <div className="Products">
          {newProducts.map((product) => (
            <div key={product.id}>
              <div className="Image">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="Title">{product.title}</div>
              <div className="Price">
                {product.discountRate ? (
                  <>
                    <span className="OriginalPrice">
                      <del>{product.price.toLocaleString()}원</del>
                    </span>{" "}
                    <span className="DiscountedPrice">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { NewArrival };
