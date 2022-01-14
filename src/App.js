import { Routes, Route } from "react-router-dom";
import OTP from "./pages/OTP";
import Signup from "./pages/signup/index";
import PageNotFound from "./pages/pageNotFound/index";
import Referral from "./pages/referral/index";
import WaitingList from "./pages/waitingList/index";
import SignedUp from "./pages/signedup";
import RequireAuth from "./components/requireAuth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route
        path="/otp"
        element={
          <RequireAuth>
            <OTP />
          </RequireAuth>
        }
      />
      <Route
        path="/referral"
        element={
          <RequireAuth>
            <Referral />
          </RequireAuth>
        }
      />
      <Route
        path="/waiting-list"
        element={
          <RequireAuth>
            <WaitingList />
          </RequireAuth>
        }
      />
      <Route
        path="/signed-up/:referral"
        element={
          <RequireAuth>
            <SignedUp />
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
