import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import Register from "./components/screen/Register";
import Login from "./components/screen/Login";
import ForgotPassword from "./components/screen/ForgotPassword";
import ResetPassword from "./components/screen/ResetPassword";
import PrivateRouteCondition from "./components/routes/PrivateRouteCondition";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouteCondition
            exact
            path="/"
            component={PrivateRoute}></PrivateRouteCondition>
          <Route exact path="/register" component={Register} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/forgotpassword" component={ForgotPassword} />

          <Route
            exact
            path="/resetpassword/:resetToken"
            component={ResetPassword}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
