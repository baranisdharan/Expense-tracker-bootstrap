import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAULICMLkKpLi7eJ9CIrBXM3fvXPmVHqoA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
        console.log(data);
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="main-form-resetpassword" style={{ paddingTop: 50 + "px" }}>
      <form onSubmit={forgotPasswordHandler} className="form">
        <h3>Forgot Password</h3>
        <label htmlFor="email">Enter Your Email</label>
        <input ref={emailRef} type="email" id="email" />

        <button type="submit">Send Link</button>
      </form>
    </div>
  );
};
