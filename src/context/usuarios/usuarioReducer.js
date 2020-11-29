import { types } from "../../types/types";




export const usuarioReducer = (state, action) => {

    switch (action.type) {
        case types.obtenerUsuarios:
            return {
                ...state,
                usuarios: action.payload
                // ...action.payload
            }
        case types.userCreate:
            return {
                ...state,
                ...action.payload,
                usuarioCreado: true
            }
        case types.usersLoaded:
            return {
                ...state,
                usuarios: [...action.payload]
            }
        case types.usuarioSeleccionado:
            return {
                ...state,
                usuarioselect: action.payload
            }
        case types.userUpdated:
            return {
                ...state,
                usuarios: state.usuarios.map(
                   usuario => (usuario.id === action.payload.id) ? action.payload : usuario
                ),
                usuarioselect: null
            }
        case types.userDeleted:
            return {
                ...state,
                usuarios: state.usuarios.filter(
                    e => (e.id !== action.payload)
                )
            }
        default:
            return state;
    }

}