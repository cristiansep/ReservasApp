import React, { useReducer } from "react";
import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { types } from "../../types/types";
import { SpecialtyContext } from "./SpecialtyContext";
import { specialtyReducer } from "./specialtyReducer";






export const SpecialtyProvider = props => {


    const initialState = {
        specialties: [],
        specialtyDocs: [],
        specialtySelect: null
    }

    const [state, dispatch] = useReducer(specialtyReducer, initialState);


    const specialtiesStartLoading = async () => {

        try {

         
            const resp = await fetchConToken('specialty');
            const body = await resp.json();

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


    const specialtiesDoctorLoading = async (specialty) => {


      try {
       
          const resp = await fetchConToken(`doctor/${specialty.value}/specialties`, specialty, );
          const body = await resp.json();

          const specialtiesDoctor = body.specialtyDoctor;
          
            dispatch({
              type: types.specialtyDoctor,
              payload: specialtiesDoctor,
            });
               
      } catch (error) {
          console.log(error);
      }

  }


    const specialtyCreated = async (datos) => {

      const resp = await fetchConToken("specialty/new", datos, "POST");
      const body = await resp.json();


      try {
        if (body.ok) {
          datos.id = body.especialidadDB.id
          dispatch({
            type: types.specialtyCreate,
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




    const specialtyStartUpdate = async (specialty) => {

        try {
  
          const resp = await fetchConToken(`specialty/${specialty.id}`, specialty, "PUT");
          const body = await resp.json();
  
          // console.log(body);
          if (body.ok) {
            dispatch({
              type: types.specialtyUpdated,
              payload: specialty
            });
            Swal.fire("Success", body.msg, "success");
          } else {
            Swal.fire("Error", body.msg, "error");
          }
  
          
        } catch (error) {
          console.log(error);
        }
      };

  
      const guardarEspecialidadActual = specialty => {
          dispatch({
            type: types.especialidadSeleccionada,
           payload: specialty
          })  
      }

      const ClearSpecialtySelect = () => {
        dispatch({
          type: types.specialtySelectClear
        });
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
                specialtyDocs:state.specialtyDocs,
                specialtySelect: state.specialtySelect,
                specialtiesStartLoading,
                specialtyCreated,
                guardarEspecialidadActual,
                specialtyStartUpdate,
                specialtyStartDelete,
                ClearSpecialtySelect,
                specialtiesDoctorLoading
            }}>
            {props.children}
        </SpecialtyContext.Provider>
    )

}