import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";

function App() {
  return (
    <>
          <Router>
            <Switch>
            <Route path="/profile" exact={true}>
                <ProfilePage />
              </Route>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/register" exact={true}>
                <RegisterPage />
              </Route>
              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </Route>
              <Route path="/" exact={true}>
                <HomePage />
              </Route>
            </Switch>
          </Router>
    </>
  );
}

export default App;
