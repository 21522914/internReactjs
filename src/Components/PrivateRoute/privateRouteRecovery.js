import { Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const PrivateRouteRecovery = () => {
  let phoneNum = localStorage.getItem("phoneNumberRecovery")
    ? localStorage.getItem("phoneNumberRecovery")
    : "";
  
  return ( phoneNum === "" ? <Navigate to="/login" /> : <Outlet />)
};
export default PrivateRouteRecovery;
