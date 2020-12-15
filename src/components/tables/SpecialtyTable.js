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
import TablePagination from '@material-ui/core/TablePagination';
import { SpecialtyContext } from '../../context/especialidades/SpecialtyContext';
import { ModalContext } from '../../context/modal/ModalContext';
import { ImageModal } from '../ImageModal';



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


export const SpecialtyTable = () => {

  const classes = useStyles();


  const {specialtiesStartLoading, specialties, guardarEspecialidadActual, specialtyStartDelete} = useContext(SpecialtyContext);

  const {uiOpenModal} = useContext(ModalContext);



 useEffect(() => {
  specialtiesStartLoading();
  // eslint-disable-next-line
  },[]);


  const onSelectSpecialty = (e) => {
    guardarEspecialidadActual(e);
    uiOpenModal();
  }

 const handleDelete = (id) => {
    specialtyStartDelete(id);
    specialtiesStartLoading();
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
            specialties.length === 0 
            ?(<Alert severity="warning">
                <AlertTitle>Información</AlertTitle>
                No hay especialidades regitradas en este momento — <strong>check it out!</strong>
              </Alert>
             )
            :  <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Especialidad</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialties
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((specialty) => (
                <TableRow key={specialty.id}>
                  {/* <TableCell component="th" scope="row">
                    {usuario.img}
                  </TableCell> */}
                  <TableCell align="center">{specialty.name}</TableCell>
                  <TableCell align="center">
    
                  <IconButton 
                    color="default" 
                    aria-label="edit" 
                    className={classes.colorUpdate}
                    onClick={() => onSelectSpecialty(specialty)}
                    >
                        <EditIcon />
                    </IconButton>
    
                    <IconButton 
                      color="secondary" 
                      aria-label="delete" 
                      className={classes.colorDelete}
                      onClick={() => handleDelete(specialty.id)}
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
            count={specialties.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <ImageModal/>
    </TableContainer>
  );
}
