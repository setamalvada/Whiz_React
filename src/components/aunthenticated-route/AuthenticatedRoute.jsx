import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const RedirectToLogin = () => <Redirect to="/login" />;

const RedirectToHome = () => <Redirect to="/map" />;

const AuthenticatedRoute = (props) => {
  const { user } = useAuthContext();

  return (
    <Route {...props} component={user ? props.component : RedirectToLogin} />
  );
};

export const NotAuthenticatedRoute = (props) => {
  const { user } = useAuthContext();

  return (
    <Route {...props} component={!user ? props.component : RedirectToHome} />
  );
};

export default AuthenticatedRoute;
