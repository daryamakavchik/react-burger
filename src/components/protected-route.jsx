import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../services/actions/auth";
import { getUserInfo } from "../services/actions/auth";

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hasToken = getCookie('token');
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

  useEffect(() => dispatch(getUserInfo()), [dispatch]);

  // useEffect(() => {
  //   if (!isTokenUpdated && hasToken) {
  //     dispatch(refreshTokenAction());
  //   }
  // }, [dispatch, hasToken, isTokenUpdated]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
