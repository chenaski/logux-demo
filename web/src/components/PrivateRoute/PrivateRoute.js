import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const userId = localStorage.getItem("userId");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId ? (
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
