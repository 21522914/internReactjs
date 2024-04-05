import React, { useState } from "react";
import "./loginStyle.css";
import Login from "./login";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Image } from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import CloseButton from "react-bootstrap/CloseButton";

import { FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function OTPverify() {
  //show/hide password
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleForgotPass = () => {};
  //show/hide notification
  const [isVisible, setIsVisible] = useState(false);
  const [notiText, setNotiText] = useState("Vui lòng nhập Số điện thoại");

  const toggleVisibility = () => {
    setIsVisible(true);
  };

  //store input value
  const [formData, setFormData] = useState({
    button: 1,
    phoneNum: "",
    password: "",
  });

  //submit form
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (formData.button === 1) {
      console.log("Button Đăng nhập clicked!");
      //get data form FORM
      handleChangeInp(e);
      console.log(formData);
      //validate data
      var check = validateForm(formData);
      if (check) {
        console.log("form validated");
      }
    }
    if (formData.button === 2) {
      console.log("Button Đăng nhập SSO clicked!");
    }
  };

  const handleChangeInp = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("password");
  };

  const validateForm = (data) => {
    var result = true;
    if (data.phoneNum == "" || !regexPhoneNumber(data.phoneNum)) {
      toggleVisibility();
      result = false;
    } else if (data.password == "" || data.password.length <= 8) {
      setNotiText("Vui lòng nhập Mật khẩu");
      toggleVisibility();
      result = false;
    }
    return result;
  };

  const regexPhoneNumber = (phone) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone);
  };

  return (
    <Container className="my-5 container">
      <div className="text-center">
        <p style={{ color: "black", fontSize: "28px", fontWeight: "bold" }}>
          Xác thực đăng nhập
        </p>
      </div>
      <p>
        Trở về &nbsp; <Link to="/login">Đăng nhập</Link>
      </p>
      <p>Vui lòng nhập mã OTP đã được gửi đến số điện thoại</p>

      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p style={{ marginTop: "8rem", color: "#B5B5C3" }}>
          © Viettel Solutions. All rights reserved.
        </p>
      </div>
    </Container>
  );
}
export default OTPverify;
