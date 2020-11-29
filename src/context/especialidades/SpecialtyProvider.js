import React, { useReducer } from "react";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { SpecialtyContext } from "./SpecialtyContext";
import { specialtyReducer } from "./specialtyReducer";






export const SpecialtyProvider = props => {


    const initialState = {
        specialties: [],
        specialtySelect: null
    }

    const [state, dispatch] = useReducer(specialtyReducer, initialState);


    const specialtiesStartLoading = async () => {

        try {

         
            const resp = await fetchConToken('specialty');
            const body = await resp.json();

            console.log(body.especialidades)
            const specialties = body.especialidades;

            dispatch(specialtiesLoaded(specialties));

                 
        } catch (error) {
            console.log(error);
        }

    }

    const specialtiesLoaded = (specialties) => ({
        type: types.specialtiesLoaded,
        payload: specialties
    });







    // const specialtyStartUpdate = async (user) => {
    //     try {
    //       // if (id === uid) {
    //       //   return Swal.fire("Error", "No puede borrarse a si mismo", "error");
    //       // }
  
    //       const resp = await fetchConToken(`user/${user.id}`, user, "PUT");
    //       const body = await resp.json();
  
    //       // console.log(body);
    //       if (body.ok) {
    //         dispatch({
    //           type: types.userUpdated,
    //           payload: user
    //         });
    //         Swal.fire("Success", body.msg, "success");
    //       } else {
    //         Swal.fire("Error", body.msg, "error");
    //       }
  
          
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

  
      const guardarEspecialidadActual = specialty => {
          dispatch({
            type: types.especialidadSeleccionada,
           payload: specialty
          })  
      }




      
    const specialtyStartDelete = async (id) => {
        try {
          
  
          const resp = await fetchConToken(`specialty/${id}`, {}, "DELETE");
          const body = await resp.json();
  
          if (body.ok) {
            dispatch({
              type: types.specialtyDeleted,
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
        <SpecialtyContext.Provider 
            value={{
                state, 
                dispatch,
                specialties:state.specialties,
                // usuarioCreado:state.usuarioCreado,
                specialtySelect: state.specialtySelect,
                specialtiesStartLoading,
                guardarEspecialidadActual,
                specialtyStartDelete
                // usersStartLoading,
                // userStartDelete,
                // crearUsuario,
                // guardarUsuarioActual,
                // userStartUpdate
            }}>
            {props.children}
        </SpecialtyContext.Provider>
    )

}