import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/auth";

export default function OperatorRoute({ component: Component, ...props }) {
  const { logged, user } = useAuth();

  return (
    <Route
      {...props}
      render={() => {
        if (logged) {
          if (user.role === "admin") {
            return <Component {...props} />;
          }
          return <Redirect to="/home" />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
