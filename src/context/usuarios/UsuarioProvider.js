import React, { useReducer } from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import {fetchConToken} from "../../helpers/fetch";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";
import { AuthContext } from "../auth/AuthContext";



import {UsuarioContext} from './UsuarioContext';
import {usuarioReducer} from './usuarioReducer';



export const UsuarioProvider = props => {


    const initialState = {
        usuarios: [],
        doctors: [],
        usuarioCreado: false,
        usuarioselect: null,
        doctorSelect: null
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


    const doctorsLoading = async () => {

      try {


          const resp = await fetchConToken('doctor');
          const body = await resp.json();

          const doctors = body.users;

          dispatch({
            type: types.doctorsLoaded,
            payload: doctors
          });

               
      } catch (error) {
          console.log(error);
      }

  }


  const saveSchedule = async (datos) => {

    try {

      console.log(datos)
        // const resp = await fetchConToken('doctor');
        // const body = await resp.json();

        // console.log(body.users);

        // const doctors = body.users;

        // dispatch({
        //   type: types.doctorsLoaded,
        //   payload: doctors
        // });

             
    } catch (error) {
        console.log(error);
    }

}



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


    const crearMedico = async (datos) => {

      const resp = await fetchConToken("doctor/new", datos, "POST");
      const body = await resp.json();

      try {
        if (body.ok) {
          dispatch({
            type: types.doctorCreate,
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
       
  
          const resp = await fetchConToken(`user/${user.id}`, user, "PUT");
          const body = await resp.json();
  
          
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


    const doctorStartUpdate = async (user) => {
      try {
     
       
        const resp = await fetchConToken(`doctor/${user.id}`, user, "PUT");
        const body = await resp.json();

        
        if (body.ok) {
          dispatch({
            type: types.doctorUpdated,
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


      const userStartUploading = async (file) => {

        try {

            Swal.fire({
              title: 'Uploading...',
              text: 'Please wait...',
              allowOutsideClick: false,
              willOpen: () => {
                  Swal.showLoading();
              }
            });

         
          const fileUrl = await fileUpload(file);
          state.usuarioselect.img = fileUrl;

          Swal.close();

          const resp = await fetchConToken(`user/${state.usuarioselect.id}`, state.usuarioselect, "PUT");
          const body = await resp.json();
  

          if (body.ok) {
            dispatch({
              type: types.userUpdated,
              payload: fileUrl
            });
            Swal.fire("Success", body.msg, "success");
          } else {
            Swal.fire("Error", body.msg, "error");
          }
          
          
        } catch (error) {
          console.log(error)
        }
      }


      const doctorStartUploading = async (file) => {

        try {

            Swal.fire({
              title: 'Uploading...',
              text: 'Please wait...',
              allowOutsideClick: false,
              willOpen: () => {
                  Swal.showLoading();
              }
            });

         
          const fileUrl = await fileUpload(file);
          state.doctorSelect.img = fileUrl;

          Swal.close();

          const resp = await fetchConToken(`user/${state.doctorSelect.id}`, state.doctorSelect, "PUT");
          const body = await resp.json();
  

          if (body.ok) {
            dispatch({
              type: types.doctorUpdated,
              payload: fileUrl
            });
            Swal.fire("Success", body.msg, "success");
          } else {
            Swal.fire("Error", body.msg, "error");
          }
          
          
        } catch (error) {
          console.log(error)
        }
      }

  
      const guardarUsuarioActual = user => {
          dispatch({
            type: types.usuarioSeleccionado,
            payload: user
          })  
      }

      const guardarDoctorSeleccionado = user => {
        dispatch({
          type: types.doctorSeleccionado,
          payload: user
        })  
    }

      const limpiarUsuarioSelect = () => {
        dispatch({
          type: types.userSelectClear
        });
      }

      const limpiarDoctorSelect = () => {
        dispatch({
          type: types.doctorSelectClear
        });
      }



    const userStartDelete = async (id) => {
      try {
        if (id === uid) {
          return Swal.fire("Error", "No puede borrarse a si mismo", "error");
        }

        const alert = await Swal.fire({
          title: "¿Está seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sí, ¡bórrelo!",
        });

        if (alert.value) {
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
        }
      } catch (error) {
        console.log(error);
      }
    };


    const doctorStartDelete = async (id) => {
      try {
        if (id === uid) {
          return Swal.fire("Error", "No puede borrarse a si mismo", "error");
        }

        const alert = await Swal.fire({
          title: "¿Está seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sí, ¡bórrelo!",
        });

        if (alert.value) {
          const resp = await fetchConToken(`doctor/${id}`, {}, "DELETE");
          const body = await resp.json();

          if (body.ok) {
            dispatch({
              type: types.doctorDeleted,
              payload: id,
            });
            Swal.fire("Success", body.msg, "success");
          } else {
            Swal.fire("Error", body.msg, "error");
          }
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
                doctors: state.doctors,
                usuarioCreado:state.usuarioCreado,
                usuarioselect: state.usuarioselect,
                doctorSelect: state.doctorSelect,
                usersStartLoading,
                doctorsLoading,
                crearMedico,
                doctorStartUpdate,
                doctorStartDelete,
                userStartDelete,
                crearUsuario,
                guardarUsuarioActual,
                guardarDoctorSeleccionado,
                userStartUpdate,
                limpiarUsuarioSelect,
                limpiarDoctorSelect,
                userStartUploading,
                saveSchedule,
                doctorStartUploading
            }}>
            {props.children}
        </UsuarioContext.Provider>
    )

}