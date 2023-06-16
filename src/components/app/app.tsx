import React, { useEffect, FC } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from '../../services/store';
import { TLocationState } from "../../utils/types";

import { ProtectedRoute } from "../protected-route";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { FeedPage } from "../../pages/feed";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { DetailsPage } from "../details-page/details-page";
import { Modal } from "../modal/modal";
import { AppHeader } from "../app-header/app-header";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderInfoPage } from "../../pages/orderinfo";

import { setIngredientsData, closeCurrentIngredient } from "../../services/actions";
import styles from "./app.module.css";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

export const App:FC = () => {
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data);
  const isForgotPassword = useSelector((store) => store.user.isForgotPassword);
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);
  const background = location.state && location.state.background;

  const closeAllModals = () => {
    history.goBack();
    dispatch(closeCurrentIngredient());
  };

  useEffect(() => {
    dispatch(setIngredientsData());
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.App}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          {!isUserAuthorized && (
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
          )}
          {isForgotPassword && (
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
          )}
          <Route path="/ingredients/:id" exact={true}>
            <DetailsPage title="Детали ингредиента">
              <IngredientDetails data={data} />
            </DetailsPage>
          </Route>
          <Route path="/profile/orders/:id" exact={true} > 
            <OrderInfoPage data={data}  /> 
          </Route>
          <Route path="/feed/:id" >
            <OrderInfoPage data={data} /> 
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
        </Switch>
        {background && (
          <>
            <Route
              path="/feed/:id"
              children={
                <Modal onClose={closeAllModals}>
                  <OrderInfoPage data={data} />
                </Modal>
              }
            />
            <ProtectedRoute
              path="/profile/orders/:id"
              children={
                <Modal onClose={closeAllModals}>
                  <OrderInfoPage data={data} />
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
  );
}
