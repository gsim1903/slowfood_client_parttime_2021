import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [orderInProgress, setOrderInProgress] = useState(false)


  const fetchProducts = async () => {
    const response = await axios.get("https://reqres.in/api/products");
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProductList = products?.sort((a, b) =>
    a.category < b.category ? 1 : -1
  );


  const addToOrder = async (id) => {
    if(orderInProgress === false)
    {
      const response = await axios.post("https://reqres.in/api/orders", {
        params: { product_id: id },
      });
      setOrderInProgress(true)
      toast(response.data.message, { toastId: "message-box" });
    } else 
    {
      const response = await axios.put("https://reqres.in/api/orders", {
        params: { order_id: 1, product_id: id },
      });
      toast(response.data.message, { toastId: "message-box" });
    }

  

    // const response = await axios.get("https://reqres.in/api/orders", {
    //   params: { order_id: 1, product_id: id, price: price },

    // })
    
  };

  

  const productList = [];
  let prevCategory = "";
  for (let i = 0; i < sortedProductList?.length; i++) {
    let product = sortedProductList[i];

    if (product.category !== prevCategory) {
      productList.push(
        <List.Header key={product.category}>{product.category}</List.Header>
      );
    }

    productList.push(
      <List.Item key={product.id}>
        <button data-cy="order-button" onClick={() => addToOrder(product.id)} className="ui button">
        order +
        </button>
        {`${product.name} ${product.price}      `}
      </List.Item>
    );
    prevCategory = product.category;
  }

  return (
    <>
      <Container>
        <List inverted id="products-list" size="big">
          {productList}
        </List>
      </Container>
      <ToastContainer data-cy="message-box" />
    </>
  );
};

export default Products;
