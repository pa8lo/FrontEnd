import { MOSTRAR_CLIENTES, MOSTRAR_CLIENTE_TELEFONO, AGREGAR_DIRECCION_CLIENTE, AGREGAR_CLIENTE, EDITAR_CLIENTE, BORRAR_CLIENTE } from './types';
import axios from 'axios';

// CSS
import Swal from 'sweetalert2'

export const mostrarClientes = () => async dispatch => {
    const clientes = await axios.get('https://roraso.herokuapp.com/Client/Clients',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_CLIENTES,
            payload : res.data
        })

        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar clientes',
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

export const mostrarCliente = (telefono) => async dispatch => {
    const cliente = await axios.get(`https://roraso.herokuapp.com/Client/Client?Phone=${telefono}`,
    { headers: { 'access-token': localStorage.getItem('access-token')}})


    dispatch({
        type: MOSTRAR_CLIENTE_TELEFONO,
        payload: cliente.data
    });
}

export const agregarCliente = (cliente) => async dispatch => {

    // console.log(empleado);
    const {name, lastname, email, phone} = cliente;

    const data = {
        Name : name,
        LastName : lastname,
        Email : email,
        Phone : phone,
    }

    await axios.post("https://roraso.herokuapp.com/Client/CreateClient",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha añadido una nuevo cliente',
                type: 'success',
                confirmButtonText: 'Confirmar'
            })
            setTimeout(function(){ 
                window.location.href = `/clientes/agregar-direccion-cliente/${res.data.UserId}`;
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar crear el cliente',
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
        type: AGREGAR_CLIENTE,
        payload: cliente
    })
}

export const agregarDireccionCliente = (direccion) => async dispatch => {

    // console.log(empleado);
    const {address, department, floor, cp, latlong, client} = direccion;

    const data = {
        Address : {
            Adress : address,
            Department : department,
            Floor : floor,
            Cp : cp,
            LatLong : latlong,
            Client : client,
        }
    }

    // console.log(data)

    await axios.post("https://roraso.herokuapp.com/Client/AddAddress",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha añadido una nueva direccion',
                type: 'success',
                confirmButtonText: 'Confirmar'
            })
            setTimeout(function(){ 
                window.location.href = "/pedidos/alta-pedido";
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar crear la direccion',
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
        type: AGREGAR_DIRECCION_CLIENTE,
        payload: direccion
    })
}

export const eliminarCliente = (id) => async dispatch => {
    await axios.patch("https://roraso.herokuapp.com/Client/DeleteClient",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un nuevo cliente',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/clientes";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el cliente',
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
        type: BORRAR_CLIENTE,
        payload: id
    })
}

export const editarCliente = (cliente) => async dispatch => {
    // console.log(empleado);
    const {name, lastname, email, phone, id} = cliente;

    const data = {
        Name : name,
        LastName : lastname,
        Email : email,
        Phone : phone,
        id : id
    }

    await axios.post("https://roraso.herokuapp.com/Client/UpdateUser",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha actualizado un cliente',
                type: 'success',
                confirmButtonText: 'Confirmar'
            })
            
            setTimeout(function(){ 
                window.location.href = "/clientes";
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar actualizar un cliente',
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
        type: EDITAR_CLIENTE,
        payload: cliente
    })
}