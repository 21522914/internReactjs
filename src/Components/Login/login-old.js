import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import "@fontsource/nunito-sans";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import validator from "validator";

function LoginOld() {
  const containerStyle = {
    fontFamily: "Nunito Sans",
  };
  const colStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    flexWrap: "wrap",
    marginTop: "4rem",
  };

  const formStyle = {
    width: "70%",
    marginLeft: "1.5rem",
  };

  const labelStyle = {
    display: "flex",
    fontWeight: "700",
    fontSize: "14px",
  };

  const inputStyle = {
    backgroundColor: "#F3F6F9",
    border: "0",
    borderRadius: "5px",
    width: "100%",
    height: "3rem",
    paddingLeft: "1em",
    marginBottom: "2rem",
    marginTop: "1rem",
  };
  const imageStyle = {
    width: "100%",
  };

  const textStyle = {
    color: "red",
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    marginBottom: "1rem",
  };

  const goLoginAuth = () => {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

  //xử lý eye icon và hiển thị mật khẩu
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

  //xử lý thông báo nhắc nhở
  const AlertPhoneNumInput = () => {
    return (
      <div
        style={{
          backgroundColor: "#FFF0EE",
          width: "25%",
          marginLeft: "70%",
          height: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src={require("../../Assets/Toast noti.png")} />
        <span> &nbsp; Số điện thoại không hợp lệ</span>
        <CloseButton
          style={{ marginLeft: "2rem", fontSize: "10px" }}
          onClick={handleCloseButton}
        />
      </div>
    );
  };

  const handleCloseButton = () => {
    setAlertPassInp(false);
    setAlertPhoneInp(false);
  };

  const AlertPasswordInput = () => {
    return (
      <div
        style={{
          backgroundColor: "#FFF0EE",
          width: "25%",
          marginLeft: "70%",
          height: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src={require("../../Assets/Toast noti.png")} />
        <span> &nbsp; Mật khẩu không hợp lệ</span>
        <CloseButton
          style={{ marginLeft: "3.5rem", fontSize: "10px" }}
          onClick={handleCloseButton}
        />
      </div>
    );
  };

  const [alertPhoneInp, setAlertPhoneInp] = useState(false);
  const [alertPassInp, setAlertPassInp] = useState(false);

  //lưu giá trị input
  const state = {
    button: 1,
    phoneNum: "",
    password: "",
  };
  
  const regexPhoneNumber = (phone) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber) ? true : false;
  };

  const validateForm = () => {
    let isValid = true;

    // Validate phone
    if (!state.phoneNum) {
      setAlertPhoneInp(true);
      isValid = false;
    } else if (!regexPhoneNumber(state.phoneNum)) {
      setAlertPhoneInp(true);
      isValid = false;
    }

    // Validate password
    else if (!state.password) {
      setAlertPassInp(true);
      isValid = false;
    } else if (state.password.length < 8) {
      setAlertPassInp(true);
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.button === 1) {
      console.log("Button Đăng nhập clicked!");
      //validate dữ liệu
      if (validateForm()) {
        // Form is valid, you can submit or process the data here
        console.log("Form data:", state);
        
        goLoginAuth();
      } else {
        console.log("Form data:", state);
      }
    }
    if (state.button === 2) {
      console.log("Button Đăng nhập SSO clicked!");
    }
  };
  return (
    <Container style={containerStyle}>
      {alertPhoneInp ? <AlertPhoneNumInput /> : null}
      {alertPassInp ? <AlertPasswordInput /> : null}
      <Row>
        <Col xs={6} style={{ backgroundColor: "#FFF0EE" }}>
          <Image
            src={require("../../Assets/Background.png")}
            style={imageStyle}
          />
        </Col>
        <Col xs={6} style={colStyle}>
          <Image
            src={require("../../Assets/Logo.jpg")}
            style={{ width: "20%", marginLeft: "30%" }}
          />
          <p style={textStyle}>
            Nền tảng kinh tế số thành phố <br /> Hồ Chí Minh
          </p>
          <p style={{ color: "black", fontSize: "28px", fontWeight: "bold" }}>
            Đăng nhập
          </p>
          <form onSubmit={onSubmit} style={formStyle}>
            <label style={labelStyle}>Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              style={inputStyle}
              onChange={(e) => state.phoneNum = e.target.value}
              onClick={() => setAlertPhoneInp(false)}
            />

            <Row>
              <Col>
                <label style={labelStyle}>Mật khẩu</label>
              </Col>
              <Col className="text-right">
                <p style={{ color: "#0965BA", cursor: "pointer" }}>
                  Quên mật khẩu?
                </p>
              </Col>
            </Row>
            <input
              type={type}
              name="password"
              value={state.password}
              onChange={(e) => state.password = e.target.value}
              onClick={() => setAlertPassInp(false)}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              style={inputStyle}
            />
            <span
              className="flex justify-around items-center"
              onClick={handleToggle}
              style={{
                color: "#73777A",
                position: "absolute",
                right: "16%",
                bottom: "45%",
              }}
            >
              <Icon className="absolute mr-10" icon={icon} size={20} />
            </span>

            <Button
              type="submit"
              variant="danger"
              style={buttonStyle}
              onClick={() => (state.button = 1)}
            >
              Đăng nhập
            </Button>

            <Button
              type="submit"
              variant="danger"
              style={buttonStyle}
              onClick={() => (state.button = 2)}
            >
              Đăng nhập SSO
            </Button>
          </form>
          <p style={{ marginTop: "8rem", color: "#B5B5C3" }}>
            © Viettel Solutions. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginOld;
