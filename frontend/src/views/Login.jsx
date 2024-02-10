import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch } from "react-redux";
import GuestHome from "./GeustHome";
import Modal from "./Modal";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/GuestHome");
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setToken(data.token);
        dispatch({ type: "LOGIN", payload: { user: data.user } });

        if (data.user.role === "user") {
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
    <>
      <GuestHome handleModalOpen={handleModalOpen} />

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {" "}
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>

            {message && (
              <div className="alert">
                <p>{message}</p>
              </div>
            )}

            <input
              ref={emailRef}
              className="m-2"
              type="email"
              placeholder="Email"
            />
            <input
              ref={passwordRef}
              className="m-2"
              type="password"
              placeholder="Password"
            />
            <button className="btn btn-block bg-primary m-2">Login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </Modal>
    </>
  );
}
