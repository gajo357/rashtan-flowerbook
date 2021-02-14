import React from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { useAuthContext } from "../../hooks/AuthProvider";

interface Props extends RouteProps {}

const NonAuthRoute: React.FC<Props> = ({ ...rest }) => {
  const { authenticated } = useAuthContext();
  return authenticated ? <Redirect to="" /> : <Route {...rest} />;
};

export default NonAuthRoute;
