import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import RegisterSendOtp from "./pages/RegisterSendOtp";
import VerifyOtpRegister from "./pages/VerifyOtpRegister";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import LoginSendOtp from "./pages/LoginSendOtp";
import VerifyOtpLogin from "./pages/VerifyOtpLogin";
import ProfileSettings from "./pages/ProfileSettings";
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
import About from "./pages/About";
import CookiePolicy from "./pages/CookiePolicy";
import RefundPolicy from "./pages/RefundPolicy";
import SelectCountry from "./components/SelectCountry";
import EmailVerification from "./pages/EmailVerification";
/* import DevelopmentMode from "./pages/DevelopmentMode"; */

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <Route path="/" exact component={DevelopmentMode} /> */}
          <Route path="/" exact component={HomePage} />
          <Route path="/selectCountry" component={SelectCountry} />
          <Route path="/register" component={RegisterSendOtp} />
          <Route path="/success-payment" component={SuccessPage} />
          <Route exact path="/profile" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/disclimer" component={Disclaimer} />
          <Route path="/terms-and-conditions" component={Tc} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route path="/verifyotpregister" component={VerifyOtpRegister} />
          <Route path="/createuser" component={CreateUser} />
          <Route path="/userdetails" component={UserDetails} />
          <Route path="/login" component={LoginSendOtp} />
          <Route path="/verifyotplogin" component={VerifyOtpLogin} />
          <Route path="/settings/profile" component={ProfileSettings} />
          <Route path="/settings/Wallet" component={Wallet} />
          <Route path="/settings/QR-code" component={QrScan} />
          <Route path="/buyronecard" component={BuyRoneCard} />
          <Route path="/profile/:id" component={ShareProfile} />
          <Route path="/email/:id" component={EmailVerification} />
          <Route path="/:id" component={PaymentUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
