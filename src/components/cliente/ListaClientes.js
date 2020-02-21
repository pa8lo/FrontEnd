import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SortableTbl from "../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from 'react-redux';
import { mostrarClientes } from '../../actions/clientesAction';
import { eliminarCliente } from '../../actions/clientesAction';
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
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};

let col = ["Name", "LastName", "Email", "Phone", "Actions"];
let tHead = [
    "Nombre",
    "Apellido",
    "Email",
    "Telefono",
    "Acciones",
];

class ActionClienteComponent extends React.Component {

  eliminarCliente = () => {

    Swal.fire({
        title: '¿Estas seguro que desea eliminar?',
        text: "Estas a punto de eliminar un cliente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
            this.props.eliminarCliente(this.props.rowData.id);
        }
      })   
  }

  render() {
    if(this.props.Permisos.length === 0) return (

        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <DotLoader
                css={override}
                size={50} // or 150px
                color={"#4D4D4D"}
                loading={this.state.loading}
            />
        </div>
        
    );

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    return (
        <td style={columnButtonStyle}>

            { permisos.filter(permiso => (permiso.id == 6)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/cliente/${id}`,
                        state : this.props.rowData
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

            { permisos.filter(permiso => (permiso.id == 7)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/clientes/editar-cliente/${id}`,
                        state : this.props.rowData
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 8)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={ this.eliminarCliente } type="button" className="btn btn-danger">Borrar</button>

                    :  

                    <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }
        
            { permisos.filter(permiso => (permiso.id == 5)).length > 0 ?

            <Link style={{marginLeft: 10, width: 110}} to={{
                pathname : `/clientes/agregar-direccion-cliente/${id}`,
                state : this.props.rowData
                }} className="btn btn-info">
                Agregar Dire
            </Link>

            :

            <Link style={{marginLeft: 10, width: 110}}
                disabled to="#" 
                className="btn btn-info">
                Agregar Dire
            </Link>

            }

            { permisos.filter(permiso => (permiso.id == 6)).length > 0 ?

            <Link style={{marginLeft: 10, width: 110}} to={{
                pathname : `/clientes/consultar-direccion-cliente/${id}`,
                state : this.props.rowData
                }} className="btn btn-success">
                Consultar Dire
            </Link>

            :

            <Link style={{marginLeft: 10, width: 110}} 
                disabled to="#" 
                className="btn btn-success">
                Consultar Dire
            </Link>

            }


        </td> 
    );
  }
}

class ListaClientes extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarClientes();
        this.props.currentUser();
    }

    render() {
        const clientes = this.props.clientes;
        const loaded = this.props.loaded || false;

        if(this.props.clientes == null || this.props.clientes == undefined) return (

            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                <DotLoader
                    css={override}
                    size={50} // or 150px
                    color={"#4D4D4D"}
                    loading={this.state.loading}
                />
            </div>
            
        );

        if(clientes.length === 0) {
            if (clientes.length === 0 && !loaded) {
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
        else{

        return (
            <SortableTbl tblData={clientes.sort(function(a, b) {return b.id - a.id})}
                tHead={tHead}
                Permisos={this.props.usuario}
                customTd={[
                            {custd: (ActionClienteComponent), keyItem: "Actions"},
                            ]}
                dKey={col}
                search={true}
                defaultCSS={true}
                eliminarCliente = {this.props.eliminarCliente}
            />
        );
        }
    }
}

const mapStateToProps = state => ({
    clientes : state.clientes.clientes,
    loaded: state.categorias.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarClientes,
    eliminarCliente,
    currentUser
})(ListaClientes);