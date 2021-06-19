import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/auth";

export default function EmployeeRoute({ component: Component, ...props }) {
  const { logged, user } = useAuth();

  return (
    <Route
      {...props}
      render={() => {
        if (logged) {
          if (user.role === "employee") {
            return <Component {...props} />;
          }
          return <Redirect to="/inicio" />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
