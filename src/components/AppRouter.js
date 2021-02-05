import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';

import { loadToken } from "../store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "../utils/route-utils";
import Theme from './Theme';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import MainPage from './Pages/MainPage';


const AppRouter = () => {
  const isNotLoggedIn = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Theme>
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
              component={MainPage}
            />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Theme>
    </>
  );
};

export default AppRouter;
