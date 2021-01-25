import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import { ModalContext } from '../../context/modal/ModalContext';
import { AppointmentContext } from '../../context/appointments/AppointmentContext';
import { AuthContext } from '../../context/auth/AuthContext';






const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: theme.spacing(100),
    height: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid hsl(0, 0%, 73%)',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export const AppointmentModal = () => {
  const classes = useStyles();

  const {cleanCurrentAppointment, appointmentSelect} = useContext(AppointmentContext);
  const {modalAppointmentOpen, closeAppoitmentModal} = useContext(ModalContext);
  const {user:{rol}} = useContext(AuthContext);

  if(appointmentSelect) {
    console.log(appointmentSelect);
  }

  const handleClose = () => {
    closeAppoitmentModal();
    cleanCurrentAppointment();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalAppointmentOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalAppointmentOpen}>
      
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Detalles de la reservas
          </Typography>
          <React.Fragment>
            <React.Fragment>
       
                {!appointmentSelect ? [] : 
                
                (
              
                  <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        {rol === 'USER_ROLE' || rol === 'ADMIN_ROLE' ?
                         <ListItem>
                         <ListItemIcon>
                           <CheckIcon />
                         </ListItemIcon>
                          <ListItemText primary={'Doctor: '+  appointmentSelect.Doctor.nombre }/>
                          </ListItem>
                          : ''
                        }
                        {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ?
                         <ListItem>
                         <ListItemIcon>
                           <CheckIcon />
                         </ListItemIcon>
                         <ListItemText primary={'Paciente: '+  appointmentSelect.Paciente.nombre }/>
                         </ListItem>
                         : ''
                        }
                      <Divider variant="fullWidth"/>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Estado: '+appointmentSelect.status} />
                      </ListItem>
                      <Divider variant="fullWidth"/>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Tipo: '+appointmentSelect.tipo} />
                      </ListItem>
                    </List>
                  </div>
                )}
            </React.Fragment>
          </React.Fragment>
        </Paper>
        </Fade>
      </Modal>
    </div>
  );
}