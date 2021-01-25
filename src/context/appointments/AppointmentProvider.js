import React, { useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { AppointmentContext } from "./AppointmentContext";
import { appointmentReducer } from "./appointmentReducer";
import {prepareAppointmentTime} from "../../helpers/prepareAppointmentTime";
import { AuthContext } from "../auth/AuthContext";






export const AppointmentProvider = props => {


    const initialState = {
        appointments: [],
        appointmentPatient: [],
        appointmentsConfirmed: [],
        appointmentSelect: null
    }

    const [state, dispatch] = useReducer(appointmentReducer, initialState);

    const {user:{rol}} = useContext(AuthContext);
 

    const appointmentLoading = async () => {
     
      try {
        if (rol === 'USER_ROLE') {
          const resp = await fetchConToken("appointment/user");
          const body = await resp.json();
          const appointments = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoaded,
            payload: appointments,
          });
        }else if(rol === 'DOCTOR_ROLE') {
          const resp = await fetchConToken("appointment/doctor");
          const body = await resp.json();
          const appointments = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoaded,
            payload: appointments,
          });
        }else if(rol === 'ADMIN_ROLE') {
          const resp = await fetchConToken("appointment/admin");
          const body = await resp.json();
          const appointments = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoaded,
            payload: appointments,
          });
        }

      } catch (error) {
        console.log(error);
      }
    };

    const appointmentLoadingPatient = async () => {
      try {
        if (rol === 'USER_ROLE') {
          const resp = await fetchConToken("appointment/pending/user");
          const body = await resp.json();
  
          const reservasPaciente = prepareAppointmentTime(body.reservas);
  
          dispatch({
            type: types.appointmentsLoadedPatient,
            payload: reservasPaciente,
          });
        }else if(rol === 'DOCTOR_ROLE') {
          const resp = await fetchConToken("appointment/pending/doctor");
          const body = await resp.json();
  
          const reservasDoctor = prepareAppointmentTime(body.reservas);
  
          dispatch({
            type: types.appointmentsLoadedPatient,
            payload: reservasDoctor,
          });
        }else if(rol === 'ADMIN_ROLE') {
          const resp = await fetchConToken("appointment/pending/admin");
          const body = await resp.json();
  
          const reservasAdmin = prepareAppointmentTime(body.reservas);
  
          dispatch({
            type: types.appointmentsLoadedPatient,
            payload: reservasAdmin,
          });
        }
       
      } catch (error) {
        console.log(error);
      }
    };


    const appointmentLoadingConfirmed = async () => {
      try {
        if (rol === 'USER_ROLE') {
          const resp = await fetchConToken("appointment/confirmed/user");
          const body = await resp.json();

          const reservasPaciente = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoadedConfirmed,
            payload: reservasPaciente,
          });
        }else if(rol === 'DOCTOR_ROLE') {
          const resp = await fetchConToken("appointment/confirmed/doctor");
          const body = await resp.json();

          const reservasPaciente = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoadedConfirmed,
            payload: reservasPaciente,
          });
        }else if(rol === 'ADMIN_ROLE') {
          const resp = await fetchConToken("appointment/confirmed/admin");
          const body = await resp.json();

          const reservasPaciente = prepareAppointmentTime(body.reservas);

          dispatch({
            type: types.appointmentsLoadedConfirmed,
            payload: reservasPaciente,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const appointmentCreate = async (datos) => {
      const resp = await fetchConToken("appointment/new", datos, "POST");
      const body = await resp.json();

      try {
        if (body.ok) {
          dispatch({
            type: types.appointmentAddNew,
            payload: datos,
          });
          Swal.fire("Success", body.msg, "success");
        } else {
          console.log(body.msg);
          Swal.fire("Error", body.msg, "error");
        }
      } catch (error) {
        console.log(error);
      }
    };


    const appointmentUpdate = async (appointment) => {
      try {
     
       
        const resp = await fetchConToken(`appointment/${appointment.id}`, appointment, "PUT");
        const body = await resp.json();

        
        if (body.ok) {
          dispatch({
            type: types.appointmentUpdated,
            payload: appointment
          });
          Swal.fire("Success", body.msg, "success");
        } else {
          Swal.fire("Error", body.msg, "error");
        }

        
      } catch (error) {
        console.log(error);
      }
  };


    const userAppointmentStatusUpdate = async (appointment) => {

      try {
        
        appointment.status = 'Cancelada'
       
        const resp = await fetchConToken(`appointment/${appointment.id}`,appointment, "PUT");
        const body = await resp.json();

        
        if (body.ok) {
          dispatch({
            type: types.appointmentUserStatusUpdated,
            payload: appointment.id
          });
          Swal.fire("Success", body.msg, "success");
        } else {
          Swal.fire("Error", body.msg, "error");
        }

        
      } catch (error) {
        console.log(error);
      }
  };


  const appointmentStatusUpdate = async (appointment) => {

    try {
      
      appointment.status = 'Cancelada'
     
      const resp = await fetchConToken(`appointment/cancel/${appointment.id}`,appointment, "PUT");
      const body = await resp.json();

      
      if (body.ok) {
        dispatch({
          type: types.appointmentStatusUpdated,
          payload: appointment.id
        });
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }

      
    } catch (error) {
      console.log(error);
    }
};



  const appointmentConfirmUpdate = async (appointment) => {

    try {
      
      appointment.status = 'Confirmada'
     
      const resp = await fetchConToken(`appointment/${appointment.id}`,appointment, "PUT");
      const body = await resp.json();

      
      if (body.ok) {
        dispatch({
          type: types.appointmentUserStatusUpdated,
          payload: appointment.id
        });
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }

      
    } catch (error) {
      console.log(error);
    }
};


  
  const saveCurrentAppointment = appointment => {
    dispatch({
      type: types.appointmentSetActive,
     payload: appointment
    })  
  }

  const cleanCurrentAppointment = () => {
    dispatch({
      type: types.appointmentCleanActive
    })  
  }



    return (
        <AppointmentContext.Provider 
            value={{
                state, 
                dispatch,
                appointments:state.appointments,
                appointmentPatient:state.appointmentPatient,
                appointmentsConfirmed:state.appointmentsConfirmed,
                appointmentSelect:state.appointmentSelect,
                appointmentCreate,
                appointmentLoading,
                appointmentLoadingPatient,
                appointmentLoadingConfirmed,
                userAppointmentStatusUpdate,
                appointmentUpdate,
                saveCurrentAppointment,
                appointmentConfirmUpdate,
                cleanCurrentAppointment,
                appointmentStatusUpdate

            }}>
            {props.children}
        </AppointmentContext.Provider>
    )

}