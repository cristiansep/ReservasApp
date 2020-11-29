import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/auth/AuthContext';
import Error from '../pages/error/Error';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



export const AppRouter = () => {
  
  const {startChecking, user} = useContext(AuthContext);

  const [scheking, setScheking] = useState(startChecking);

  const {checking, uid} = user;


  
  useEffect(() => {

    // startChecking();
    setScheking();
    
  },[scheking]);

  if(checking) {
    return (<h5>Cargando...</h5>)
  }

    return (
        <Router>
        <Switch>
          <PublicRoute 
            exact 
            path="/login" 
            component={Login} 
            isAuthenticated={!!uid}
            />

            <PublicRoute 
            exact 
            path="/register" 
            component={Register} 
            isAuthenticated={!!uid}
            />

          <PrivateRoute 
          path="/" 
          component={Layout} 
          isAuthenticated={!!uid}
          />
          <Route component={Error} />
        </Switch>
      </Router>
    )
}
