import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Layout from "./Layout/Layout";

// pages
import Error from "../pages/error";
import {Login} from "../pages/login/Login";



export default function App() {


  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        /> */}
        <Route path="/app" component={Layout} />
        <Route path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </Router>
  );

  
}
