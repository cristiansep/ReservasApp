import React, { useContext, useEffect} from 'react';
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
import { Alert, AlertTitle } from '@material-ui/lab';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import 'moment/locale/es.js';
import { AppointmentContext } from '../../../context/appointments/AppointmentContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import Chip from '@material-ui/core/Chip';



const useStyles = makeStyles((theme) =>({
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
  // flexGrow: 1
},
espacio: {
  // marginRight: 160
},
chipColor: {
  "& .MuiChip-outlined": {
    color: '#9ccc65',
    // backgroundColor: "#9ccc65"
  }
}
}));


export const AppointmentConfirmedTable = () => {

  const classes = useStyles();

  const {appointmentLoadingConfirmed , appointmentsConfirmed, appointmentStatusUpdate} = useContext(AppointmentContext);

  const {user:{rol}} = useContext(AuthContext);
 
  
  useEffect(() => {
    appointmentLoadingConfirmed();
      // eslint-disable-next-line
    },[]);
    



  const handleCancel = (reserva) => {
    appointmentStatusUpdate(reserva);
    appointmentLoadingConfirmed();
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

 const emptyRows = rowsPerPage - Math.min(rowsPerPage, appointmentsConfirmed.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
        {
            appointmentsConfirmed.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay reservas confirmadas en este momento — <strong>check it out!</strong>
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
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Hora</TableCell>
                <TableCell align="left">Tipo</TableCell>
                <TableCell align="center">
                {rol === 'USER_ROLE' ? 'Estado' : 'Opciones'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentsConfirmed
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell component="th" scope="row">
                  {reserva.Specialty.name}
                  </TableCell>
                      {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ?
                      
                        <TableCell align="left">
                          {/* {reserva.Paciente.nombre+' '+reserva.Paciente.apellidoP} */}
                          {appointmentsConfirmed ? reserva.Paciente.nombre+' '+reserva.Paciente.apellidoP : ''}
                        </TableCell>
                     
                        : null
                      }
                      {rol === 'USER_ROLE' || rol === 'ADMIN_ROLE' ?
                      
                        <TableCell align="left">
                          {/* {reserva.Doctor.nombre+' '+reserva.Doctor.apellidoP} */}
                          {appointmentsConfirmed ? reserva.Doctor.nombre+' '+reserva.Doctor.apellidoP : ''}
                        </TableCell>
                        
                        : null
                      
                      }
                  <TableCell align="left">{moment(reserva.fecha).format('LL')}</TableCell>
                  <TableCell align="left">{moment(reserva.hora).format('HH:mm')}</TableCell>
                  <TableCell align="left">{reserva.tipo}</TableCell>
                  <TableCell align="center">
                    {rol === 'USER_ROLE' && 
                      <Chip 
                      label={reserva.status}
                      className={classes.chipColor}
                      variant="outlined"
                      color='primary'
                      />
                    }
                  <Grid container justify="center" alignItems="center">
                  <div className={classes.buttons}>
                  {rol === 'DOCTOR_ROLE' || rol === 'ADMIN_ROLE' ?
                     <Grid item xs={5}>
                     <Tooltip arrow placement="right-start" TransitionComponent={Zoom} title="Cancelar">
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
                    : ''
                  }
                 
                    </div>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
                 {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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
            count={appointmentsConfirmed.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
         
    </TableContainer>
  );
}