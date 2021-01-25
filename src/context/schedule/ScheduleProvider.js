import React, { useContext, useReducer } from "react";
import { types } from "../../types/types";
import { ScheduleContext } from "./ScheduleContext";
import { scheduleReducer } from "./scheduleReducer";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { prepareDates } from "../../helpers/prepareDates";
import { AuthContext } from "../auth/AuthContext";
import { prepareShift } from "../../helpers/prepareShift";


export const ScheduleProvider = props => {


    const initialState = {
       turnos:[],
      turnoActivo: null,
      selectedShift: null,
      turnoDoctorDay: null
    }

    const [state, dispatch] = useReducer(scheduleReducer, initialState);
    const {user: {uid, name}} = useContext(AuthContext);


    const schedulesLoading = async () => {
      try {
        const resp = await fetchConToken("schedule");
        const body = await resp.json();

        const schedules = prepareDates(body.turnos);

        dispatch({
          type: types.schedulesLoaded,
          payload: schedules,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const scheduleShiftDoctor = async (idDoctor, day) => {

   
      try {
        const resp = await fetchConToken(`schedule/${idDoctor}/${day}`);
        const body = await resp.json();
        
        const shift = prepareShift(body.turno);

        dispatch({
          type: types.scheduleShiftDay,
          payload: shift,
        });
      } catch (error) {
        console.log(error);
      }
    };
 
    const scheduleStartAddNew = async (schedule) => {
      
      const {start, end, slots} = schedule.shift;
      const {title,day, fecha} = schedule;


      const resp = await fetchConToken("schedule/new", {title, day,fecha ,start, end, slots}, "POST");
      const body = await resp.json();

      try {
        if (body.ok) {
          schedule.shift.id = body.horarioGuardado.id;
          schedule.shift.slots = body.horarioGuardado.slots;
          schedule.day = body.horarioGuardado.day;
          schedule.fecha = body.horarioGuardado.fecha;
          schedule.shift.User = {
            id: uid,
            name: name,
          };
          dispatch({
            type: types.scheduleAddNew,
            payload: schedule.shift,
          });
          // console.log(schedule.day)
          Swal.fire("Success", body.msg, "success");
        } else {
          console.log(body.msg);
          Swal.fire("Error", body.msg, "error");
        }
      } catch (error) {
        console.log(error);
      }
    };


    const scheduleUpdate = async(schedule) => {

  
      const resp = await fetchConToken(`schedule/${schedule.id}`, schedule, "PUT");
      const body = await resp.json();

      try {
        if (body.ok) {
          dispatch({
              type: types.scheduleUpdated,
              payload: schedule,
            });
          Swal.fire("Success", body.msg, "success");
        } else {
          console.log(body.msg);
          Swal.fire("Error", body.msg, "error");
        }
      } catch (error) {
        console.log(error);
      }

  }

    const scheduleSetActive = (schedule) => {

        dispatch({
            type: types.scheduleSetActive,
            payload: schedule,
          });
    }

    const scheduleClearActive = () => {
        dispatch({
            type: types.scheduleClearActive,
          });
    }

    const scheduleSelectedShift = (shift, day, fecha) => {
      dispatch({
        type: types.scheduleSelectedShift,
        payload: {shift, day, fecha}
      });
    }

    const scheduleClearShift = () => {
      dispatch({
          type: types.scheduleClearShift,
        });
  }


  const scheduleDelete = async () => {
    try {
      const resp = await fetchConToken(`schedule/${state.turnoActivo.id}`,{},"DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch({
          type: types.scheduleDeleted,
          payload: state.turnoActivo.id,
        });
        Swal.fire("Success", body.msg, "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };




    return (
        <ScheduleContext.Provider 
            value={{
                state, 
                dispatch,
                turnos:state.turnos,
                turnoActivo: state.turnoActivo,
                selectedShift: state.selectedShift,
                turnoDoctorDay: state.turnoDoctorDay,
                scheduleStartAddNew,
                scheduleSetActive,
                scheduleClearActive,
                schedulesLoading,
                scheduleSelectedShift,
                scheduleClearShift,
                scheduleUpdate,
                scheduleDelete,
                scheduleShiftDoctor 
            }}>
            {props.children}
        </ScheduleContext.Provider>
    )


}