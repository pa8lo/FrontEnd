import React, { Component } from 'react';
import { Button, Collapse, Well, Col } from 'react-bootstrap';
import Header from '../header/IndexHeader';

class SolicitudesEncoladas extends Component {

    constructor(props){
        super(props);
        this.state = {
            existen_datos : false,
            pedidos : [],
            clientes : [],
            datos_cliente : [],
            combos_cliente : [],
            producto_cliente : []
        };
    }

    componentDidMount(){
        this.state.pedidos = JSON.parse(localStorage.getItem('enviarPedido'));
        this.state.clientes = JSON.parse(localStorage.getItem('clientes'));
        this.state.combos = JSON.parse(localStorage.getItem('combos'));
        this.state.productos = JSON.parse(localStorage.getItem('productos'));
 
        {this.state.pedidos.map(datos => ( 


                /** Cliente */

                this.state.datos_cliente = this.state.clientes.filter(client => (client.id === datos.client)),
        
                /** Direcciones */

                this.state.datos_cliente.map(direccion_pedido => (
                    this.state.pedidos.map(direccion_storeada => (
                        this.state.dire_cliente = direccion_pedido.Adress.filter(dire => (dire.id === direccion_storeada.address))
                    ))
                )),

                /** Combos */

                datos.combo.length > 0 ? 

                datos.combo.map(combos_storeados => (
                    this.state.combos_cliente = this.state.combos.filter(combo => (combo.id === combos_storeados.Offer))
                ))
                
                :

                this.state.combos_cliente = [],

                /** Pedidos */

                datos.product.length > 0 ? 

                datos.product.map(pedidos_storeados => (
                    this.state.producto_cliente = this.state.productos.filter(product => (product.id === pedidos_storeados.Product))
                ))
                
                :

                this.state.combos_cliente = []

                // console.log(this.state.datos_cliente),
                // console.log(this.state.dire_cliente),
                // console.log(this.state.combos_cliente),
                // console.log(this.state.producto_cliente),
                // console.log("---------------")


        ))} 
        

        if(this.state.pedidos.length === 0){
            this.setState({
                existen_datos : false
            })
        }else{
            this.setState({
                existen_datos : true
            })
        }
    }

    mostrarDatos = () => {

        console.log(this.state)

        if(this.state.existen_datos){
            return(

                this.state.pedidos.map(datos => ( 

                <div key={datos.id} style={{marginTop: "50px"}}>
                    <Col xs={12} md={6}>
                    <div align="center" className="form-group">
                        <label>Cliente</label>
                        {/* {this.state.clientes.filter(client => (client.id === datos.client))} */}
                        <h3></h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Direccion</label>
                        {/* <h3>{address.Department == null ? "Sin Dpto" : address.Department}</h3> */}
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Pedido</label>
                        {/* <h3>{address.Floor == null ? "Sin Piso" : address.Floor}</h3> */}
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Código Postal</label>
                        {/* <h3>{address.Cp == null ? "Sin CP" : address.Cp}</h3> */}
                    </div>
                    </Col>
                    {/* <Col align="center" xs={12} md={12} style={{marginTop:'20px',marginBottom:'40px'}}>
                    <button style={{marginLeft: 10, width: 140}} name="idEliminarAsistencia" 
                    onClick={() => this.eliminarDireccion(address.id)} 
                    value={address.id} type="button" className="btn btn-danger">Borrar Direccion</button>
                    </Col> */}
                </div>

                ))
                
            )
        }else{
            return(
                <h3 align="center" center="true">No existen datos</h3>
            )
        }
    }
  
    render() {
        
        return (
            <React.Fragment>

            <Header titulo = 'Solicitudes Encoladas'/>

            {this.mostrarDatos()}

            {/* {this.props.location.state.Adress.map(address => ( */}

                
                {/* ) */}
        {/* )} */}
        
        </React.Fragment>     
      );
    }
  }
  
export default SolicitudesEncoladas;