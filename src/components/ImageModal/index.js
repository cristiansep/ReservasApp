import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ModalContext } from '../../context/modal/ModalContext';
import { SpecialtyContext } from '../../context/especialidades/SpecialtyContext';





const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
  },
  paper: {
    width: theme.spacing(100),
    height: theme.spacing(30),
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
}));


export const ImageModal = () => {
  const classes = useStyles();

  const {specialtyCreated, specialtySelect, ClearSpecialtySelect, specialtyStartUpdate} = useContext(SpecialtyContext);
  const {modalOpen, uiCloseModal} = useContext(ModalContext);



  const [formValues, setFormValues] = useState({
    name: ""
  });

  const {name} = formValues;


  useEffect(() => {
    if(specialtySelect) {
      setFormValues(specialtySelect)
    }
  }, [specialtySelect, setFormValues]);


  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();


    if(specialtySelect) {
      specialtyStartUpdate(formValues);
    }else {
      specialtyCreated(formValues);
    }



    uiCloseModal();
  }


  const handleClose = () => {
    uiCloseModal();
    ClearSpecialtySelect();
    setFormValues({
      name: ''
    });
    
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
      
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Ingresar Especialidad
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <form noValidate autoComplete="off" className={classes.stepper} onSubmit={handleSubmitForm}>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Especialidad"
                      name="name"
                      value={name}
                      autoComplete="Especialidad"
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

              

                <React.Fragment>
              <div className={classes.buttons}>  
                <Button
                  type="submit"
                  variant="contained"
                  disabled={name.trim().length < 2 ? true : false}
                  color="primary"
                  className={classes.button}
                >
                  {specialtySelect ? 'Editar' : 'Guardar'}
                </Button>
              </div>
            </React.Fragment>
              </form>
            </React.Fragment>
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
        </Fade>
      </Modal>
    </div>
  );
}