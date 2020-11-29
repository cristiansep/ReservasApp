import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';




import { useForm } from '../../hooks/useForm';
import { UsuarioContext } from '../../context/usuarios/UsuarioContext';





const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));



export const CrearUsuario = ({history}) => {
  const classes = useStyles();

  const {crearUsuario, usuarioselect, userStartUpdate} = useContext(UsuarioContext);


  const [formValues, setFormValues, handleInputChange] = useForm({
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    rut: "",
    email: "",
    password: "",
    role: "",
    telefono:"",
    calle: "",
  });

  const {
    nombre,
    apellidoP,
    apellidoM,
    rut,
    email,
    password,
    role,
    telefono,
    calle,
  } = formValues;
  

  useEffect(() => {
    if(usuarioselect) {
      setFormValues({
        ...usuarioselect,
        calle: usuarioselect.domicilio[0].calle
      });
    }
  }, [usuarioselect, setFormValues]);

  

  
  const handleCreateUser = (e) => {
    e.preventDefault();

    //Evaluar si es edición o creación de usuarios
    if(!usuarioselect) {
      crearUsuario(formValues);
    } else {
      userStartUpdate(formValues);
    }

    setFormValues({
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      rut: "",
      email: "",
      password: "",
      role: "",
      telefono:"",
      calle: "",
    });
  }

 
 
 

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Ingresar datos de usuario
          </Typography>

          <React.Fragment>
            <React.Fragment>
              <form noValidate autoComplete="off" className={classes.stepper} onSubmit={handleCreateUser}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nombre"
                      label="Nombre"
                      name="nombre"
                      value={nombre || ""}
                      autoComplete="nombre"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="apellidoP"
                      name="apellidoP"
                      value={apellidoP || ""}
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
                      value={apellidoM || ""}
                      autoComplete="apellidoM"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="rut"
                      label="RUT"
                      name="rut"
                      value={rut || ""}
                      autoComplete="off"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Correo electronico"
                      name="email"
                      value={email || ""}
                      autoComplete="off"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      value={password || ""}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="telefono"
                      label="Telefono"
                      name="telefono"
                      value={telefono || ""}
                      autoComplete="Telefono"
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
                      value={calle || ""}
                      autoComplete="direcccion"
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 12 }}
                >
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Rol
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="role"
                    value={role}
                    name="role"
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="USER_ROLE">Usuario</MenuItem>
                    <MenuItem value="DOCTOR_ROLE">Doctor</MenuItem>
                    <MenuItem value="ADMIN_ROLE">Administrador</MenuItem>
                  </Select>
                </FormControl>

                <React.Fragment>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="default"
                  // component={Link}
                  // to="/usuarios"
                  onClick={() => history.push('/usuarios')}
                  className={classes.button}
                >
                  Volver
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {usuarioselect ? 'Editar' : 'Guardar'}
                </Button>
              </div>
            </React.Fragment>
              </form>
            </React.Fragment>
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </main>
    </React.Fragment>
  );
};