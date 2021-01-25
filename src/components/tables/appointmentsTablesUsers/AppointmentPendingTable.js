import React, { useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Alert, AlertTitle } from '@material-ui/lab';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import 'moment/locale/es.js';
import { AppointmentContext } from '../../../context/appointments/AppointmentContext';
import { AuthContext } from '../../../context/auth/AuthContext';




const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 650,
  },
  marginButton: {
      marginLeft: 45
  },
  colorCancel: {
      // color: '#C0392B',
      marginLeft: 20
  },
  colorUpdate: {
    color: '#F39C12'
},
buttons: {
  display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5),
    },
},
}));


export const AppointmentPendingTable = () => {

  const classes = useStyles();

  const {appointmentLoadingPatient, appointmentPatient, userAppointmentStatusUpdate,appointmentConfirmUpdate} = useContext(AppointmentContext);

  const {user:{rol}} = useContext(AuthContext);
 

  
  useEffect(() => {
      appointmentLoadingPatient();
      // eslint-disable-next-line
    },[]);

  
    


const handleConfirm = (reserva) => {
  appointmentConfirmUpdate(reserva);
  appointmentLoadingPatient();
 }

 const handleCancel = (reserva) => {
  userAppointmentStatusUpdate(reserva);
  appointmentLoadingPatient();
 }



 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(5);
 

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };

 const emptyRows = rowsPerPage - Math.min(rowsPerPage, appointmentPatient.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
        {
            appointmentPatient.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay reservas por confirmar en este momento — <strong>check it out!</strong>
              </Alert>
             )
            :  <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Especialidad</TableCell>
                      {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ?
                        <TableCell align="left">
                          Paciente
                       </TableCell>

                       : null
                    }

                    {rol === 'USER_ROLE' || rol === 'ADMIN_ROLE' ?
                        <TableCell align="left">
                          Doctor
                       </TableCell>

                       : null
                    }

                    {/* <TableCell align="left">
                     {rol === 'USER_ROLE' || rol === 'ADMIN_ROLE' ? 'Doctor' : ''}
                     {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ? 'Paciente' : ''}
                    </TableCell> */}

                  {/* {rol === 'ADMIN_ROLE' &&
                    <TableCell align="left">
                      {rol === 'DOCTOR_ROLE' || rol === 'DOCTOR_ROLE' ? 'Paciente' : 'Doctor'}
                    </TableCell>
                  }
                  {rol === 'ADMIN_ROLE' &&
                    <TableCell align="left">
                     {rol === 'USER_ROLE' || rol === 'DOCTOR_ROLE' ? 'Doctor' : 'Paciente'}
                    </TableCell>
                  } */}
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Hora</TableCell>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentPatient
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell component="th" scope="row">
                  {reserva.Specialty.name}
                  </TableCell>
                      {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ? 

                        <TableCell align="left">
                          {appointmentPatient ? reserva.Paciente.nombre+' '+reserva.Paciente.apellidoP : ''}
                        </TableCell>
                        : null
                      }
                      {rol === 'USER_ROLE' || rol === 'ADMIN_ROLE' ? 
                        <TableCell align="left">
                          { appointmentPatient ? reserva.Doctor.nombre+' '+reserva.Doctor.apellidoP : ''}
                        </TableCell>
                        
                        : null
                      }
                  <TableCell align="left">{moment(reserva.fecha).format('LL')}</TableCell>
                  <TableCell align="left">{moment(reserva.hora).format('HH:mm')}</TableCell>
                  <TableCell align="left">{reserva.tipo}</TableCell>
                  <TableCell align="center">
                  <Grid container justify="center" alignItems="center">
                  <div className={classes.buttons}>
                  {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ? 
                       <Grid item xs={5}>
                      <Tooltip arrow  TransitionComponent={Zoom} title="Confirmar">
                      <IconButton 
                      color="primary" 
                      aria-label="Confirm" 
                      component="span"
                      onClick={() => handleConfirm(reserva)}
                      >
                      <CheckBoxIcon  fontSize="large"/>
                      </IconButton>
                      </Tooltip>
                     </Grid>
                     : ''
                  }
                  <Grid item xs={5}>
                     <Tooltip arrow  TransitionComponent={Zoom} title="Cancelar">
                    <IconButton 
                      color="secondary" 
                      aria-label="Cancel" 
                      component="span"
                      onClick={() => handleCancel(reserva)}
                      >
                      <CancelIcon  fontSize="large"/>
                      </IconButton>
                      </Tooltip>
                    </Grid>
                    </div>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
                 {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
        <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            colSpan={3}
            count={appointmentPatient.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
    </TableContainer>
  );
}