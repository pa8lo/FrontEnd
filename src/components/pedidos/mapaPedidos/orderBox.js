import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SortableTbl from "../../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

//Redux

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Order", "Delivery", "Actions"];
let tHead = [
    "Pedido",
    "Delivery",
    "Acciones",
];

class ActionOrderComponent extends React.Component {

  render() {

    const { id } = this.props.rowData;

    let pedido = (JSON.parse(localStorage.getItem('pedidos')).filter(pedido => (pedido.id === id)))

    pedido[0].Adress = (pedido[0].Adress.Adress + " " + pedido[0].Adress.Floor + " " + pedido[0].Adress.Department)

    // console.log(pedido[0])

    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    return (
        <td style={columnButtonStyle}>

           { permisos.filter(permiso => (permiso.id == 21)).length > 0 ?  
                
                <Link style={buttonStyle} to={{
                        pathname: `/pedidos/${id}`,
                        state: pedido[0]
                    }} className="btn btn-primary">
                        Ver
                </Link>
                
                :  
                
                <Link style={buttonStyle} 
                    disabled to="#" 
                    className="btn btn-primary">
                        Ver
                </Link>
            }


            { permisos.filter(permiso => (permiso.id == 22)).length > 0 ?  

                <Link style={buttonStyle} to={{
                    pathname : `/mapa/editar-pedido/${id}`,
                    state : this.props.rowData
                    }} className="btn btn-warning">
                    Editar
                </Link>

                :

                <Link style={buttonStyle}
                    disabled to="#" 
                    className="btn btn-warning">
                    Editar
                </Link>

            }

        </td> 
    );
  }
}

class OrderBox extends React.Component {
    
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.currentUser();
    }

    render() {
        const pedidos = this.props.pedidos;

        // console.log(pedidos)

        var orders = [];
        for(var i = 0; i < pedidos.length; i++) {
            if (pedidos[i].State.Description != "Entregado" && pedidos[i].State.Description != "Rechazado") {

                if (pedidos[i].Delivery !== null) {
    
                    orders.push({
                        id: pedidos[i].id,
                        Order: "Pedido " + pedidos[i].id,
                        Delivery: pedidos[i].Delivery.Name + " " + pedidos[i].Delivery.LastName,
                        DeliveryId: pedidos[i].Delivery.id,
                    });
                } else {
                    orders.push({
                        id: pedidos[i].id,
                        Order: "Pedido " + pedidos[i].id,
                        Delivery: "Sin Asignar",
                        DeliveryId: null,
                    });
    
                }
            }
        }

        if(pedidos.length === 0) {
            return (
                <div>
                    <h2 align="center" style={{ marginTop: '40px', marginBottom: '40px' }}>
                        No hay datos
                    </h2>
                </div>
        )}
        else{

            return (
                <div style={{ width: "95%", margin: "30px auto" }}>
    
                    <SortableTbl tblData = {orders}
                        tHead={tHead}
                        Permisos={this.props.usuario}
                        customTd={[
                                    {custd: (ActionOrderComponent), keyItem: "Actions"},
                                    ]}
                        dKey={col}
                        search={true}
                        defaultCSS={true}
                    />
                </div>
            );

		}

        
    }
    
}

const mapStateToProps = state => ({
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    currentUser
})(OrderBox);