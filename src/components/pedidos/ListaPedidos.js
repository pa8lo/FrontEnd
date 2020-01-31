import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SortableTbl from "../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from 'react-redux';
import { mostrarPedidos } from '../../actions/pedidosAction';
import { eliminarPedido } from '../../actions/pedidosAction';
import { currentUser } from '../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
import Swal from 'sweetalert2'

// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3,
    marginBottom : "30px"
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};


let col = ["pedDate", "State", 
            // "Users", 
            "Clients", "Adress", "Amount", "Deliverys", "Actions"];
let tHead = [
    "Fecha",
    "Estado",
    // "Empleado",
    "Cliente",
    "Direccion",
    "Monto",
    "Delivery",
    "Acciones",
];

class ActionEmpleadoComponent extends React.Component {

    eliminarPedido = () => {
        const { id } = this.props.rowData;

        Swal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "Estas a punto de eliminar un pedido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.eliminarPedido(id);
            }
          })
        
    }

    render() {

        if(this.props.Permisos.length === 0) return null;

        const permisos = this.props.Permisos.Authorizations;

        const { id } = this.props.rowData;
        return (
            <td style={columnButtonStyle}>

                { permisos.filter(permiso => (permiso.id == 21)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                            pathname: `/pedidos/${id}`,
                            state: this.props.rowData
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
                            pathname: `/pedidos/editar-pedido/${id}`,
                            state: this.props.rowData
                            }} className="btn btn-warning">
                            Editar
                        </Link>

                        :  

                        <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                            Editar
                        </Link>
                }

                { permisos.filter(permiso => (permiso.id == 23)).length > 0 ?  
                    
                        <button style={buttonStyle} onClick={this.eliminarPedido} type="button" className="btn btn-danger">Borrar</button>

                        :  

                        <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
                }

                { permisos.filter(permiso => (permiso.id == 22)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                            pathname: `/pedidos/estado-pedido/${id}`,
                            state: this.props.rowData
                        }} className="btn btn-info">
                            Estado
                    </Link>

                    :  

                    <Link style={buttonStyle} 
                        disabled to="#" 
                        className="btn btn-info">
                            Estado
                    </Link>
                }
            </td>
        );
    }
}

class ListadoPedidos extends Component {

    state = {
        loading: true
    };

    componentWillMount() {
        this.props.mostrarPedidos();
    }

    componentDidMount(){
        this.props.mostrarPedidos();
        this.props.currentUser();
    }

    reload = () => {
        this.props.mostrarPedidos();
    }

    render() {

        let direccion = "";
        let piso = "";
        let dpto = "";

        let client_name = "";
        let client_surname = "";

        const pedidos = this.props.pedidos;
        const loaded = this.props.loaded || false;

        if (pedidos.length === 0) {

            if (pedidos.length === 0 && !loaded) {
                
                return (
                    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                        <DotLoader
                            css={override}
                            size={50} // or 150px
                            color={"#4D4D4D"}
                            loading={this.state.loading}
                        />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <h2 align="center" style={{ marginTop: '40px', marginBottom: '40px' }}>
                            No hay datos
                        </h2>
                    </div>
                )
            }
        }
        else {

            console.log(this.props)

            if (pedidos[0].State == "" || pedidos[0].Amount == "" || pedidos[0].Clients == " ") {
                // console.log("Hola")
                return (
                    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                        <DotLoader
                            css={override}
                            size={50} // or 150px
                            color={"#4D4D4D"}
                            loading={this.state.loading}
                        />
                    </div>
                )
            }else{

                if (pedidos[0].State == "" || pedidos[0].Amount == "" || pedidos[0].Clients == " ") {
                    this.reload();
                }

                for (var i = 0; i < pedidos.length; i++) {
                    if (pedidos[i].Date !== null) {

                        var DateFormated = pedidos[i].Date.split("T");
                        var HourFormated = DateFormated[1].split(".");
                        pedidos[i].pedDate = DateFormated[0] + " " + HourFormated[0];
                    } else {
                        pedidos[i].pedDate = pedidos[i].Date;
                    }
                    
                    pedidos[i].Users = pedidos[i].Users.Dni || '';
                    pedidos[i].State = pedidos[i].State.Description || '';

                    
                    if(pedidos[i].Clients.Name == null){
                        client_name = '';
                    }else{
                        client_name = pedidos[i].Clients.Name;
                    }

                    if(pedidos[i].Clients.LastName == null){
                        client_surname = '';
                    }else{
                        client_surname = pedidos[i].Clients.LastName;
                    }

                    pedidos[i].Clients = (client_name + " " + client_surname) || '';
                    

                    if(pedidos[i].Adress.Adress == null){
                        direccion = '';
                    }else{
                        direccion = pedidos[i].Adress.Adress;
                    }

                    if(pedidos[i].Adress.Floor == null){
                        piso = '';
                    }else{
                        piso = pedidos[i].Adress.Floor;
                    }

                    if(pedidos[i].Adress.Department == null){
                        dpto = '';
                    }else{
                        dpto = pedidos[i].Adress.Department;
                    }

                    pedidos[i].Adress = direccion + " " + piso + " " + dpto;


                    if (pedidos[i].Delivery == null) {
                        pedidos[i].Deliverys = "Sin Asignar"
                    } else {
                        pedidos[i].Deliverys = pedidos[i].Delivery.Name + " " + pedidos[i].Delivery.LastName;
                    }
                }

                return (
                    <SortableTbl tblData={pedidos.sort(function(a, b) {return b.id - a.id})}
                        tHead={tHead}
                        Permisos={this.props.usuario}
                        customTd={[
                            { custd: (ActionEmpleadoComponent), keyItem: "Actions" },
                        ]}
                        dKey={col}
                        search={true}
                        defaultCSS={true}
                        eliminarPedido={this.props.eliminarPedido}
                    />
                );
            }
        }
    }
}

const mapStateToProps = state => ({
    pedidos: state.pedidos.pedidos,
    loaded: state.pedidos.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarPedidos,
    eliminarPedido,
    currentUser
})(ListadoPedidos);