import { types } from "../../types/types";




export const appointmentReducer = (state, action) => {
  switch (action.type) {

    case types.appointmentAddNew:
      return {
        ...state,
        appointments: [
            ...state.appointments, 
            action.payload
        ],
      };
    case types.appointmentsLoaded:
        return {
            ...state,
            appointments: [...action.payload]
        }
    case types.appointmentsLoadedPatient:
        return {
            ...state,
            appointmentPatient: [...action.payload]
        }
    case types.appointmentsLoadedConfirmed:
        return {
            ...state,
            appointmentsConfirmed: [...action.payload]
        }
    case types.appointmentSetActive:
        return {
            ...state,
            appointmentSelect: action.payload
        }
    case types.appointmentUserStatusUpdated:
        return {
            ...state,
            appointmentPatient: state.appointmentPatient.filter(
                e => (e.id !== action.payload)
            ),
            appointmentSelect: null      
        }
    case types.appointmentStatusUpdated:
        return {
            ...state,
            appointmentsConfirmed: state.appointmentsConfirmed.filter(
                e => (e.id !== action.payload)
            ),
            appointmentSelect: null      
        }
    case types.appointmentUpdated:
        return {
            ...state,
            appointments: state.appointments.map(
                appointment => (appointment.id === action.payload.id) ? action.payload : appointment
            ),
            appointmentSelect: null
        }
    case types.appointmentCleanActive:
        return {
            ...state,
            appointmentSelect: null
        }
    default:
      return state;
  }
};


