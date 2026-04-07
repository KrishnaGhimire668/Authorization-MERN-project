import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import AuthSuccess from "./pages/AuthSuccess";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp/:email" element={<VerifyOTP />} />
        <Route path="/change-password/:email" element={<ChangePassword />} />
        <Route path="/auth-success" element={<AuthSuccess />} />




      </Routes>
    </>
  );
};

export default App;
