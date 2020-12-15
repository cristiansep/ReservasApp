import { types } from "../../types/types";




export const modalReducer = (state, action) => {

    switch (action.type) {
        case types.openModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.closeModal:
            return {
                ...state,
                modalOpen: false,
            }
        case types.openCalendarModal:
            return {
                ...state,
                modalCalendarOpen: true
            }
        case types.closeCalendarModal:
            return {
                ...state,
                modalCalendarOpen: false,
            }       
        default:
            return state;
    }

}