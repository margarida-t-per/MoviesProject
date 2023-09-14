import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../context/UserContext";

function PrivateRoute({ children, ...rest }) {
  const { user } = useUser();

  const isAuthenticated = user || localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
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
}

export default PrivateRoute;
