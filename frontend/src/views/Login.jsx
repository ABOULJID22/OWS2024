import {Link, useNavigate } from "react-router-dom";
import axiosClient from "../axois-client.js";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";
import { useDispatch } from 'react-redux';
export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // pour la redirection
  const dispatch = useDispatch();
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        /* setUser(data.user);*/     //choix quand on utilise pas Redux
        setToken(data.token);
        dispatch({ type: 'LOGIN', payload: { user: data.user } });

        if (data.user.role === "user" ) {
          navigate("/home");
        } else if (data.user.role === "Admin") {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

          <input ref={emailRef} className="m-2" type="email" placeholder="Email" />
          <input ref={passwordRef} className="m-2" type="password" placeholder="Password" />
          <button className="btn btn-block bg-primary m-2 ">Login</button>
          <p className="message ">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
