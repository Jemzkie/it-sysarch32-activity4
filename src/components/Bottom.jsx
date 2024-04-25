import { Link } from "react-router-dom";

function Bottom() {
  const Logout = () => {
    localStorage.clear();
  };
  return (
    <div className="bottom">
      <Link to="/products" className="main-font link bottom-btn center-element">
        Products
      </Link>
      <Link to="/orders" className="main-font link bottom-btn center-element">
        Orders
      </Link>
      <Link
        to="/"
        onClick={Logout}
        className="main-font link bottom-btn center-element"
      >
        Logout
      </Link>
    </div>
  );
}

export default Bottom;
