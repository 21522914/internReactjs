import { Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const PrivateRouteOTPinput = () => {
  let phoneNum = localStorage.getItem("phoneNumber")
    ? localStorage.getItem("phoneNumber")
    : "";
  const test = () => {
    console.log(phoneNum);
  };
  return { test }, phoneNum === "" ? <Navigate to="/login" /> : <Outlet />;
};
export default PrivateRouteOTPinput;
