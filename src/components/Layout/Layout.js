import React, { useContext } from "react";
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
import { Reservas } from "../../pages/reservas/Reservas";
import { UserList } from "../../pages/ususarios/UserList";
import { CrearUsuario } from "../../pages/ususarios/CrearUsuario";
import { SpecialtyList } from "../../pages/especialidades/SpecialtyList";
import  Dashboard  from "../../pages/dashboard/Dashboard";
import { DoctorList } from "../../pages/ususarios/doctors/DoctorList";
import { DoctorSchedule } from "../../pages/ususarios/doctors/DoctorSchedule";
import { DoctorCreate } from "../../pages/ususarios/doctors/DoctorCreate";
import { AuthContext } from "../../context/auth/AuthContext";
import { AppointmetList } from "../../pages/reservas/AppointmentList";
import { AppointmentCreate } from "../../pages/reservas/AppointmentCreate";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  const {user:{rol}} = useContext(AuthContext);

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
            {/* <Switch> */}
            {rol === "ADMIN_ROLE" &&
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/reservas" component={AppointmetList} />
                <Route path="/create-appointment" component={AppointmentCreate} />
                <Route path="/usuarios" component={UserList} />
                <Route path="/medicos" component={DoctorList} />
                <Route path="/create-user" component={CrearUsuario} />
                <Route path="/especialidades" component={SpecialtyList} />
                <Route path="/create-doctor" component={DoctorCreate}/>
                <Redirect to="/dashboard"/> 
              </Switch>
            }

            {rol === "DOCTOR_ROLE" && 
              <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/reservas" component={AppointmetList} />
                  <Route path="/create-appointment" component={AppointmentCreate} />
                  <Route path="/horario" component={DoctorSchedule}/>
                  <Redirect to="/dashboard"/> 
              </Switch>
            
            }


            {rol === "USER_ROLE" && 
              <Switch>
                 <Route path="/dashboard" component={Dashboard} />
                 <Route path="/reservas" component={AppointmetList} />
                  <Route path="/create-appointment" component={AppointmentCreate} />
                <Redirect to="/dashboard"/> 
              </Switch>
            
            }
             
             
              
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
              {/* <Redirect to="/dashboard"/> */}
            {/* </Switch> */}
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
