import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Producto from './Producto';
import SortableTbl from "react-sort-search-table";

//Redux

import { connect } from 'react-redux';
import { mostrarProducto } from '../../../actions/productosAction';
import { eliminarProducto } from '../../../actions/productosAction';
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

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};


let col = ["Name", "Description", "Amount", "catName", "Actions"];
let tHead = [
    "Nombre",
    "Descripcion",
    "Precio",
    "Categoria",
    "Acciones",
];

class ActionProductoComponent extends React.Component {

  eliminarProducto = () => {
      const { id } = this.props.rowData;

      this.props.eliminarProducto(id);
  }

  render() {
    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;
    
    return (
        <td style={columnButtonStyle}>

            { permisos.filter(permiso => (permiso.id == 17)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/producto/productoid/${id}`,
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

            { permisos.filter(permiso => (permiso.id == 18)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/producto/editar-producto/${id}`,
                        state : this.props.rowData
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 19)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={this.eliminarProducto} type="button" className="btn btn-danger">Borrar</button>

                    :  

                    <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }

        </td> 
    );
  }
}

class ListadoProductos extends Component {

    state = {
        loading: true
    };

    constructor(...args) {
        super(...args);
    }

    componentDidMount(){
        var URLactual = window.location.pathname.split('/');

        this.props.mostrarProducto(URLactual[2]);
        this.props.currentUser();
    }

    mostrarProducto = () => {

        if(this.props.productos == undefined || this.props.productos == "undefined") return null;
        
        const productos = this.props.productos;

        // console.log(productos);

        return (
            <React.Fragment>
                {productos.map(producto => (
                    <Producto
                        nameCat = {this.props.nameCat}
                        key = {producto.id}
                        info = {producto.Products}
                    />
                ))}
            </React.Fragment>
        )
        
    }

    render() {
        const productos = this.props.productos;
        const loaded = this.props.loaded || false;
        let products;

        if (productos !== undefined) {

            products = productos[0].Products;

            var cat = productos[0].Name;

            for(var i = 0; i < products.length; i++) {
                products[i].catName = cat;
            }
        }

        if (products === undefined) {
            if(products === undefined && !loaded){
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
                
                <SortableTbl tblData = {
                    products.sort(function (a, b) {
                        return b.id - a.id
                    }) 
                }
                    tHead={tHead}
                    Permisos={this.props.usuario}
                    customTd={[
                                {custd: (ActionProductoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarProducto = {this.props.eliminarProducto}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    productos : state.productos.producto,
    loaded: state.categorias.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarProducto,
    eliminarProducto,
    currentUser
})(ListadoProductos);