import "./App.css";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "../Login/loginForm";
import OTPverify from "../Login/OTPverify";
import PrivateRouteOTPinput from "../PrivateRoute/privateRouteOTPinput";
import RecoveryPassword from "../RecoveryPassword/recoveryPassword";
import OTPrecovery from "../RecoveryPassword/OTPrecovery";
import PrivateRouteRecovery from "../PrivateRoute/privateRouteRecovery";
import ResetPasswordForm from "../RecoveryPassword/resetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<PrivateRouteOTPinput />}>
            <Route path="/login/otpinput" element={<OTPverify />} />
          </Route>
          <Route path="/recovery" element={<RecoveryPassword />} />
          <Route element={<PrivateRouteRecovery />}>
            <Route path="/recovery/otpinput" element={<OTPrecovery />} />
            <Route path="/recovery/newpassword" element={<ResetPasswordForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
