import React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { useAuthContext } from "../../hooks/AuthProvider";

const AuthRoute: React.FC<RouteProps> = props => {
  const { authenticated } = useAuthContext();
  return authenticated ? (
    <Route {...props}></Route>
  ) : (
    <Route>
      <Redirect to="/login" />
    </Route>
  );
};

export default AuthRoute;
