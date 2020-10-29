import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./utils/route-utils";
import LoginPanel from './LoginPanel';
import MainPage from './MainPage';

const App = () => {
  // const [loaded, setLoaded] = useState(false);
  const isNotLoggedIn = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(loadToken()); 
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/login"
          exact={true}
          isNotLoggedIn={isNotLoggedIn}
          component={LoginPanel}
        />
        <PrivateRoute
          path="/"
          isNotLoggedIn={isNotLoggedIn}
          component={MainPage}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
