import React, { useReducer } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import {fetchConToken} from "../../helpers/fetch";
import { types } from "../../types/types";
import { AuthContext } from "../auth/AuthContext";



import {UsuarioContext} from './UsuarioContext';
import {usuarioReducer} from './usuarioReducer';



export const UsuarioProvider = props => {


    const initialState = {
        usuarios: [],
        usuarioCreado: false,
        usuarioselect: null
    }

    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    const {user:{uid}} = useContext(AuthContext);

   

    const usersStartLoading = async () => {

        try {


            const resp = await fetchConToken('user');
            const body = await resp.json();


            const usuarios = body.users;

            dispatch(usersLoaded(usuarios));

                 
        } catch (error) {
            console.log(error);
        }

    }

    const usersLoaded = (usuarios) => ({
        type: types.usersLoaded,
        payload: usuarios
    });



    const crearUsuario = async (datos) => {
      const resp = await fetchConToken("user/new", datos, "POST");
      const body = await resp.json();

      try {
        if (body.ok) {
          dispatch({
            type: types.userCreate,
            payload: datos,
          });
          Swal.fire("Success", body.msg, "success");
        } else {
          console.log(body.msg);
          Swal.fire("Error", body.msg, "error");
        }
      } catch (error) {
        console.log(error);
      }
    };



    const userStartUpdate = async (user) => {
        try {
          // if (id === uid) {
          //   return Swal.fire("Error", "No puede borrarse a si mismo", "error");
          // }
  
          const resp = await fetchConToken(`user/${user.id}`, user, "PUT");
          const body = await resp.json();
  
          // console.log(body);
          if (body.ok) {
            dispatch({
              type: types.userUpdated,
              payload: user
            });
            Swal.fire("Success", body.msg, "success");
          } else {
            Swal.fire("Error", body.msg, "error");
          }
  
          
        } catch (error) {
          console.log(error);
        }
      };

  
      const guardarUsuarioActual = user => {
          dispatch({
            type: types.usuarioSeleccionado,
           payload: user
          })  
      }



    const userStartDelete = async (id) => {
      try {
        if (id === uid) {
          return Swal.fire("Error", "No puede borrarse a si mismo", "error");
        }

        const resp = await fetchConToken(`user/${id}`, {}, "DELETE");
        const body = await resp.json();

        if (body.ok) {
          dispatch({
            type: types.userDeleted,
            payload: id,
          });
          Swal.fire("Success", body.msg, "success");
        } else {
          Swal.fire("Error", body.msg, "error");
        }
      } catch (error) {
        console.log(error);
      }
    };


   


    return (
        <UsuarioContext.Provider 
            value={{
                state, 
                dispatch,
                usuarios:state.usuarios,
                usuarioCreado:state.usuarioCreado,
                usuarioselect: state.usuarioselect,
                usersStartLoading,
                userStartDelete,
                crearUsuario,
                guardarUsuarioActual,
                userStartUpdate
            }}>
            {props.children}
        </UsuarioContext.Provider>
    )

}