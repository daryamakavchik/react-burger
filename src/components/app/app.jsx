import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { useSelector } from "react-redux";

function App() {
  return (
    <>
      <div className={styles.page}>
        <section className={styles.App}>
          <AppHeader />
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
        </section>
      </div>
    </>
  );
}

export default App;
