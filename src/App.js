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
/* import DevelopmentMode from "./pages/DevelopmentMode"; */

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <Route path="/" exact component={DevelopmentMode} /> */}
          <Route path="/" exact component={RegisterSendOtp} />
          <Route path="/roneidlogin" component={HomePage} />
          <Route exact path="/profile" component={Main} />
          <Route path="/verifyotpregister" component={VerifyOtpRegister} />
          <Route path="/createuser" component={CreateUser} />
          <Route path="/userdetails" component={UserDetails} />
          <Route path="/login" component={LoginSendOtp} />
          <Route path="/verifyotplogin" component={VerifyOtpLogin} />
          <Route path="/settings/profile" component={ProfileSettings} />
          <Route path="/settings/Wallet" component={Wallet} />
          <Route path="/buyronecard" component={BuyRoneCard} />
          <Route path="/profile/:id" component={ShareProfile} />
          <Route path="/payment/:id" component={PaymentUser} />
          <Route path="/payment-success" component={SuccessPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
