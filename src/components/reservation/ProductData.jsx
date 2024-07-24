import { useState, useEffect } from "react";

const ProductData = (initialStartDate, initialEndDate) => {
  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    name: "",
    price: 0,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("/productData.json"); // 실제 JSON 파일 경로
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct({
          image: data.image,
          title: data.title,
          description: data.description,
          name: data.hostName,
          price: data.price,
        });
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return product;
};

export default ProductData;
