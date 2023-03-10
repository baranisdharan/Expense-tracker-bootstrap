import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { UpdateProfile } from "./components/UpdateProfile";
import { ForgotPassword } from "./components/ForgotPassword";
import Expenses from "./pages/Expenses";
import Premium from "./components/Premium";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const themeMode = useSelector((state) => state.theme.theme);
  return (
    <Fragment>
      <MainNavigation />
      <div className={themeMode === "dark" ? "dark" : ""}>
        <Premium />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
