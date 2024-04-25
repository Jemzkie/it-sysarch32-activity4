import { useEffect, useState } from "react";
import { fetchProducts, fetchOrders, main } from "../routes/routes";
import { useParams } from "react-router-dom";
import Bottom from "./Bottom";

function Product() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const [orderProduct, setOrderProduct] = useState({
    productId: "",
    quantity: "",
  });
  const [requestMessage, setRequestMessage] = useState(null);
  const [currentProduct, setCurrentProduct] = useState([]);

  const handleOrder = (e) => {
    setOrderProduct({
      ...orderProduct,
      [e.target.name]: e.target.value,
    });
  };

  const postOrderRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(fetchOrders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: currentProduct._id,
          quantity: orderProduct.quantity,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/orders";
      } else {
        setRequestMessage(data.message);
      }
    } catch (error) {
      setRequestMessage(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(fetchProducts + "/" + productId);
      const data = await response.json();
      const dataImage = data.product.productImage.substring(
        data.product.productImage.lastIndexOf("\\") + 1
      );
      data.product.productImage = dataImage;
      setCurrentProduct(data.product);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="layer-wrapper">
      <div className="main-layer">
        <div className="current-container">
          <img
            src={main + currentProduct.productImage}
            alt={currentProduct.productImage}
          />
          <label>{currentProduct.name}</label>
          <label>{currentProduct.price}</label>
        </div>
      </div>
      <div className="side-layer">
        <form onSubmit={postOrderRequest}>
          <label>Order Item</label>
          <input
            type="text"
            onChange={handleOrder}
            value={productId}
            name="productId"
            placeholder="Product ID"
            hidden
          />
          <input
            type="text"
            onChange={handleOrder}
            name="quantity"
            value={currentProduct.quantity}
            placeholder="Quantity"
            required
          />
          {requestMessage && <label>{requestMessage}</label>}
          <button type="submit">Order</button>
        </form>
        <Bottom />
      </div>
    </div>
  );
}

export default Product;
