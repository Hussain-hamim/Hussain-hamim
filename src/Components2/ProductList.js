import React, { useEffect, useState } from "react";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products", category);
    setProducts(["Clothings", "Household"]);
  }, [category]);

  return <div>ProductList: {category}</div>;
};

export default ProductList;
