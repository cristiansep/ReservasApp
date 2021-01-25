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
import { useForm as validationForm } from "react-hook-form";

// styles
import useStyles from "./styles";

//form
import { useForm } from '../../hooks/useForm';


//context
import {AuthContext} from '../../context/auth/AuthContext';

//Router
import {Link } from "react-router-dom";
import { Copyright } from '../../components/Copyright/Copyright';



export const Login = () => {
  const classes = useStyles();

  const {register, errors, handleSubmit} = validationForm();
  const {iniciarSesion} = useContext(AuthContext);

  

  const initialForm = {
    email: 'crist@gmail.com',


    // email: 'juan@gmail6.com',
    // email: 'juan@gmail14.com',

    // email: 'loquesea70@gmail.com',
    password: '123'
  };

  const [ formValues, handleInputChange] = useForm( initialForm );

  const {email, password} = formValues;


  const handleLogin = (e) => {
    // e.preventDefault();
    
    iniciarSesion({email, password})
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingrese sus credenciales
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleLogin)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: 'Debe proporcionar la dirección de correo electrónico!',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe proporcionar una dirección de correo electrónico válida!',
              },
            })}
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            value={email}
            // autoFocus
            error={!!errors.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}



          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: 'Debe proporcionar una contraseña.',
              minLength: {
                value: 2,
                message: 'Su contraseña debe tener más de 2 caracteres',
              },
            })}
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            error={!!errors.password}
            id="password"
            onChange={handleInputChange}
          />
           {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"¿No tienes una cuenta? Inscríbete."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

