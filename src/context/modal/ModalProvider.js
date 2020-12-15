import React, { useReducer } from "react";
import { types } from "../../types/types";
import { ModalContext } from "./ModalContext";
import { modalReducer } from "./modalReducer";


export const ModalProvider = props => {


    const initialState = {
      modalOpen: false,
      modalCalendarOpen: false
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




    return (
        <ModalContext.Provider 
            value={{
                state, 
                dispatch,
                modalOpen: state.modalOpen,
                modalCalendarOpen: state.modalCalendarOpen,
                uiOpenModal,
                uiCloseModal,
                openCalendarModal,
                closeCalendarModal 
            }}>
            {props.children}
        </ModalContext.Provider>
    )


}