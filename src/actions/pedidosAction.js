import { MOSTRAR_PEDIDOS, AGREGAR_PEDIDO, EDITAR_PEDIDO, BORRAR_PEDIDO, ASIGNAR_DELIVERY } from '../actions/types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

export const mostrarPedidos = () => async dispatch => {
    const pedidos = await axios.get('https://roraso.herokuapp.com/Pedido/Pedidos',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_PEDIDOS,
            payload :  res.data
        })

        // console.log(res.status)
        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar pedidos',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }
    })
    .catch(err => {

        // console.log(err)

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
        }else{
            const serializedPedido = localStorage.getItem('pedidos');
            let deserializedPedidos;

            deserializedPedidos = JSON.parse(serializedPedido);
            
            dispatch({
                type : MOSTRAR_PEDIDOS,
                payload : deserializedPedidos
            })
        }
    })
}

export const eliminarPedido = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Pedido/Delete",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){

                const serializedPedido = localStorage.getItem('pedidos');
                let deserializedPedido = JSON.parse(serializedPedido);

                let nuevo_array = (deserializedPedido.filter(pedido => (pedido.id !== id)));

                localStorage.setItem('pedidos', JSON.stringify(nuevo_array))

                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un pedido',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/pedidos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el pedido',
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
        type: BORRAR_PEDIDO,
        payload: id
    })
}

export const agregarPedido = (pedido) => async dispatch => {

    const {date, user, amount, state, combo, client, product, address} = pedido;

    const data = {
        Date : date,
        Users : user,
        Amount : amount,
        State : state,
        Clients : client,
        CombosPorPedido : combo,
        ProductosPorPedido : product,
        Adress : address
    }

    // console.log(data)

    await axios.post("https://roraso.herokuapp.com/Pedido/Create",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){

                dispatch({
                    type: AGREGAR_PEDIDO,
                    payload: pedido
                })

                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo pedido',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/pedidos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el pedido',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })
        .catch(err => {

            if(localStorage.getItem('status') == 'offline'){

                Swal.fire({
                    title: 'Atencion!',
                    text: 'La solicitud fue guardada en la bandeja se enviara una vez se restablezca la conexion',
                    type: 'warning',
                    confirmButtonText: 'Ok'
                })
        
                if(localStorage.getItem('enviarPedido').length > 0){
        
                    let obtenerPedidoAEnviar = localStorage.getItem('enviarPedido');
                    
                    let deserializarPedidoAEnviar 
        
                    deserializarPedidoAEnviar = JSON.parse(obtenerPedidoAEnviar);
        
                    deserializarPedidoAEnviar.push(pedido);
                    
                    localStorage.setItem('enviarPedido', JSON.stringify(deserializarPedidoAEnviar))
                }
                else{
                    localStorage.setItem('enviarPedido', JSON.stringify(pedido))
                }
        
                return;
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'El Servidor no ha respondido la solicitud',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })

}

export const asignarDelivery = (line) => async dispatch => {

    const data = {
        "Delivery": {
            "id": Number(line[1])
        },
        "Pedido": {
            "id": line[0]
        }
    }
    //console.log(data);
    await axios.post("https://roraso.herokuapp.com/Pedido/Asignar", data, {
            headers: {
                'access-token': localStorage.getItem('access-token')
            }
        })
        .then(res => {
            if (res.status === 200 ) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo pedido',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function () {
                    window.location.href = "/mapa";
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar asignar el pedido',
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
        type: ASIGNAR_DELIVERY,
        payload: line,
    })
}

export const editarPedido = (pedido) => async dispatch => {

    const {id, date, user, amount, state, combo, client, product, address} = pedido;

    const data = {
        id : id,
        Date : date,
        Users : user,
        Amount : amount,
        State : state,
        Clients : client,
        CombosPorPedido : combo,
        ProductosPorPedido : product,
        Adress : address
    }

    //console.log(data)

    await axios.post("https://roraso.herokuapp.com/Pedido/Update",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200 ){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha modificado un pedido',
                    type: 'success',
                    confirmButtonText: 'Confirmar'
                })
                setTimeout(function(){ 
                    window.location.href = "/pedidos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar editar el pedido',
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
        type: EDITAR_PEDIDO,
        payload: pedido
    })
}
