import React, { useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Alert, AlertTitle } from '@material-ui/lab';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import 'moment/locale/es.js';
import { AppointmentContext } from '../../../context/appointments/AppointmentContext';
import { ModalContext } from '../../../context/modal/ModalContext';
import { AppointmentModal } from '../../AppointmentModal';





const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  marginButton: {
      marginLeft: 45
  },
  colorDelete: {
      color: '#C0392B',
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


export const AppointmentOldTable = () => {

  const classes = useStyles();

  const {appointmentLoading, appointments, saveCurrentAppointment} = useContext(AppointmentContext);
  const {openAppointmentModal} = useContext(ModalContext);
 
  
  
  
  useEffect(() => {
    appointmentLoading();
      // eslint-disable-next-line
    },[]);
    



 const handleSee = (reserva) => {
  saveCurrentAppointment(reserva)
  openAppointmentModal();
 }



 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(5);
 const [dense, setDense] = React.useState(false);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };

 const emptyRows = rowsPerPage - Math.min(rowsPerPage, appointments.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
        {
            appointments.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay historial de reservas en este momento — <strong>check it out!</strong>
              </Alert>
             )
            :  <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Descripción</TableCell> */}
                <TableCell align="left">Especialidad</TableCell>
                {/* <TableCell align="left">Doctor</TableCell> */}
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Hora</TableCell>
                {/* <TableCell align="left">Tipo</TableCell> */}
                <TableCell align="left">Estado</TableCell>
              <TableCell align="left">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reserva) => (
                <TableRow key={reserva.id}>
                  {/* <TableCell component="th" scope="row">
                  {reserva.descripcion}
                  </TableCell> */}
                  <TableCell align="left">{reserva.Specialty.name}</TableCell>
                  {/* <TableCell align="left">{reserva.Doctor.nombre}</TableCell> */}
                  <TableCell align="left">{moment(reserva.fecha).format('LL')}</TableCell>
                  <TableCell align="left">{moment(reserva.hora).format('HH:mm')}</TableCell>
                  {/* <TableCell align="left">{reserva.tipo}</TableCell> */}
                  <TableCell align="left">
                    <Chip 
                    label={reserva.status}
                    color="secondary"
                    variant="outlined"
                    />
                    </TableCell>
                    <TableCell align="left">
                    <Grid container >
                  <div className={classes.buttons}>
                       <Grid item xs={5}>
                      <Tooltip arrow  TransitionComponent={Zoom} title="Ver detalle">
                      <IconButton 
                      // color="primary" 
                      aria-label="Ver" 
                      component="span"
                      onClick={() => handleSee(reserva)}
                      >
                      <VisibilityIcon fontSize="large"/>
                      </IconButton>
                      </Tooltip>
                     </Grid>
                    </div>
                    </Grid>
                    </TableCell>
                </TableRow>
              ))}
                 {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                  {/* <TableCell colSpan={6} /> */}
                </TableRow>
              )}
            </TableBody>
          </Table>
        }
        <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
       <AppointmentModal/>
    </TableContainer>
  );
}