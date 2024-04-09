import React, { useState, useRef } from "react";
import "../Login/loginStyle.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import CloseButton from "react-bootstrap/CloseButton";

import { Link, useNavigate } from "react-router-dom";

function RecoveryPassword() {
  //store input value
  const [phoneNumInput, setPhoneNumInput] = useState("");
  //focus input
  const inputElementRef = useRef(null);

  const naivgate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Button Tiếp tục clicked!");
    //get data form FORM
    handleChangeInp(e);
    console.log(phoneNumInput);
    //validate data
    var check = validateForm(phoneNumInput);
    if (check) {
      console.log("form validated");
      localStorage.setItem("phoneNumberRecovery", phoneNumInput);
        //navigate to OTP recovery page
        naivgate("/recovery/otpinput");
    }
  };
  const handleChangeInp = (e) => {
    setPhoneNumInput(e.target.value);
  };

  const validateForm = (phoneNum) => {
    var result = true;
    if (phoneNum == "" || !regexPhoneNumber(phoneNum)) {
      result = false;
      setPhoneNumInput("");
      //inputElementRef.current.value('');
      setIsVisible(true);
      console.log("Phone number is invalid");
    }
    return result;
  };

  const regexPhoneNumber = (phone) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone);
  };
  const [isVisible, setIsVisible] = useState(false);

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
            style={{ width: "80%" }}
          >
            <img src={require("../../Assets/Toast noti.png")} alt="noti" />
            <span> &nbsp; Phone number is invalid </span>
            <CloseButton
              style={{ marginLeft: "1rem", fontSize: "10px" }}
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
            <p>
              Trở về &nbsp; <Link to="/login">Đăng nhập</Link>{" "}
            </p>
            <Form className="form-sign-in" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <Form.Label style={{ textAlign: "left", width: "100%" }}>
                  Số điện thoại
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phoneNumInput}
                  name="phoneNum"
                  id="phone-number"
                  style={{ backgroundColor: "#F3F6F9" }}
                  size="lg"
                  onChange={handleChangeInp}
                  ref={inputElementRef}
                  onClick={() => setIsVisible(false)}
                />
              </FormGroup>

              <Button
                className="mb-4 w-100 gradient-custom-2"
                variant="danger"
                type="submit"
                style={{ marginTop: "1rem" }}
              >
                Tiếp tục
              </Button>
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
export default RecoveryPassword;
