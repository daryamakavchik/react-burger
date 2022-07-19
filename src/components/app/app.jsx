import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";

function App() {
  return (
    <>
          <Router>
            <Switch>
              <Route path="/login">
                <LoginPage />
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
