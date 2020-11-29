import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


// styles
import useStyles from "./styles";

//components
import { Copyright } from '../../components/Copyright/Copyright';

//router
import {Link} from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';



export const Register = () => {
  const classes = useStyles();

  const {startRegister} = useContext(AuthContext);

  const [ formValues, handleInputChange] = useForm({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    email: '',
    password: '',
    calle: ''

  });

  const {nombre, apellidoP, apellidoM, email, password, calle} = formValues;


  const handleRegister = (e) => {
    e.preventDefault();
    
    startRegister({
      nombre, 
      apellidoP, 
      apellidoM, 
      email, 
      password, 
      calle
    })
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <Grid container spacing={2}>

          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                value={nombre}
                autoComplete="nombre"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="apellidoP"
                name="apellidoP"
                value={apellidoP}
                variant="outlined"
                required
                fullWidth
                id="apellidoP"
                label="Apellido Paterno"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="apellidoM"
                label="Apellido Materno"
                name="apellidoM"
                value={apellidoM}
                autoComplete="apellidoM"
                onChange={handleInputChange}
              />
            </Grid>
           

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="calle"
                label="Dirección"
                name="calle"
                value={calle}
                autoComplete="direcccion"
                onChange={handleInputChange}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
              ¿Ya tienes una cuenta? Entra en el sistema.
              </Link >
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}