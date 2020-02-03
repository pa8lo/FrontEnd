import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Col } from 'react-bootstrap';
import Header from '../header/IndexHeader';

//CSS
import { css } from "@emotion/core";

import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};

class mostrarPedidosOffline extends Component {

    state = {
        loading: true,
        arrayPedidoCompleto : [],
        arrayPedidoSemiCompleto : [],
        arrayPedido : [],
        mostrarDire : false
    };

    componentDidMount(){
        this.state.arrayPedidoCompleto = JSON.parse(localStorage.getItem('pedidoCompleto'));
        this.state.arrayPedidoSemiCompleto = JSON.parse(localStorage.getItem('pedidoSemiCompleto'));
        this.state.arrayPedido = JSON.parse(localStorage.getItem('enviarPedido'));
    }

    eliminarDireccion = async (id) => {
        

        // Swal.fire({
        //     title: '¿Estas seguro que desea eliminar?',
        //     text: "Estas a punto de eliminar una direccion",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Confirmar',
        //     cancelButtonText: 'Cancelar'
        //   }).then((result) => {
        //     if (result.value) {
        //         axios.post("https://roraso.herokuapp.com/Client/DeleteAddress",{'id': id},
        //         { headers: { 'access-token': localStorage.getItem('access-token')}})
        //             .then(res => {
        //                 if(res.status === 200){
        //                     Swal.fire({
        //                         title: 'Correcto!',
        //                         text: 'Se ha borrado una direccion',
        //                         type: 'success',
        //                         confirmButtonText: 'Confirmar'
        //                     })
        //                     setTimeout(function(){ 
        //                         window.location.href = "/clientes";
        //                     }, 3500);
        //                 }
        //                 else{
        //                     Swal.fire({
        //                         title: 'Error!',
        //                         text: 'Se ha producido un error al intentar borrar la direccion',
        //                         type: 'error',
        //                         confirmButtonText: 'Reintentar'
        //                     })
        //                     return;
        //                 }
                        
        //             })
        //             .catch(err => {
        //                 Swal.fire({
        //                     title: 'Error!',
        //                     text: 'El Servidor no ha respondido la solicitud',
        //                     type: 'error',
        //                     confirmButtonText: 'Reintentar'
        //                 })
        //                 return;
        //             })
        //     }
        //   })   

        

            
        
    }

    mostrarDirecciones = (pedido) => {

        let a

        return(
            <div style={{marginTop: "10px"}}>
                <label>Direccion</label>
                <input style={{width:"250px"}} id="direccion_nueva" defaultValue={pedido.datos_direccion.Adress} type="text" className="form-control" required/>
                <label>Piso</label>
                <input style={{width:"250px"}} id="piso_nuevo" defaultValue={pedido.datos_direccion.Floor || ""} type="text" className="form-control" required/>
                <label>Dpto</label>
                <input style={{width:"250px"}} id="dpto_nuevo" defaultValue={pedido.datos_direccion.Department || ""} type="text" className="form-control" required/>
                <label>Codigo Postal</label>
                <input style={{width:"250px"}} id="cp_nuevo" defaultValue={pedido.datos_direccion.Cp || ""} type="text" className="form-control" required/>
                
                {/* {console.log(document.getElementById('direccion_nueva').value)} */}

                <button
                    style={{marginTop: "10px"}}
                    className="btn btn-primary"
                    variant="primary"
                    onClick={() => this.modificarDire(pedido, document.getElementById('direccion_nueva').value,
                    document.getElementById('piso_nuevo').value, document.getElementById('dpto_nuevo').value,
                    document.getElementById('cp_nuevo').value)}
                    >
                    Aceptar
                </button>
            </div>
        )
    }

    goBack(){
      window.history.back();
    }

    mostrarListaDireccion = () => {
        this.setState({
            mostrarDire : true
        })
    }

    modificarDire = (direccion_vieja, direccion_nueva, piso_nuevo, dpto_nuevo, cp_nuevo) => {

        direccion_vieja.datos_direccion.Adress = direccion_nueva
        direccion_vieja.datos_direccion.Floor = piso_nuevo
        direccion_vieja.datos_direccion.Department = dpto_nuevo
        direccion_vieja.datos_direccion.Cp = cp_nuevo


        if(direccion_vieja.datos_direccion.Floor == ""){

            delete direccion_vieja.datos_direccion.Floor

        }if(direccion_vieja.datos_direccion.Department == ""){

            delete direccion_vieja.datos_direccion.Department

        }if(direccion_vieja.datos_direccion.Cp == ""){

            delete direccion_vieja.datos_direccion.Cp
  
        }

        console.log(direccion_vieja)

    }

    pedidoEnviar = (pedido) => {

        // pedido.datos_direccion.Adress = "Una Nueva Direccion"

        // console.log(pedido)

    }


