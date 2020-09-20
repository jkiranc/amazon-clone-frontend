import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { authenticate, isAuth } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "./StateProvider";

function Login({ history }) {
  const [{}, dispatch] = useStateValue();
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    textChange: "Sign In",
  });
  const { email, password1, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1,
        })
        .then((res) => {
            console.log(":res",res)
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: "",
              password1: "",
              textChange: "Submitted",
            });
            dispatch({
                type: "SET_TOKEN",
                token: res.data.token,
            })
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
            history.push("/");
          });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            email: "",
            password1: "",
            textChange: "Sign In",
          });
          console.log(err.response);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <div className="login">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input type="text" onChange={handleChange("email")} value={email} />
          <h5>Password</h5>
          <input
            type="password"
            onChange={handleChange("password1")}
            value={password1}
          />

          <button type="submit" className="login_signInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <Link to="/register" className="login_registerButton">
          Create your Amazon account
        </Link>
      </div>
    </div>
  );
}

export default Login;
