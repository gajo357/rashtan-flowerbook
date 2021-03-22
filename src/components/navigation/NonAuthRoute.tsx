import React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { useAuthContext } from "../../hooks/AuthProvider";

const NonAuthRoute: React.FC<RouteProps> = props => {
  const { authenticated } = useAuthContext();
  return authenticated ? <Redirect to="" /> : <Route {...props} />;
};

export default NonAuthRoute;
