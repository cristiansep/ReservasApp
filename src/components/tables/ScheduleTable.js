import React, { useContext, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { CalendarModal } from '../CalendarModal';
import { ModalContext } from '../../context/modal/ModalContext';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import moment from 'moment';
import Swal from 'sweetalert2';

import 'moment/locale/es.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ScheduleContext } from '../../context/schedule/ScheduleContext';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment); // or globalizeLocalizer


const useStyles = makeStyles((theme) => ({
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
buttons: {
  display: 'flex',
  justifyContent: 'flex-end',
},
button: {
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(2),
  marginRight: theme.spacing(2),
},
calendarScreen: {
  display: 'flex',
  flexFlow: 'column',
  height: '100vh'
}
}));


const now = moment();

export const ScheduleTable = () => {

  const classes = useStyles();

  
  const {
      scheduleSetActive, 
      turnos, 
      turnoActivo,
      scheduleClearActive,
      schedulesLoading, 
      scheduleSelectedShift, 
      scheduleClearShift} = useContext(ScheduleContext);
  const {openCalendarModal} = useContext(ModalContext);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


  useEffect(() => {
    schedulesLoading();
     // eslint-disable-next-line
  }, [])

  const onDoubleClick = (e) => {
    // scheduleSetActive(e);
    openCalendarModal(e);
  }


  const onSelectEvent = (e) => {
    scheduleSetActive(e);
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    // const {start, end,slots} = e;
    const day = e.start
    const fecha = e.start
    console.log(moment(fecha).format('YYYY-MM-DD'));
    if(e.action === 'click' || e.action === 'doubleClick') {
      scheduleClearActive();
      scheduleClearShift();
      return;
    }
    if(e.start < now) {
      return Swal.fire('Error', 'La fecha seleccionada debe ser mayor a la fecha actual', 'error');
    }
    // scheduleSelectedShift({start, end,slots});
    scheduleSelectedShift(e,moment(day).day(),moment(fecha).format('YYYY-MM-DD'));
    openCalendarModal(e);
  }





const eventStyleGetter = (title,start,end,isSelected) => {
    const style = {
      backgorundColor: '#367cf7',
      boderRadius: '0px ',
      opacity: 0.8,
      display: 'block',
    }

    return {style}

}


  return (
    <TableContainer component={Paper}>
      <div className={classes.calendarScreen}>
      <Calendar
      localizer={localizer}
      events={turnos}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      view={lastView}
      onSelectSlot={onSelectSlot}
      selectable={true}
      views={['week', 'day', 'agenda']}
      
      />
    <CalendarModal/>
    {
      (turnoActivo) && <DeleteEventFab/> 
    }
    
    </div>
    </TableContainer>
  );
}