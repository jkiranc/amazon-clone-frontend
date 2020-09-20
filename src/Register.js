import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { authenticate, isAuth } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";

function Register({history}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });


  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });

            toast.success(res.data.message);
            history.push("/login")
          })
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <div className="login">
      <ToastContainer />
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login_container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input type="email" onChange={handleChange("email")} value={email} />
          <h5>Name</h5>
          <input
            type="text"
            onChange={handleChange('name')}
            value={name}
          /><h5>Password</h5>
          <input
            type="password"
            onChange={handleChange("password1")}
            value={password1}
          /><h5>Password</h5>
          <input
            type="password"
            onChange={handleChange("password2")}
            value={password2}
          />

          <button type="submit" className="login_signInButton">
            Create Account
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <Link to='/login'className="login_registerButton">
          Already Have Account?
        </Link>
      </div>
    </div>
  );
}

export default Register;
