import { useState, useEffect } from "react";
import { fetchOrders } from "../routes/routes";
import { useParams } from "react-router-dom";
import Bottom from "./Bottom";
function Order() {
  const token = localStorage.getItem("token");
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [requestMessage, setRequestMessage] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(fetchOrders + "/" + orderId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentOrder([data.order]);
        } else {
          setRequestMessage(data.message);
        }
      } catch (error) {
        setRequestMessage(error);
      }
    };
    fetchOrder();
  }, [token]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="main-font">Order ID</th>
            <th className="main-font">Product ID</th>
            <th className="main-font">Product Name</th>
            <th className="main-font">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentOrder.map((orderDesc, index) => (
            <tr key={index}>
              <td className="main-font">{orderDesc._id}</td>
              <td className="main-font">
                {orderDesc.product ? orderDesc.product._id : "N/A"}
              </td>
              <td className="main-font">
                {orderDesc.product ? orderDesc.product.name : "N/A"}
              </td>
              <td className="main-font">{orderDesc.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bottom />
    </div>
  );
}

export default Order;
