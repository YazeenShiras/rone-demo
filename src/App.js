import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/* import Main from "./pages/Main";
import RegisterSendOtp from "./pages/RegisterSendOtp";
import VerifyOtpRegister from "./pages/VerifyOtpRegister";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import LoginSendOtp from "./pages/LoginSendOtp";
import VerifyOtpLogin from "./pages/VerifyOtpLogin";
import ProfileSettings from "./pages/ProfileSettings";
import AccountSettings from "./pages/AccountSettings";
import Wallet from "./pages/Wallet";
import BuyRoneCard from "./pages/BuyRoneCard";
import HomePage from "./pages/HomePage";
import ShareProfile from "./pages/ShareProfile";
import PaymentUser from "./pages/PaymentUser";
import SuccessPage from "./pages/SuccessPage";
import QrScan from "./pages/QrScan";
import Tc from "./pages/Tc";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import DisclaimerHome from "./pages/DisclaimerHome";
import TcHome from "./pages/TcHome";
import PrivacyPolicyHome from "./pages/PrivacyPolicyHome";
import CookiePolicyHome from "./pages/CookiePolicyHome";
import RefundPolicyHome from "./pages/RefundPolicyHome";
import About from "./pages/About";
import AboutHome from "./pages/AboutHome";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import EmailVerification from "./pages/EmailVerification";
import EmailUpdate from "./pages/EmailUpdate"; */
import DevelopmentMode from "./pages/DevelopmentMode";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={DevelopmentMode} />
          <Route path="/register" component={DevelopmentMode} />
          <Route path="/success-payment" component={DevelopmentMode} />
          <Route exact path="/profile" component={DevelopmentMode} />
          <Route path="/admin/email-update" component={DevelopmentMode} />
          <Route path="/about" component={DevelopmentMode} />
          <Route path="/link/about" component={DevelopmentMode} />
          <Route path="/disclaimer" component={DevelopmentMode} />
          <Route path="/link/disclaimer" component={DevelopmentMode} />
          <Route path="/terms-and-conditions" component={DevelopmentMode} />
          <Route
            path="/link/terms-and-conditions"
            component={DevelopmentMode}
          />
          <Route path="/privacy-policy" component={DevelopmentMode} />
          <Route path="/link/privacy-policy" component={DevelopmentMode} />
          <Route path="/cookie-policy" component={DevelopmentMode} />
          <Route path="/link/cookie-policy" component={DevelopmentMode} />
          <Route path="/refund-policy" component={DevelopmentMode} />
          <Route path="/link/refund-policy" component={DevelopmentMode} />
          <Route path="/verifyotpregister" component={DevelopmentMode} />
          <Route path="/createuser" component={DevelopmentMode} />
          <Route path="/userdetails" component={DevelopmentMode} />
          <Route path="/login" component={DevelopmentMode} />
          <Route path="/verifyotplogin" component={DevelopmentMode} />
          <Route path="/settings/profile" component={DevelopmentMode} />
          <Route path="/settings/Accont" component={DevelopmentMode} />
          <Route path="/settings/Wallet" component={DevelopmentMode} />
          <Route path="/settings/QR-code" component={DevelopmentMode} />
          <Route path="/buyronecard" component={DevelopmentMode} />
          <Route path="/profile/:id" component={DevelopmentMode} />
          <Route path="/email-verification" component={DevelopmentMode} />
          <Route path="/:id" component={DevelopmentMode} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
