// Importez les dépendances nécessaires
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axois-client.js";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Utilisez le hook useNavigate pour gérer la redirection

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);

        if (data.user.role === "user") {
          navigate("/home"); // Redirige vers /home pour les utilisateurs
        } else if (data.user.role === "admin") {
          navigate("/dashboard"); // Redirige vers /dashboard pour les admins
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

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
