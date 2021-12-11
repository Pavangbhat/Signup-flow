import { Routes, Route } from "react-router-dom";
import OTP from "./pages/OTP";
import Signup from "./pages/signup/index";
import PageNotFound from "./pages/pageNotFound/index";
import Referral from "./pages/referral/index";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/referral" element={<Referral />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
