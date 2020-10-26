import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute(props) {
  const { user } = props;

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
