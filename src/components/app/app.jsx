import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import {
  setIngredientsData,
  closeCurrentIngredient,
} from "../../services/actions";
import DetailsModal from "../details-modal/details-modal";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from './app.module.css';

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const ingr = useSelector((store) => store.ingr.currentIngredient);
  const data = useSelector((store) => store.data.data);
  const isForgotPassword = useSelector((store) => store.user.isForgotPassword);
  const background = location.state && location.state.background;

  const closeAllModals = () => {
    history.goBack();
    dispatch(closeCurrentIngredient(ingr), [dispatch]);
  };
  useEffect(() => {
    dispatch(setIngredientsData());
  }, [dispatch]);

  return (
    <>
      <div className={styles.page}>
      <section className={styles.App}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        { isForgotPassword && <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route> }
        <Route path="/ingredients/:id" exact={true}>
          <DetailsModal title="Детали ингредиента">
            <IngredientDetails data={data} />
          </DetailsModal>
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
      {background && (
        <>
          <Route
            path="/"
            exact={true}
            children={
              <Modal>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            children={
              <Modal title="Детали ингредиента" onClose={closeAllModals}>
                <IngredientDetails data={data} />
              </Modal>
            }
          />
        </>
      )}
      </section>
      </div>
    </>
  );
}

export default App;
