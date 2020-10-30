import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { loadToken } from "../store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "../utils/route-utils";
import Login from './Login';
import SignUp from './SignUp';
import Slack from './Slack';

const App = () => {
  const isNotLoggedIn = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(loadToken()); 
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/login"
          exact={true}
          isNotLoggedIn={isNotLoggedIn}
          component={Login}
        />
        <ProtectedRoute
          path="/signup"
          exact={true}
          isNotLoggedIn={isNotLoggedIn}
          component={SignUp}
        />
        <PrivateRoute
          path="/"
          isNotLoggedIn={isNotLoggedIn}
          component={Slack}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
