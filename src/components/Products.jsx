import { useEffect, useState } from "react";
import { fetchProducts, main } from "../routes/routes";
import { Link } from "react-router-dom";
import Bottom from "./Bottom.jsx";

function Products() {
  const token = localStorage.getItem("token");
  const [postProduct, setPostProduct] = useState({
    name: "",
    price: "",
    productImage: "",
  });
  const [requestMessage, setRequestMessage] = useState(null);
  const [products, setProducts] = useState([]);

  const getInputs = (e) => {
    if (e.target.name === "productImage") {
      setPostProduct({
        ...postProduct,
        productImage: e.target.files[0],
      });
    } else {
      setPostProduct({
        ...postProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      const postRequest = new FormData();
      postRequest.append("name", postProduct.name);
      postRequest.append("price", postProduct.price);
      postRequest.append("productImage", postProduct.productImage);

      const response = await fetch(fetchProducts, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: postRequest,
      });
      console.log(postRequest);
      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        setRequestMessage(data.message);
      }
    } catch (error) {
      setRequestMessage(error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(fetchProducts);
      const data = await response.json();
      setProducts(data.products);
    };
    getProducts();
  }, []);

  return (
    <div className="layer-wrapper">
      <div className="main-layer">
        {products.map((entry, index) => {
          const setImage = entry.productImage
            ? entry.productImage.substring(entry.productImage.lastIndexOf("\\"))
            : null;
          return (
            <Link className="link" to={`/products/${entry._id}`}>
              <div className="product-card" key={index}>
                <img src={main + setImage} />
                <label>{entry.name}</label>
                <label>{entry.price}</label>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="side-layer">
        <label className="center-element main-font">Post Product</label>
        <form onSubmit={handleProduct}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={postProduct.name}
            onChange={getInputs}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={postProduct.price}
            onChange={getInputs}
          />
          <input
            type="file"
            name="productImage"
            placeholder="Product Image"
            onChange={getInputs}
          />
          {requestMessage && <label>{requestMessage}</label>}
          <button type="submit">Post Product</button>
        </form>
        <Bottom />
      </div>
    </div>
  );
}

export default Products;
