import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const url = "http://localhost:3020/api/auth/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }), // what we are giving in body so that it gets store in database
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      localStorage.setItem("token", jsonResponse.token);
      navigate("/");
      props.showAlert("success" , "You're succesfully log in")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <input
            type="email"
            onChange={handleOnChange}
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Write your email here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <b>Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleOnSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
