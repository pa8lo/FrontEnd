import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SortableTbl from "../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from 'react-redux';
import { mostrarGastos } from '../../actions/gastosAction';
import { eliminarGasto } from '../../actions/gastosAction';
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


let col = ["Details", "Amount", "Date", "Actions"];
let tHead = [
    "Gasto",
    "Monto",
    "Fecha",
    "Acciones",
];

class ActionGastoComponent extends React.Component {

    eliminarGasto = () => {
        Swal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "Estas a punto de eliminar un gasto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.eliminarGasto(this.props.rowData.id);
            }
          })
        
    }

    render() {

        if(this.props.Permisos.length === 0) return null;

        const permisos = this.props.Permisos.Authorizations;

        const { id } = this.props.rowData;

        return (
            <td style={columnButtonStyle}>

            { permisos.filter(permiso => (permiso.id == 25)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname: `/gastos/${id}`,
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

            { permisos.filter(permiso => (permiso.id == 26)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname: `/gastos/editar-gasto/${id}`,
                        state: this.props.rowData
                    }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 27)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={this.eliminarGasto} type="button" className="btn btn-danger">Borrar</button>

                    :  

                     <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }
                
            </td>
        );
    }
}

class ListaGastos extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        this.props.mostrarGastos();
        this.props.currentUser();
    }

    render() {
        // console.log("token", localStorage.getItem('access-token'));

        const gastos = this.props.gastos;
        const loaded = this.props.loaded || false;

        // console.log(gastos.length)
        // console.log(loaded)

        if (gastos.length === 0) {
            if (gastos.length === 0 && !loaded) {
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
        }else {

            let new_date_format;

            this.props.gastos.map(date => (
                new_date_format = date.Date.split('T'),
                new_date_format = new_date_format[0],
                date.Date = new_date_format
            ))

            return (
                < SortableTbl tblData = {
                    gastos.sort(function (a, b) {
                        return b.id - a.id
                    })
                }
                    tHead={tHead}
                    Permisos={this.props.usuario}
                    customTd={[
                        { custd: (ActionGastoComponent), keyItem: "Actions" },
                    ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarGasto={this.props.eliminarGasto}
                />
            );

        }

    }
}

const mapStateToProps = state => ({
    gastos: state.gastos.gastos,
    loaded: state.gastos.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarGastos,
    eliminarGasto,
    currentUser
})(ListaGastos);