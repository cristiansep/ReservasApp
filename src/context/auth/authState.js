import React, { useReducer } from "react";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { types } from "../../types/types";

import {AuthContext} from './AuthContext';
import {authReducer} from './authReducer';

// const init = () => {
//     return JSON.parse(localStorage.getItem('user')) || {checking: false};
//   }

const initialState = {
    checking: true
}


export const AuthState = props => {

    const [user, dispatch] = useReducer(authReducer, initialState);


    const iniciarSesion = async datos => {

        try {

            const resp = await fetchSinToken('auth',datos,'POST');
            const body = await resp.json();

            
            if(body.ok) {
                localStorage.setItem("token", body.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                // dispatch({
                //   type: types.authLogin,
                //   payload: body,
                // });

                dispatch(login({
                    uid: body.uid,
                    name: body.name,
                    rol: body.rol
                }));

            }else {
                console.log(body.msg);
                Swal.fire('Error', body.msg, 'error');
            }
                 
        } catch (error) {
            console.log(error);
        }
    }

    const login = (user) => ({
        type: types.authLogin,
        payload: user
    });



    const startChecking = async() => {

        try {

            const resp = await fetchConToken('auth/renew');
            const body = await resp.json();

            // console.log(body);
            
            if(body.ok) {
                localStorage.setItem("token", body.token);
                localStorage.setItem("token-init-date", new Date().getTime());

                dispatch(login({
                    uid: body.uid,
                    name: body.name,
                    rol: body.rol
                }));

            }else {
                dispatch(checkingFinish());
            }
                 
        } catch (error) {
            console.log(error);
        }

    }

    const checkingFinish = () => ({type: types.authCheckingFinish});


     const startLogout = async() => {

        try {

            localStorage.clear();
            dispatch(logout());

            
        } catch (error) {
            console.log(error)
        }

    }

    const logout = () => ({type: types.authLogout});



    return (
        <AuthContext.Provider value={{user, dispatch, iniciarSesion, startChecking, startLogout}}>
            {props.children}
        </AuthContext.Provider>
    )
}