import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
// import {Box, IconButton, Link} from '@material-ui/core'
// import Icon from '@mdi/react'



// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";


// context
import { useLayoutState } from "../../context/LayoutContext";
import { Doctor } from "../../pages/doctor/Doctor";
import { Reservas } from "../../pages/reservas/Reservas";
import { UserList } from "../../pages/ususarios/UserList";
import { CrearUsuario } from "../../pages/ususarios/CrearUsuario";
import { SpecialtyList } from "../../pages/especialidades/SpecialtyList";


function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/dashboard" component={Doctor} />
              <Route path="/reservas" component={Reservas} />
              <Route path="/usuarios" component={UserList} />
              <Route path="/create-user" component={CrearUsuario} />
              <Route path="/especialidades" component={SpecialtyList} />
              {/* <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              /> */}
              {/* <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} /> */}
              <Redirect to="/dashboard"/>
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
