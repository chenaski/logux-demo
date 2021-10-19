import React from "react";
import "../../global.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>

        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
