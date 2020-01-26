import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SortableTbl from "../../react-sort-search-table/src/SortableTbl";

//Redux

import { connect } from 'react-redux';
import { mostrarCategorias } from '../../../actions/categoriasAction';
import { eliminarCategoria } from '../../../actions/categoriasAction'
import { currentUser } from '../../../actions/usuarioAction';

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

const buttonStyle2 = {
    marginLeft: 10,
    width: 160
};

let col = ["Name", "Description", "Actions"];
let tHead = [
    "Nombre",
    "Descripcion",
    "Acciones",
];

class ActionCategoriasComponent extends React.Component {

    eliminarCategoria = () => {
        const { id } = this.props.rowData;

        Swal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "Estas a punto de eliminar una categoria",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.props.eliminarCategoria(id);
            }
          })
    }

    render() {
        if(this.props.Permisos.length === 0) return null;

        const permisos = this.props.Permisos.Authorizations;

        const { id } = this.props.rowData;

        return (
            <td style={columnButtonStyle}>

            { permisos.filter(permiso => (permiso.id == 17)).length > 0 ?  
                
                    <Link style={buttonStyle2} to={{
                        pathname: `/producto/${id}`,
                        state: this.props.rowData,
                        nameCat: this.props.rowData.Name
                    }} className="btn btn-primary">
                        Ver - Agregar Productos
                    </Link>

                    :  

                    <Link style={buttonStyle2} 
                        disabled to="#" 
                        className="btn btn-primary">
                        Ver - Agregar Productos
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 18)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname: `/categoria/editar-categoria/${id}`,
                        state: this.props.rowData
                    }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 19)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={this.eliminarCategoria} type="button" className="btn btn-danger">Borrar</button>

                    :  

                     <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }

            </td>
        );
    }
}

class ListadoCategorias extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        this.props.mostrarCategorias();
        this.props.currentUser();
    }

    render() {
        const categorias = this.props.categorias;
        const loaded = this.props.loaded || false;
        if (categorias.length === 0) {
            if (categorias.length === 0 && !loaded) {
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

            return (
                < SortableTbl tblData = {
                    categorias.sort(function (a, b) {
                        return b.id - a.id
                    })
                    }
                    tHead={tHead}
                    Permisos={this.props.usuario}
                    customTd={[
                        { custd: (ActionCategoriasComponent), keyItem: "Actions" },
                    ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarCategoria={this.props.eliminarCategoria}
                />
            );

        }

    }
}

const mapStateToProps = state => ({
    categorias: state.categorias.categorias,
    loaded: state.categorias.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarCategorias,
    eliminarCategoria,
    currentUser
})(ListadoCategorias);