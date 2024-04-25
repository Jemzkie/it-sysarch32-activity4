import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../routes/routes";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });
  const [requestMessage, setRequestMessage] = useState(null);

  const getInputs = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const postRegister = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(fetchRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      });
      const response = await request.json();
      if (request.ok) {
        navigate("/");
      } else {
        setRequestMessage(response.message);
      }
    } catch (error) {
      setRequestMessage(error.message);
    }
  };
  return (
    <div className="current-layer">
      <form onSubmit={postRegister}>
        <label className="main-font font-bold large-header">Register</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signUp.email}
          onChange={getInputs}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signUp.password}
          onChange={getInputs}
        />
        {requestMessage && (
          <label style={{ color: "red" }}>{requestMessage}</label>
        )}
        <button type="submit">Register</button>
        <Link className="link main-font" to="/">
          Sign In Here
        </Link>
      </form>
    </div>
  );
}

export default Signup;
