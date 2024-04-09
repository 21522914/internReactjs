import { Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const PrivateRouteRecovery = () => {
  let phoneNum = localStorage.getItem("phoneNumberRecovery")
    ? localStorage.getItem("phoneNumberRecovery")
    : "";
  const test = () => {
    console.log(phoneNum);
  };
  return ({ test }, phoneNum === "" ? <Navigate to="/login" /> : <Outlet />)
};
export default PrivateRouteRecovery;
