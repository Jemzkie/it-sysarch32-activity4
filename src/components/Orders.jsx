import { useEffect, useState } from "react";
import { fetchOrders } from "../routes/routes";
import { Link } from "react-router-dom";
import Bottom from "./Bottom";

function Orders() {
  const token = localStorage.getItem("token");
  const [requestMessage, setRequestMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const request = await fetch(fetchOrders, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await request.json();
        if (request.ok) {
          setOrders(data.orders);
          console.log(data);
        } else {
          setRequestMessage(request.statusText);
        }
      } catch (error) {
        setRequestMessage(error.message);
      }
    };
    getOrders();
  }, [token]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="main-font">Order ID</th>
            <th className="main-font">Product ID</th>
            <th className="main-font">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((orderDetails, index) => (
            <tr key={index}>
              <td>
                <Link className="main-font" to={`/orders/${orderDetails._id}`}>
                  {orderDetails._id}
                </Link>
              </td>
              <td>
                {orderDetails.product ? (
                  <Link
                    className="main-font"
                    to={`/products/${orderDetails.product._id}`}
                  >
                    {orderDetails.product._id}
                  </Link>
                ) : (
                  "Product ID not available"
                )}
              </td>
              <td className="main-font">{orderDetails.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bottom />
    </div>
  );
}

export default Orders;
