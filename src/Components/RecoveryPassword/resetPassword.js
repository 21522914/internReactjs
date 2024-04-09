import React, { useState, useRef } from "react";
import "../Login/loginStyle.css";

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

import { Link, useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const navigate = useNavigate();

  //focus input
  const inputElementRef = useRef(null);

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

  //show/hide notification
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(false);
  };

  //store input value
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  //submit form
  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Button Hoàn tất clicked!");
    //get data form FORM
    handleChangeInp(e);
    console.log(formData);
    //validate data
    var check = validateForm(formData);
    if (check) {
      console.log("form validated");
      handleLocalStorage();
      navigate("/login");
    } else {
      console.log("form not validated");
      // formData.password = "";
      // formData.confirmPassword = "";
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
    if(data.password !== data.confirmPassword || !valiadtePassword(data.password)){
      setIsVisible(true);
      result = false;
    }
    return result;
  };

  const valiadtePassword = (password) => {
    let result = true;

    // Check password length
    if (password.length < 8) result = false;
    // Contains lowercase
    if (!/[a-z]/.test(password)) result = false;
    // Contains uppercase
    if (!/[A-Z]/.test(password)) result = false;  
    // Contains numbers
    if (!/\d/.test(password)) result = false;
    // Contains special characters
    if (!/[~!@#$%^&*]/.test(password)) result = false;
    return result;
  };

  const handleLocalStorage = () => {
    let infoRecoveryPassword = JSON.parse(localStorage.getItem("info-recovery"));
    infoRecoveryPassword.push({ 'newPassword': formData.password });
    console.log(infoRecoveryPassword);
    localStorage.setItem("info-recovery-password", JSON.stringify(infoRecoveryPassword));
    localStorage.removeItem("info-recovery");
    localStorage.removeItem("phoneNumberRecovery");
  };

  return (
    <Container className="my-5 container">
      <Row>
        <Col col="5" className="mb-5">
          <div className="left-column">
            <img
              src={require("../../Assets/Background.png")}
              style={{ width: "100%" }}
              alt="logo"
            />
          </div>
        </Col>
        <Col col="7" className="mb-5" style={{ marginTop: "1rem" }}>
          <div
            className={isVisible ? "visible" : "hidden"}
            style={{ width: "75%", marginLeft: "10rem" }}
          >
            <img src={require("../../Assets/Toast noti.png")} alt="noti" />
            <span>
              {" "}
              &nbsp; Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm số, chữ cái
              thường và chữ cái IN HOA, và phải có ít nhất 1 ký tự đặc biệt
              ~!@#$%^&*
            </span>
            <CloseButton
              style={{ marginLeft: "20rem", fontSize: "12px" }}
              onClick={() => {
                setIsVisible(false);
                inputElementRef.current.focus();
              }}
            />
          </div>
          <div className="right-column">
            <div className="text-center">
              <img
                src={require("../../Assets/Logo.jpg")}
                style={{ width: "20%" }}
                alt="logo"
              />
              <p className="textStyle">
                Nền tảng kinh tế số thành phố <br /> Hồ Chí Minh
              </p>
            </div>
            <p style={{ color: "black", fontSize: "28px", fontWeight: "bold" }}>
              Khôi phục mật khẩu
            </p>
            <Form className="form-sign-in" onSubmit={onSubmit}>
              <FormGroup className="mb-3" controlId="form-password">
                <Form.Label style={{ textAlign: "left", width: "100%" }}>
                  Mật khẩu mới
                </Form.Label>
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
                    ref={inputElementRef}
                  />
                  <InputGroup.Text id="eye-icon" onClick={handleToggle}>
                    <Icon className="absolute mr-10" icon={icon} size={20} />
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3" controlId="form-password-confirm">
                <Form.Label style={{ textAlign: "left", width: "100%" }}>
                  Xác nhận mật khẩu mới
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={type}
                    placeholder="Nhập mật khẩu"
                    aria-label="Password"
                    aria-describedby="eye-icon"
                    value={formData.confirmPassword}
                    onChange={handleChangeInp}
                    onClick={() => setIsVisible(false)}
                    name="confirmPassword"
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
                >
                  Hoàn tất
                </Button>
              </div>
            </Form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p style={{ marginTop: "8rem", color: "#B5B5C3" }}>
                © Viettel Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default ResetPasswordForm;
