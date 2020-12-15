import { types } from "../../types/types";




export const usuarioReducer = (state, action) => {
    switch (action.type) {

        case types.userCreate:
            return {
                ...state,
                ...action.payload,
                usuarioCreado: true
            }
        case types.doctorCreate:
            return {
                ...state,
                ...action.payload,
            }
        case types.usersLoaded:
            return {
                ...state,
                usuarios: [...action.payload]
            }
        case types.doctorsLoaded:
            return {
                ...state,
                doctors: [...action.payload]
            }
        case types.usuarioSeleccionado:
            return {
                ...state,
                usuarioselect: action.payload
            }
        case types.doctorSeleccionado:
            return {
                ...state,
                doctorSelect: action.payload
            }
        case types.userUpdated:
            return {
                ...state,
                usuarios: state.usuarios.map(
                   usuario => (usuario.id === action.payload.id) ? action.payload : usuario
                ),
                usuarioselect: null
            }
        case types.doctorUpdated:
            return {
                ...state,
                doctors: state.doctors.map(
                   doctor => (doctor.id === action.payload.id) ? action.payload : doctor
                ),
                doctorSelect: null
            }
        case types.userDeleted:
            return {
                ...state,
                usuarios: state.usuarios.filter(
                    e => (e.id !== action.payload)
                )
            }
        case types.doctorDeleted:
            return {
                ...state,
                doctors: state.doctors.filter(
                     e => (e.id !== action.payload)
                )
            }
        case types.userSelectClear: {
            return {
                ...state,
                usuarioselect: null
            }
        }
        case types.doctorSelectClear: {
            return {
                ...state,
                doctorSelect: null
            }
        }
        default:
            return state;
    }

}