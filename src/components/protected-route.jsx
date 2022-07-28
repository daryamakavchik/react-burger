import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshTokenAction } from "../services/actions/auth";

export const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  const isTokenUpdated = useSelector((store) => store.user.isTokenUpdated);
  const hasToken = !!localStorage.getItem("refreshToken");
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshTokenAction);
    }
  }, [dispatch, hasToken, isTokenUpdated]);

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
