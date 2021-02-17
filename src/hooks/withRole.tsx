import React from "react";
import { Redirect } from "react-router";
import { RoleDto } from "../models/User";
import { useAuthContext } from "./AuthProvider";

const withRole = <TProps,>(
  WrappedComponent: React.ComponentType | React.FC<TProps>,
  role: RoleDto
) => (props: TProps) => {
  const { user } = useAuthContext();

  // return component if the permission is there
  if (user?.role && user.role >= role) return <WrappedComponent {...props} />;

  // user has not selected a lab, so they have to!
  if (!user?.role) return <Redirect to="/new-shop" />;

  // otherwise just redirect to the main page
  return <Redirect to="/" />;
};

export default withRole;
