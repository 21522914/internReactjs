import React, { useState } from "react";
import "./loginStyle.css";
import OTPverify from "./OTPverification";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import CloseButton from "react-bootstrap/CloseButton";

import { FormGroup } from "react-bootstrap";

export default function LoginPhoneNumber() {
  const [isValiadated, setIsValiadated] = useState(false);
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
        setIsValiadated(true);
        handleLocalStorage();
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

  const handleLocalStorage = () => {
    localStorage.setItem("phoneNumber", formData.phoneNum);
    localStorage.setItem("password", formData.password);
    localStorage.setItem("isValiadated", isValiadated);
  };

  return (
    <Container className="my-5 container">
      <p style={{ color: "black", fontSize: "28px", fontWeight: "bold" }}>
        Đăng nhập
      </p>
      <Form className="form-sign-in" onSubmit={onSubmit}>
        <FormGroup className="mb-3">
          <Form.Label style={{ textAlign: "left", width: "100%" }}>
            Số điện thoại
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập số điện thoại"
            value={formData.phoneNum}
            name="phoneNum"
            id="phone-number"
            style={{ backgroundColor: "#F3F6F9" }}
            size="lg"
            onChange={handleChangeInp}
            onClick={() => setIsVisible(false)}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="form-password">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Label style={{ color: "#0965BA" }} onClick={handleForgotPass}>
              Quên mật khẩu?
            </Form.Label>
          </div>
          <InputGroup className="mb-3">
            <Form.Control
              type={type}
              placeholder="Nhập mật khẩu"
              aria-label="Password"
              aria-describedby="eye-icon"
              value={formData.password}
              onChange={handleChangeInp}
              onClick={() => setIsVisible(false)}
              name="password"
              style={{ backgroundColor: "#F3F6F9" }}
              size="lg"
            />
            <InputGroup.Text id="eye-icon" onClick={handleToggle}>
              <Icon className="absolute mr-10" icon={icon} size={20} />
            </InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <div className="text-center pt-1 mb-5 pb-1">
          <Button
            className="mb-4 w-100 gradient-custom-2"
            variant="danger"
            type="submit"
            onClick={() => (formData.button = 1)}
          >
            Đăng nhập
          </Button>
          <Button
            className="mb-4 w-100 gradient-custom-2"
            variant="danger"
            type="submit"
            onClick={() => (formData.button = 2)}
          >
            Đăng nhập SSO
          </Button>
        </div>
      </Form>
    </Container>
  );
}
