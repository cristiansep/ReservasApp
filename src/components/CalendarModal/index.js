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
import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import moment from 'moment';
import 'moment/locale/es.js';
import Swal from 'sweetalert2';
import { ScheduleContext } from '../../context/schedule/ScheduleContext';




const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: theme.spacing(100),
    height: theme.spacing(60),
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
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(1),
  },
  picker: {
    width: theme.spacing(94),
  }
}));

const dia = moment().format('dddd');                   
const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus = now.clone().add(1, 'hours');


const initEvent = {
  title: '',
  start: now.toDate(),
  end: nowPlus.toDate()
}


export const CalendarModal = () => {
  const classes = useStyles();

  const {modalCalendarOpen, closeCalendarModal} = useContext(ModalContext);
  
  const {turnoActivo, scheduleStartAddNew: scheduleStartAddNew, scheduleClearActive ,selectedShift, scheduleClearShift, scheduleUpdate } = useContext(ScheduleContext);
  

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus.toDate());



  const [formValues, setFormValues] = useState(initEvent);

  const {title,start, end} = formValues;


  useEffect(() => {
    if(turnoActivo) {
      setFormValues(turnoActivo);
    }else if(selectedShift) {
      setFormValues({
        ...selectedShift,
        title: ""
      });
    }else {
      setFormValues(initEvent);
    }
  }, [turnoActivo,selectedShift,setFormValues])


  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }


  const handleStartDateChange = (e) => {
    setDateStart(e._d);
    setFormValues({
      ...formValues,
          start: e._d
    });
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e._d);
    setFormValues({
      ...formValues,
          end: e._d
    });
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // const momentStart = moment(start);
    // const momentEnd = moment(end);

    // if(momentStart.isSameOrAfter(momentEnd)){
    //   Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
    //   return;
    // }

    closeCalendarModal();

    if(!turnoActivo) {
     scheduleStartAddNew(formValues);
    }else {
      scheduleUpdate(formValues);
    }
    
    scheduleClearShift();

  }


  const handleClose = () => {
    closeCalendarModal();
    scheduleClearActive();
    scheduleClearShift();
    setFormValues(initEvent);
    
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalCalendarOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalCalendarOpen}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Ingresar Horario de trabajo
            </Typography>
            <React.Fragment>
              <React.Fragment>
                <form
                  noValidate
                  autoComplete="off"
                  className={classes.stepper}
                  onSubmit={handleSubmitForm}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        // variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Titulo"
                        name="title"
                        value={title}
                        autoComplete="Especialidad"
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        {/* <DateTimePicker
                          margin="normal"
                          label="Hora de inicio"
                          value={start}
                          onChange={handleStartDateChange}
                          fullWidth
                          ampm={false}
                          minDate={dateStart}
                        />

                        <DateTimePicker
                          margin="normal"
                          label="Hora de fin"
                          value={end}
                          onChange={handleEndDateChange}
                          fullWidth
                          ampm={false}
                          minDate={dateStart}
                        /> */}

                        {/* <KeyboardDatePicker
                          margin="normal"
                          fullWidth
                          id="date-picker-dialog"
                          label="Dia"
                          // format="MM/dd/yyyy"
                          value={start}
                          minDate={new Date()}
                          onChange={handleStartDayChange }
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        /> */}
                         <Typography variant="subtitle1" gutterBottom>
                            
                          </Typography>

                        <KeyboardTimePicker
                          margin="normal"
                          fullWidth
                          ampm={false}
                          format="HH:mm"
                          id="time-picker1"
                          label="Hora inicio"
                          value={start}
                          minDate={dateStart}
                          onChange={handleStartDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />

                        <KeyboardTimePicker
                          margin="normal"
                          fullWidth
                          ampm={false}
                          format="HH:mm"
                          id="time-picker2"
                          label="Hora fin"
                          value={end}
                          minDate={dateStart}
                          onChange={handleEndDateChange}
                          autoOk={true}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                  <React.Fragment>
                    <div className={classes.buttons}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={title.trim().length < 2 ? true : false}
                        color="primary"
                        className={classes.button}
                      >
                        {/* {specialtySelect ? "Editar" : "Guardar"} */}
                        Guardar
                      </Button>
                    </div>
                  </React.Fragment>
                </form>
              </React.Fragment>
            </React.Fragment>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}