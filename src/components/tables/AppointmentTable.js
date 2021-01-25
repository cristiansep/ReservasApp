import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {AppointmentPendingTable} from './appointmentsTablesUsers/AppointmentPendingTable'

import { AppointmentContext } from '../../context/appointments/AppointmentContext';
import { AppointmentConfirmedTable } from './appointmentsTablesUsers/AppointmentConfirmedTable';
import { AppointmentOldTable } from './appointmentsTablesUsers/AppointmentOldTable';
import { AuthContext } from '../../context/auth/AuthContext';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));


export const AppointmentTable = () => {

  
  const {user:{rol}} = useContext(AuthContext);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

 


    const {appointmentLoading} = useContext(AppointmentContext);

    useEffect(() => {
        appointmentLoading();
        // eslint-disable-next-line
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label={rol === 'ADMIN_ROLE' ? 'proximas reservas' : 'Mis proximas reservas'} href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Reservas por confirmar" href="/trash" {...a11yProps(1)} />
            <LinkTab label="Historial de reservas" href="/spam" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AppointmentConfirmedTable/>
        </TabPanel>
        <TabPanel value={value} index={1}>
         
        <AppointmentPendingTable/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AppointmentOldTable/>
        </TabPanel>
      </div>
    )
}
