import React, { useState, useEffect } from "react";
import "./MainNavigation.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from "../store/Auth";

const MainNavigation = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (localStorage.getItem("idToken") == null) {
      // setUserLogin(false)
      dispatch(authAction.logout());
    } else {
      // setUserLogin(true)
      dispatch(authAction.login());
    }
  });
  const logoutHandler = async () => {
    await localStorage.removeItem("idToken");
    navigate("/login");
    dispatch(authAction.logout());
    alert("Logout Successful");
  };

  return (
    <div className="mainNav">
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>{" "}
          </li>
          {auth && (
            <li>
              <NavLink to="/expenses">Expenses</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {!auth && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {auth && (
            <li>
              <NavLink onClick={logoutHandler}>Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
