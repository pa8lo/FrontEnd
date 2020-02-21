import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaClientes from './ListaClientes';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

class Clientes extends Component {

    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Clientes'
                />
                <div className="col-12 col-md-12">
                    <ListaClientes/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 5)).length > 0 ?  
                
                            <Link to={`/clientes/alta-cliente`} className="btn btn-success">Nuevo Cliente</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Cliente</Link> 
                        
                        }
                        
                        
                    </div>
                </div> 
                <StickyButton/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    currentUser
})(Clientes);