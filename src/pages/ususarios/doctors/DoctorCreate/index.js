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
import Avatar from '@material-ui/core/Avatar';




import { UsuarioContext } from '../../../../context/usuarios/UsuarioContext';
import { useForm } from '../../../../hooks/useForm';
import { SpecialtyContext } from '../../../../context/especialidades/SpecialtyContext';






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
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  top: {
    marginTop: theme.spacing(4)
  }
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };



export const DoctorCreate = ({history}) => {
  const classes = useStyles();

  const {crearMedico, doctorSelect, doctorStartUpdate, limpiarDoctorSelect} = useContext(UsuarioContext);
  const {specialtiesStartLoading,specialties} = useContext(SpecialtyContext);

 


  const [formValues, setFormValues, handleInputChange] = useForm({
    nombre: "Pedro",
    apellidoP: "Pica",
    apellidoM: "Piedra",
    // rut: "",
    email: "",
    password: "123",
    telefono:"22334455",
    calle: "Republica 334",
    img: "",
    especialidad: []
  });

  const {
    nombre,
    apellidoP,
    apellidoM,
    email,
    password,
    telefono,
    calle,
    img,
    especialidad
  } = formValues;
  

  useEffect(() => {
    specialtiesStartLoading();
    // eslint-disable-next-line
    },[]);

  useEffect(() => {
    if(doctorSelect) {
      setFormValues({
        ...doctorSelect,
        calle: doctorSelect.domicilio[0].calle,
        especialidad: doctorSelect.Specialties.map(specialty => specialty.id)
      });
    }
  }, [doctorSelect, setFormValues]);

  
  const handleClearUser = () => {
    history.push('/medicos');
    limpiarDoctorSelect();
  }

  
  const handleCreateUser = (e) => {
    e.preventDefault();

    //Evaluar si es edición o creación de usuarios
    if(!doctorSelect) {
      crearMedico(formValues);
    } else {
      doctorStartUpdate(formValues);
    }

    setFormValues({
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      email: "",
      password: "",
      telefono:"",
      calle: "",
      especialidad: []
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
          <Grid item xs={12} className={classes.top}>
            <Grid container justify="center">
              <Avatar alt="Remy Sharp" src={img} className={classes.large} />
            </Grid>
          </Grid>
          <React.Fragment>
            <React.Fragment>
              <form
                noValidate
                autoComplete="off"
                className={classes.stepper}
                onSubmit={handleCreateUser}
              >
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

                  {/* <Grid item xs={12}>
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
                  </Grid> */}

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
                    {doctorSelect && (
                      <Typography variant="caption" gutterBottom>
                        Ingrese un valor sólo si desea modificar la contraseña
                      </Typography>
                    )}
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
                    {/* <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Especialidad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="especialidad"
                    value={especialidad || ""}
                    name="especialidad"
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    {
                    
                    specialties.map((specialty) => (
                      <MenuItem
                        key={specialty.id}
                        value={specialty.name}
                        // style={getStyles(name, personName, theme)}
                      >
                        {specialty.name}
                      </MenuItem>
                    ))}
                  </Select> */}

                  <InputLabel 
                    ref={inputLabel}
                    id="demo-mutiple-name-label">
                        Especialidad
                    </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="especialidad"
                    multiple
                    name="especialidad"
                    value={especialidad || []}
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                    // input={<Input />}
                    // MenuProps={MenuProps}
                  >
                    {
                    
                    specialties.map((specialty) => (
                      <MenuItem
                        key={specialty.id}
                        value={specialty.id}
                        // style={getStyles(name, personName, theme)}
                      >
                        {specialty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <React.Fragment>
                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="default"
                      // component={Link}
                      // to="/usuarios"
                      onClick={handleClearUser}
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
                      {doctorSelect ? "Editar" : "Guardar"}
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