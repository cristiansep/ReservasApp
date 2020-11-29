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
import {useHistory } from 'react-router-dom'



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  marginButton: {
      marginLeft: 45
  },
  colorDelete: {
      color: '#C0392B',
      marginLeft: 45
  },
  colorUpdate: {
    color: '#F39C12'
}
});


export const TableUser = () => {

  const classes = useStyles();


  const {usersStartLoading, usuarios, userStartDelete, guardarUsuarioActual} = useContext(UsuarioContext);

  const history = useHistory();

  // const [usersLoading, setUsersLoading] = useState(usersStartLoading);

 useEffect(() => {
  usersStartLoading();
  // eslint-disable-next-line
  },[]);


  const onSelectUser = (e) => {
    guardarUsuarioActual(e);
    history.push('/create-user')
  }

 const handleDelete = (id) => {
   userStartDelete(id);
   usersStartLoading();
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



  return (
    <TableContainer component={Paper}>
        {
            usuarios.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay usuarios regitrados en este momento — <strong>check it out!</strong>
              </Alert>
             )
            :  <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Rol</TableCell>
                <TableCell align="center">Correo electronico</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell component="th" scope="row">
                    {usuario.img}
                  </TableCell>
                  <TableCell align="center">{usuario.nombre}</TableCell>
                  <TableCell align="center">{usuario.apellidoP}</TableCell>
                  <TableCell align="center">{usuario.role}</TableCell>
                  <TableCell align="center">{usuario.email}</TableCell>
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
            count={usuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
    </TableContainer>
  );
}