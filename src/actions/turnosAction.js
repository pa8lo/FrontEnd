import { MOSTRAR_TURNOS, MOSTRAR_TURNO, AGREGAR_TURNO, EDITAR_TURNO, BORRAR_TURNO } from '../actions/types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

export const mostrarTurnos = () => async dispatch => {
    const turnos = await axios.get('https://roraso.herokuapp.com/Turn/Turns',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_TURNOS,
            payload : res.data
        })

        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar turnos',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }
    })
    .catch(err => {

        if(err.response){
            
            if(err.response.status === 404){
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data}`,
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
            if(err.response.status === 401){
                Swal.fire({
                    title: 'Error!',
                    text: `No posee los permisos necesarios`,
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                // localStorage.removeItem("access-token");
                setTimeout(function(){ 
                    return window.location.replace("/");
                }, 3000);
                
            }
        }
    })

}

export const eliminarTurno = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Turn/DeleteTurn",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un turno',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/rrhh/turnos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el turno',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
            
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido la solicitud',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        })

    dispatch({
        type: BORRAR_TURNO,
        payload: id
    })
}

export const agregarTurno = (turno) => async dispatch => {

    const {nombre, outhour, outmin, inhour, inmin, user} = turno;

    const data = {
        Turno : {
            Name : nombre,
            OutHour : outhour,
            OutMinute : outmin ,
            InHour : inhour,
            InMinute : inmin
        },
        User : user
    }

    await axios.post("https://roraso.herokuapp.com/Turn/createTurn",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200 || res.status === 500){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo turno',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/rrhh/turnos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el turno',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido la solicitud',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        })

    dispatch({
        type: AGREGAR_TURNO,
        payload: turno
    })
}

// export const editarRol = (rol) => async dispatch => {
    
//     const {id, nombre, descripcion, permisos} = rol;

//     const data = {
//         rol : {
//             id : id,
//             Name : nombre,
//             Description : descripcion,
//         },
//         Authorizations : permisos
//     }

//     console.log(data);

//     dispatch({
//         type: EDITAR_ROL,
//         payload: rol
//     })
    
// }