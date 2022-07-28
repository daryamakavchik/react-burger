import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import DetailsModal from "../details-modal/details-modal";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;

  return (
    <>
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
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <DetailsModal title="Детали ингредиента">
          <IngredientDetails />
          </DetailsModal>
          </Route>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </Switch>
        {background &&
				(<>
					<Route path='/' exact={true} children={<Modal ><OrderDetails /></Modal>} />
					<Route path='/ingredients/:id' children={<Modal title="Детали ингредиента"><IngredientDetails /></Modal>} />
				</>
				)}
    </>
  );
}

export default App;
