import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";

function App() {
  return (
    <>
          <Router>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/forgot-password">
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password">
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
