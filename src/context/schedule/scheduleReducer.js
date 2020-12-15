import { types } from "../../types/types";





export const scheduleReducer = (state, action) => {

    switch (action.type) {
        case types.scheduleSetActive:
            return {
                ...state,
                turnoActivo: action.payload
            }
        case types.scheduleAddNew:
            return {
                ...state,
                turnos: [
                    ...state.turnos,
                     action.payload
                ]
            } 
        case types.scheduleUpdated:
            return {
                ...state,
                turnos: state.turnos.map(
                    turno => (turno.id === action.payload.id) ? action.payload : turno
                )
            }
        case types.scheduleDeleted:
            return {
                ...state,
                turnos: state.turnos.filter(
                    turno => (turno.id !== action.payload)
                ),
                turnoActivo: null
            }  
        case types.scheduleClearActive: {
            return {
               ...state,
               turnoActivo: null
            }
        } 
        case types.schedulesLoaded:{
            return {
                ...state,
                turnos: [...action.payload]
            }
        }  
        case types.scheduleSelectedShift:
            return {
                ...state,
                selectedShift: action.payload
            }
            case types.scheduleClearShift: {
                return {
                   ...state,
                   selectedShift: null
                }
            } 
        default:
            return state;
    }

}