    render() {

        var direccion_pedido_completo

        return(

            <React.Fragment>

            <Header titulo = 'Pedidos Encolados'/>


            <div align="center">
            <h2 style={{marginTop:"50px"}}>Pedidos Completos</h2>
            </div>
            
            { this.state.arrayPedidoCompleto.length > 0 ||  this.state.arrayPedidoSemiCompleto.length > 0 || this.state.arrayPedido.length > 0 ?
            
            this.state.arrayPedidoCompleto.map((pedido, index) => (


                    // console.log(pedido),

                    <div key={pedido.datos_cliente.Phone} style={{marginTop: "30px", marginBottom: "50px"}}>
                    <Col xs={12} md={12}>
                    <div align="center" className="form-group">
                        <label><h3>Datos Cliente</h3></label>
                        <h5><b>Nombre: </b>  {pedido.datos_cliente.Name} <b>Apellido: </b> {pedido.datos_cliente.LastName} <b>Telefono: </b> {pedido.datos_cliente.Phone}</h5>
                        <h3></h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={12}>
                    <div className="form-group">
                        <label><h3>Domicilio</h3></label>
                        <h5><b> Direccion: </b>  {pedido.datos_direccion.Adress} <b> 
                            Piso: </b> {pedido.datos_direccion.Floor || "Sin piso"} <b> 
                                Dpto: </b> {pedido.datos_direccion.Department || "Sin Dpto"} <b> 
                                    C. Postal: </b> {pedido.datos_direccion.Cp || "Sin CP"}</h5>
                            <button
                                style={{marginTop: "10px"}}
                                className="btn btn-success"
                                variant="primary"
                                onClick={() => this.mostrarListaDireccion()}
                                >
                                Modificar Direccion
                            </button>
                            {
                                this.state.mostrarDire == true ?
                            
                                    this.mostrarDirecciones(pedido)
                            
                                    :
                                    
                                    null
                            }
                        {/* <input style={{width:"250px"}} ref={this.nombreRef} defaultValue={pedido.datos_direccion.Adress} type="text" className="form-control" required/> */}
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={12}>
                    <div className="form-group">
                        <label><h3>Pedido</h3></label>
                        <h5><b>Fecha: </b>  {pedido.pedido.Date} <b>Precio: </b> {pedido.pedido.Amount || "Sin Monto"} 
                        <b> Estado: </b>
                        {JSON.parse(localStorage.getItem('estados')).length > 0 ?
                        

                                JSON.parse(localStorage.getItem('estados')).filter( estado => (pedido.pedido.State == estado.id))[0].Description

                                :

                                " -Estado no reconocido"

                        }
                        <b> Combo: </b>
                        {JSON.parse(localStorage.getItem('combos')).length > 0  ?
                        

                        pedido.pedido.CombosPorPedido.map(combo_a_encontrar => (
                            (JSON.parse(localStorage.getItem('combos')).filter( combo => (combo_a_encontrar.Offer == combo.id)).length > 0) ?
                                
                                " -"+(JSON.parse(localStorage.getItem('combos')).filter( combo => (combo_a_encontrar.Offer == combo.id))[0].Name)

                                :

                                " -Combo no reconocido"
                        ))

                        :

                        " -Combo no reconocido"

                        }
                        <b> Productos: </b>
                        {JSON.parse(localStorage.getItem('combos')).length > 0 ?
                        

                        pedido.pedido.ProductosPorPedido.map(producto_a_encontrar => (

                            (JSON.parse(localStorage.getItem('productos')).filter( producto => (producto_a_encontrar.Product == producto.id)).length > 0) ?

                            " -"+(JSON.parse(localStorage.getItem('productos')).filter( producto => (producto_a_encontrar.Product == producto.id))[0].Description)
                        
                            :
                        
                            " -Productos no reconocido"
                        ))

                        :

                        " -Productos no reconocido"

                        }
                        </h5>

                        <button
                            style={{marginTop: "10px"}}
                            className="btn btn-primary"
                            variant="primary"
                            onClick={() => this.pedidoEnviar()}
                            >
                            Modificar Pedido
                        </button>
                        {/* <Link to={{
                            pathname: `/pedidos/editar-pedido/1`,
                            pedidos: pedido.pedido
                        }} className="btn btn-primary">
                            Ver
                        </Link> */}
                    </div>
                    </Col>
                    <div align="center">
                    {/* <button onClick={() => this.pedidoEnviar(pedido)} type="button" className="btn btn-primary">Enviar</button> */}
                    </div>
                    <hr style={{width:"700px"}}></hr>
                    </div>

                )
            )

            :

            <div align="center" className="form-group">
                <h3 style={{marginTop:'20px'}}>No hay datos</h3>
            </div>

            }

            <hr></hr>

            <div align="center">
            <h2 style={{marginTop:"50px"}}>Pedidos con Cliente</h2>
            </div>

            
            
            <hr></hr>

            <div align="center">
            <h2 style={{marginTop:"50px"}}>Solo Pedidos</h2>
            </div>{ this.state.arrayPedidoSemiCompleto.length > 0 ||  this.state.arrayPedidoSemiCompleto.length > 0 || this.state.arrayPedido.length > 0 ?
            
            this.state.arrayPedidoSemiCompleto.map(pedido => (

                   <div key={pedido.datos_cliente.Phone} style={{marginTop: "30px", marginBottom: "50px"}}>
                    <Col align="center" xs={12} md={12}>
                    <div className="form-group">
                        <label><h3>Domicilio</h3></label>
                        <h5><b> Direccion: </b>  {pedido.datos_direccion.Adress} <b> 
                            Piso: </b> {pedido.datos_direccion.Floor || "Sin piso"} <b> 
                                Dpto: </b> {pedido.datos_direccion.Department || "Sin Dpto"} <b> 
                                    C. Postal: </b> {pedido.datos_direccion.Cp || "Sin CP"}</h5>
                            <button
                                style={{marginTop: "10px"}}
                                className="btn btn-success"
                                variant="primary"
                                onClick={() => this.mostrarListaDireccion()}
                                >
                                Modificar Direccion
                            </button>
                            {
                                this.state.mostrarDire == true ?
                            
                                    this.mostrarDirecciones(pedido)
                            
                                    :
                                    
                                    null
                            }
                        {/* <input style={{width:"250px"}} ref={this.nombreRef} defaultValue={pedido.datos_direccion.Adress} type="text" className="form-control" required/> */}
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={12}>
                    <div className="form-group">
                        <label><h3>Pedido</h3></label>
                        <h5><b>Fecha: </b>  {pedido.pedido.Date} <b>Precio: </b> {pedido.pedido.Amount || "Sin Monto"} 
                        <b> Estado: </b>
                        {JSON.parse(localStorage.getItem('estados')).length > 0 ?
                        

                                JSON.parse(localStorage.getItem('estados')).filter( estado => (pedido.pedido.State == estado.id))[0].Description

                                :

                                " -Estado no reconocido"

                        }
                        <b> Combo: </b>
                        {JSON.parse(localStorage.getItem('combos')).length > 0  ?
                        

                        pedido.pedido.CombosPorPedido.map(combo_a_encontrar => (
                            (JSON.parse(localStorage.getItem('combos')).filter( combo => (combo_a_encontrar.Offer == combo.id)).length > 0) ?
                                
                                " -"+(JSON.parse(localStorage.getItem('combos')).filter( combo => (combo_a_encontrar.Offer == combo.id))[0].Name)

                                :

                                " -Combo no reconocido"
                        ))

                        :

                        " -Combo no reconocido"

                        }
                        <b> Productos: </b>
                        {JSON.parse(localStorage.getItem('combos')).length > 0 ?
                        

                        pedido.pedido.ProductosPorPedido.map(producto_a_encontrar => (

                            (JSON.parse(localStorage.getItem('productos')).filter( producto => (producto_a_encontrar.Product == producto.id)).length > 0) ?

                            " -"+(JSON.parse(localStorage.getItem('productos')).filter( producto => (producto_a_encontrar.Product == producto.id))[0].Description)
                        
                            :
                        
                            " -Productos no reconocido"
                        ))

                        :

                        " -Productos no reconocido"

                        }
                        </h5>

                        <button
                            style={{marginTop: "10px"}}
                            className="btn btn-primary"
                            variant="primary"
                            onClick={() => this.pedidoEnviar()}
                            >
                            Modificar Pedido
                        </button>
                        {/* <Link to={{
                            pathname: `/pedidos/editar-pedido/1`,
                            pedidos: pedido.pedido
                        }} className="btn btn-primary">
                            Ver
                        </Link> */}
                    </div>
                    </Col>
                    <div align="center">
                    {/* <button onClick={() => this.pedidoEnviar(pedido)} type="button" className="btn btn-primary">Enviar</button> */}
                    </div>
                    <hr style={{width:"700px"}}></hr>
                    </div>

                )
            )

            :

            <div align="center" className="form-group">
                <h3 style={{marginTop:'20px'}}>No hay datos</h3>
            </div>

            }

            {/* { this.state.arrayPedido.length > 0 ||  this.state.arrayPedidoSemiCompleto.length > 0 || this.state.arrayPedido.length > 0 ?
            
            this.state.arrayPedidoCompleto.map(pedido => (

                    console.log(pedido)

                )
            )

            :

            <div align="center" className="form-group">
                <h3 style={{marginTop:'20px'}}>No hay datos</h3>
            </div>

            } */}
            
        
        </React.Fragment>        
        )

    }
}


export default mostrarPedidosOffline;
