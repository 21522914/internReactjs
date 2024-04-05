import "./App.css";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import LoginOld from "../Login/login-old";
import Login from "../Login/login";
import OTPverify from "../Login/OTPverification";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/loginold" element={<LoginOld />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginauth" element={<OTPverify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
