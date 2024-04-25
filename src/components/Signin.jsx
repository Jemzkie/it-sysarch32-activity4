import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "../routes/routes";

function Signin() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [requestMessage, setRequestMessage] = useState(null);

  const getInputs = (e) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
  };

  const postLogin = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(fetchLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signIn),
      });
      const response = await request.json();
      if (request.ok) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.email);
        navigate("/products");
      } else {
        setRequestMessage(response.message);
      }
    } catch (error) {
      setRequestMessage(error.message);
    }
  };
  return (
    <div className="current-layer">
      <form onSubmit={postLogin}>
        <label className="main-font font-bold large-header">Login</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signIn.email}
          onChange={getInputs}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signIn.password}
          onChange={getInputs}
        />
        {requestMessage && (
          <label style={{ color: "red" }}>{requestMessage}</label>
        )}
        <button type="submit">Login</button>
        <Link className="link main-font" to="/signup">
          Sign Up Here
        </Link>
      </form>
    </div>
  );
}

export default Signin;
