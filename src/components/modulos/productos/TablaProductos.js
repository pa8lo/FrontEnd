import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListadoProductos from './ListaProductos';
import Header from '../../header/IndexHeader';

import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

class Productos extends Component {
    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Productos'
                />
                <div className="col-12 col-md-12">
                    <ListadoProductos
                        nameCat = {this.props.history.location.nameCat}
                        // borrarEmpleado = {this.props.borrarEmpleado}
                    />
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 16)).length > 0 ?  
                
                            <Link to={{
                                pathname : `/productos/alta-producto`,
                                state : this.props.match.params.idCat
                                }} className="btn btn-success">
                                Nuevo Producto
                            </Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Producto</Link> 
                        
                        }
                        
                        
                    </div>          
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    currentUser
})(Productos);