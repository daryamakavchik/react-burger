import React, { useEffect, FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from '../services/actions/auth';
import { getUserInfo } from "../services/actions/auth";
import { RootState } from "../services/store";
import { RouteComponentProps } from "@reach/router";

type Props = { children: React.ReactNode, exact?: boolean } & RouteComponentProps;

export const ProtectedRoute:FC<Props> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const isUserAuthorized = useSelector((store:RootState) => store.user.isUserAuthorized);

  useEffect(() => getUserInfo(), []);

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
