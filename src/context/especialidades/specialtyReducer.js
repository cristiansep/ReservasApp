import { types } from "../../types/types";




export const specialtyReducer = (state, action) => {

    switch (action.type) {
        // case types.userCreate:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         usuarioCreado: true
        //     }
        case types.specialtiesLoaded:
            return {
                ...state,
                specialties: [...action.payload]
            }
        case types.especialidadSeleccionada:
            return {
                ...state,
                specialtySelect: action.payload
            }
        // case types.userUpdated:
        //     return {
        //         ...state,
        //         usuarios: state.usuarios.map(
        //            usuario => (usuario.id === action.payload.id) ? action.payload : usuario
        //         ),
        //         usuarioselect: null
        //     }
        case types.specialtyDeleted:
            return {
                ...state,
                specialties: state.specialties.filter(
                    e => (e.id !== action.payload)
                )
            }
        default:
            return state;
    }

}