import { types } from "../../types/types";




export const specialtyReducer = (state, action) => {

    switch (action.type) {
        case types.specialtyCreate:
            return {
                ...state,
                specialties: [
                    ...state.specialties,
                    action.payload
                ]
            }
        case types.specialtiesLoaded:
            return {
                ...state,
                specialties: [...action.payload]
            }
        case types.specialtyDoctor:
            return {
                ...state,
                specialtyDocs: [...action.payload]
            }
        case types.especialidadSeleccionada:
            return {
                ...state,
                specialtySelect: action.payload
            }
        case types.specialtyUpdated:
            return {
                ...state,
                specialties: state.specialties.map(
                   specialty => (specialty.id === action.payload.id) ? action.payload : specialty
                ),
                specialtySelect:null
            }
        case types.specialtyDeleted:
            return {
                ...state,
                specialties: state.specialties.filter(
                    e => (e.id !== action.payload)
                )
            }
        case types.specialtySelectClear:
            return {
                ...state,
                specialtySelect: null
            }
        default:
            return state;
    }

}