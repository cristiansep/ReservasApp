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
import MomentUtils from '@date-io/moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import MuiAlert from '@material-ui/lab/Alert';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import 'moment/locale/es.js';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';

  import { useForm as validationForm } from "react-hook-form";


import { useForm } from '../../hooks/useForm';
import { SpecialtyContext } from '../../context/especialidades/SpecialtyContext';
import { ScheduleContext } from '../../context/schedule/ScheduleContext';
import { AppointmentContext } from '../../context/appointments/AppointmentContext';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
  },
  horas: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  hora: {
    width: '100%',
    height: '4vh',
    "&:focus": {
      backgroundColor: "#e3324d"
    }
  },
  tipo: {
    marginTop: theme.spacing(4),
  },
  alerta: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#2196f3'
  },
  error: {
    color: 'red',
  },

}));


const now = moment(); 
const dateMax = moment().add(10, 'd')




export const AppointmentCreate = ({history}) => {
  const classes = useStyles();

  // const [lastShift, setLastShift] = useState( localStorage.getItem('turno' || ''));

  const {specialtiesStartLoading,specialties,specialtiesDoctorLoading,specialtyDocs} = useContext(SpecialtyContext);
  const { schedulesLoading,scheduleShiftDoctor,turnoDoctorDay} = useContext(ScheduleContext);
  const {appointmentCreate, appointmentLoading, appointments } = useContext(AppointmentContext);

  const {register, errors, handleSubmit} = validationForm();

  let fechaTiempo = ""
 

  // if(turnoDoctorDay) {

  //   const timeStart = turnoDoctorDay[0].start || '';
  //   const timeEnd = turnoDoctorDay[0].end || '';

  //   let value = {
  //     interval: '00:30',
  //     startTime: moment(timeStart).toDate(),
  //     endTime: moment(timeEnd).toDate(),
  //   };
    
  //   function showTimeIntervals(value) {
  //     let result = value.interval; 
  //     let start = "";
  //     let timeNotation = '';
  //     let time = '';
  //     let currentInterval = '';
  //     for(let i in result) {
  //       let hr = moment(result, 'HH:mm').format('HH');
  //       let min = moment(result, 'HH:mm').format('mm');
  //       hr = (hr != 0) ? parseInt(hr, 10) : '';
  //       min = (min != 0) ? parseInt(min, 10) : '';
  //       if(hr != 0) {
  //         time = hr;
  //         timeNotation = 'hour';
  //         start = moment(value.startTime, 'HH:mm').subtract(hr, 'hour');
  //         console.log(start)
  //       } else {
  //         time = min;
  //         timeNotation = 'minutes';
  //         start = moment(value.startTime, 'HH:mm').subtract(min, 'minutes');
  //       }
  //     }
  //     const end = moment(value.endTime, 'HH:mm');
  //     if(end.isBefore(start))
  //       end = end.add(1, 'd');
  //     const finalResult = [];
  //     const current = moment(start);
  //     while (current <= end) {
  //       // currentInterval=current.format('HH:mm') + ' - ';  //This will add the start of interval
  //       currentInterval=current.format('HH:mm');
  //       current.add(time, timeNotation);
  //       // currentInterval+=current.format('HH:mm'); //This will add end of interval
  //       finalResult.push(currentInterval); //Add the complete interval to your result
  //     }
  //     const newArray = finalResult.shift();
  //     // const newArrayTime = finalResult.getTime()
  //     return finalResult
  //   }
    
  //   const newFinalResult = showTimeIntervals(value);
  //   console.log(newFinalResult);
  // }
 
  
  

  const [formValues, setFormValues] = useForm({
    descripcion: "",
    idEspecialidad: "",
    idDoctor: "",
    fecha: now.toDate(),
    hora: "",
    tipo: "Consulta",
  });

  
  const {
    descripcion,
    idEspecialidad,
    // idDoctor,
    fecha,
    hora,
    tipo,
  } = formValues;
  
  let {idDoctor} = formValues;
  let filterHoursDay = [];
  
  
  useEffect(() => {
    specialtiesStartLoading();
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
      schedulesLoading();
      // eslint-disable-next-line
      },[]);
  
      useEffect(() => {
        appointmentLoading();
         // eslint-disable-next-line
      }, [])
    


  const  handleInputSpecialtyChange = ({target}) => {
    setFormValues({
      ...formValues,
      idDoctor: "",
      [target.name]: target.value
    })
    specialtiesDoctorLoading(target);

    
  }

  const handleDateChange = (e) => {
    setFormValues({
      ...formValues,
          fecha: e._d
    });
    // console.log(moment(e._d).format('YYYY-MM-DD'));
    loadHours(moment(e._d).format('YYYY-MM-DD'));
  
  }

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleInputDoctorChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })

    loadHours();
  }


  const loadHours =(dia) => {
    const doctorId = idDoctor
    const selectedDate = dia

    if(selectedDate ) {
      scheduleShiftDoctor(doctorId, selectedDate);
    }
    
  }
  
  const handleClear = () => {
    history.push('/reservas');
  }

  const handleClick = (e) => () => {
    const horaSelected = moment(e);
    setFormValues({
      ...formValues,
          hora: horaSelected._d
    });
    
  }


  const filterHours = () => {
    const fechasReserva = appointments.map((item) => item.fecha.getTime());
    const fechasTurnos = turnoDoctorDay.map((item) => item.fecha.getTime());

    const horaReserva = appointments.map((item) => item.hora.getTime());
    const horasTurno = turnoDoctorDay.map((turno) =>
      turno.slots.map((slot) => moment(slot).toDate().getTime())
    );

    const doctorReserva = appointments.map(item => item.idDoctor);
    const doctorTurno = turnoDoctorDay.map(item => item.idDoctor);

    const fechasTurnoDia = fechasTurnos.flat();
    const horasDia = horasTurno.flat();
    let filter = [];
    
    if(!fechasTurnoDia.includes(fechasReserva) && !doctorTurno.includes(doctorReserva)){
        return filter = horasDia.filter((hora) => !horaReserva.includes(hora));
        // filter = horasDia.filter((hora) => !horaReserva.includes(hora));
        // localStorage.setItem('turno', filter);
        // return;
    }else {
       return  filter = horasDia
      // filter = horasDia
      // localStorage.setItem('turno', filter);
      // return;
    }

  };

 
  
  const handleCreateAppointment = (e) => {
    // e.preventDefault();

    appointmentCreate(formValues);

    setFormValues({
      descripcion: "",
      idEspecialidad: "",
      idDoctor: "",
      fecha: now.toDate(),
      hora: "",
      tipo: "Consulta",
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
            Ingresar datos para la reserva
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <form
                noValidate
                autoComplete="off"
                className={classes.stepper}
                onSubmit={handleSubmit(handleCreateAppointment)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      inputRef={register({
                        required: 'Este campo es obligatorio!',
                        maxLength: 40,
                        // pattern: /^[A-Za-z]+$/i
                      })}
                      fullWidth
                      multiline
                      rows={2}
                      error={!!errors.descripcion}
                      id="descripcion"
                      label="Descripción"
                      name="descripcion"
                      value={descripcion || ""}
                      autoComplete="descripcion"
                      // helperText="Incorrect entry."
                      onChange={handleInputChange}
                      />
                        {errors.descripcion && (
                      <span className={classes.error}>{errors.descripcion.message}</span>
                      )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: 12 }}
                    >
                      <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                      >
                        Especialidad
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="idSpecialty"
                        value={idEspecialidad || ""}
                        name="idEspecialidad"
                        onChange={handleInputSpecialtyChange}
                        labelWidth={labelWidth}
                      >
                        {specialties.map((specialty) => (
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: 12 }}
                    >
                      <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                      >
                        Médico
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="idDoctor"
                        value={idDoctor || ""}
                        name="idDoctor"
                        displayEmpty
                        disabled={specialtyDocs.length < 2 ? true : false}
                        onChange={handleInputDoctorChange}
                        labelWidth={labelWidth}
                      >
                        {
                          specialtyDocs.map((doc) => (
                          <MenuItem
                            key={doc.id}
                            value={doc.id}
                            // style={getStyles(name, personName, theme)}
                          >
                            {doc.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        autoOk
                        disabled={idDoctor.length < 2 ? true : false}
                        variant="inline"
                        inputVariant="outlined"
                        margin="normal"
                        fullWidth
                        id="fecha"
                        label="Fecha"
                        name="fecha"
                        // format="MM/dd/yyyy"
                        value={fecha || ""}
                        minDate={new Date()}
                        maxDate={dateMax}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

               
                  
                  <Grid item xs={12}>
                    <Typography>Seleccione una hora</Typography>
                    </Grid>
                    {
                      
                      !turnoDoctorDay || turnoDoctorDay.length === 0 || idDoctor === "" || 
                      turnoDoctorDay[0].idDoctor !== idDoctor ? 
                      (
                        
                        <Fade in>
                        <Grid item xs={12}>
                        <Alert 
                        severity="info"
                        className={classes.alerta}
                        >Debe seleccionar un médico y una fecha para poder ver las horas disponibles!</Alert></Grid></Fade>
                       
                      ) :  
                    
                      fechaTiempo = turnoDoctorDay.map(f => moment(f.fecha).format('DD-MM-YYYY')),
                      fechaTiempo[0] !== moment(fecha).format('DD-MM-YYYY') ? 
                      (
                        
                        <Fade in>
                        <Grid item xs={12}>
                        <Alert 
                        severity="info"
                        className={classes.alerta}
                        >Debe seleccionar un médico y una fecha para poder ver las horas disponibles!</Alert></Grid></Fade>
                       
                      ) :(
                        // <Grid container>
                        filterHoursDay = filterHours(),
                        filterHoursDay.map((horas =>
                          <Grid item xs={3} key={horas} className={classes.horas}>
                                 <Zoom in>
                                   <Chip
                                     className={classes.hora}
                                     label={moment(horas).format("HH:mm")}
                                     color="primary"
                                     id="hora"
                                     name="hora"
                                     value={hora || ""}
                                    //  clickable={true}
                                     onClick={handleClick(horas)}
                                   />
                                   </Zoom>
                                 </Grid>
                        ))
                        // console.log(JSON.parse("["+ lastShift +"]")),

                        // JSON.parse("["+ lastShift +"]").map((horas =>
                        //   <Grid item xs={3} key={horas} className={classes.horas}>
                        //          <Zoom in>
                        //            <Chip
                        //              className={classes.hora}
                        //              label={moment(horas).format("HH:mm")}
                        //              color="primary"
                        //              id="hora"
                        //              name="hora"
                        //              value={hora || ""}
                        //             //  clickable={true}
                        //              onClick={handleClick(horas)}
                        //            />
                        //            </Zoom>
                        //          </Grid>
                        // ))
                      )
                    }
                 

                  <Grid item xs={12}>
                    <FormControl component="fieldset" className={classes.tipo}>
                      <FormLabel component="legend">Tipo de reserva</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="tipo"
                        value={tipo || ""}
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value="Consulta"
                          control={<Radio color="primary" />}
                          label="Consulta"
                        />
                        <FormControlLabel
                          value="Examen"
                          control={<Radio color="primary" />}
                          label="Examen"
                        />
                        <FormControlLabel
                          value="Operación"
                          control={<Radio color="primary" />}
                          label="Operación"
                        />
                        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="default"
                      // component={Link}
                      // to="/usuarios"
                      onClick={handleClear}
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
                      {/* {usuarioselect ? "Editar" : "Guardar"} */}
                      Guardar
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