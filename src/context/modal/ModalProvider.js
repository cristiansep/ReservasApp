import React, { useReducer } from "react";
import { types } from "../../types/types";
import { ModalContext } from "./ModalContext";
import { modalReducer } from "./modalReducer";


export const ModalProvider = props => {


    const initialState = {
      modalOpen: false,
      modalCalendarOpen: false,
      modalAppointmentOpen: false
    }

    const [state, dispatch] = useReducer(modalReducer, initialState);


    const uiOpenModal = () => {
        dispatch({
            type: types.openModal
        })
    };

    const uiCloseModal = () => {
        dispatch({
            type: types.closeModal
        })
    };

    const openCalendarModal = () => {
        dispatch({
            type: types.openCalendarModal
        })
    };

    const closeCalendarModal = () => {
        dispatch({
            type: types.closeCalendarModal
        })
    };


    const openAppointmentModal = () => {
        dispatch({
            type: types.openAppointmentModal
        })
    };

    const closeAppoitmentModal = () => {
        dispatch({
            type: types.closeAppointmentModal
        })
    };




    return (
        <ModalContext.Provider 
            value={{
                state, 
                dispatch,
                modalOpen:state.modalOpen,
                modalCalendarOpen:state.modalCalendarOpen,
                modalAppointmentOpen:state.modalAppointmentOpen,
                uiOpenModal,
                uiCloseModal,
                openCalendarModal,
                closeCalendarModal,
                openAppointmentModal,
                closeAppoitmentModal
            }}>
            {props.children}
        </ModalContext.Provider>
    )


}