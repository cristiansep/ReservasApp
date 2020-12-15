import React, { useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UsuarioContext } from '../../context/usuarios/UsuarioContext';
import TablePagination from '@material-ui/core/TablePagination';
import {useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
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
root: {
  display: 'flex',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(0.5),
  },
}
}));


export const TableDoctor = () => {

  const classes = useStyles();


  const {doctorsLoading, doctors, doctorStartDelete, guardarDoctorSeleccionado, doctorStartUploading} = useContext(UsuarioContext);

   
  const history = useHistory();


 useEffect(() => {
    doctorsLoading();
  // eslint-disable-next-line
  },[]);


  const onSelectUser = (e) => {
    guardarDoctorSeleccionado(e);
    history.push('/create-doctor')
  }

 const handleDelete = (id) => {
  doctorStartDelete(id);
   doctorsLoading();
 }


 const handlePictureClick = (e) => {
   document.querySelector('#fileSelector').click();
   guardarDoctorSeleccionado(e);
    // uiOpenModal();
 }

 const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (file) {
    doctorStartUploading(file);
   }
 };


 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(5);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };



  return (
    <TableContainer component={Paper}>
        {
            doctors.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay usuarios regitrados en este momento — <strong>check it out!</strong>
              </Alert>
             )
            :  <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="left">Especialidad</TableCell>
                <TableCell align="left">Correo electronico</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell component="th" scope="row">
                    <Avatar 
                      alt="Remy Sharp" 
                      src={usuario.img} 
                      style={{cursor: 'pointer'}}
                      onClick={() => handlePictureClick(usuario)}
                      />
                      <input 
                        id="fileSelector"
                        type="file" 
                        name="img"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                        />
                  </TableCell>
                  <TableCell align="left">{usuario.nombre}</TableCell>
                  <TableCell align="left">{usuario.apellidoP}</TableCell>
                  <TableCell align="left">{usuario.Specialties.map(specialty => 
                  <div className={classes.root} key={specialty.id} >
                  <Chip 
                    label={specialty.name} 
                    color="default"
                    />
                    </div>
                  )}
                  </TableCell>
                  <TableCell align="left">{usuario.email}</TableCell>
                  <TableCell align="center">
    
                  <IconButton 
                    color="default" 
                    aria-label="delete" 
                    className={classes.colorUpdate}
                    onClick={() => onSelectUser(usuario)}
                    >
                        <EditIcon />
                    </IconButton>
    
                    <IconButton 
                      color="secondary" 
                      aria-label="delete" 
                      className={classes.colorDelete}
                      onClick={() => handleDelete(usuario.id)}
                      >
                        <DeleteIcon />
                    </IconButton>       
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={doctors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
         
    </TableContainer>
  );
}