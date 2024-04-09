import React, { useState } from "react";
import "./loginStyle.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import CloseButton from "react-bootstrap/CloseButton";

import { Link } from "react-router-dom";

import OtpInput from "react-otp-input";

function OTPverify() {
  //hide phone number
  const phoneNum = localStorage.getItem("phoneNumber");
  const hidePhoneNumber = (phoneNumber) => {
    // Tạo một chuỗi mới với số điện thoại đã ẩn
    const visibleStart = phoneNumber.substring(0, 3); // Lấy 3 số đầu
    const hiddenPart = phoneNumber
      .substring(3, phoneNumber.length - 2)
      .replace(/\d/g, "*"); // Ẩn số điện thoại trung gian
    const visibleEnd = phoneNumber.substring(phoneNumber.length - 2); // Lấy 2 số cuối

    // Kết hợp phần đã ẩn và phần hiển thị của số điện thoại
    return visibleStart + hiddenPart + visibleEnd;
  };

  //OTP handle
  const [otp, setOtp] = useState("");
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
    //focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyUp = (e) => {
    //delete
    const key = e.key.toLowerCase();
    if (key == "backspace" || key == "delete") {
      e.target.value = "";
      const prev = e.target.previousSibling;
      // if(prev){
      //   prev.focus();
      // }
      prev.focus();
      return;
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = () => {
    //gửi kèm OTP cùng số điện thoại để check
    const info = [phoneNum, otp];
    localStorage.setItem("info", JSON.stringify(info));
    //đọc mã OTP input
    alert("OTP input is " + otp);
    //xoá localstorage
    //localStorage.clear();
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
            style={{ width: "80%" }}
          >
            <img src={require("../../Assets/Toast noti.png")} alt="noti" />
            <span>
              {" "}
              &nbsp; Mã OTP không chính xác. Vui lòng nhập lại mã OTP mới{" "}
            </span>
            <CloseButton
              style={{ marginLeft: "1rem", fontSize: "10px" }}
              onClick={() => setIsVisible(false)}
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
              Xác thực đăng nhập
            </p>
            <p>
              Trở về &nbsp; <Link to="/login">Đăng nhập</Link>{" "}
            </p>
            <p>Vui lòng nhập mã OTP đã được gửi đến số điện thoại</p>
            <p>{hidePhoneNumber(phoneNum)}</p>
            {/* {otp.map((data, index) => {
              return (
                <input
                  className="otp-field"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  onKeyUp={(e) => handleKeyUp}
                />
              );
            })} */}
            <div className="otp-input">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input {...props} className="otp-field" />
                )}
                inputType="tel" 
              />
            </div>
            {/* <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
            />
            <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}

            <p>Gửi lại OTP</p>
            <Button
              className="mb-4 w-100 gradient-custom-2"
              variant="danger"
              
              onClick={handleConfirm}
            >
              Xác nhận
            </Button>

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
export default OTPverify;
