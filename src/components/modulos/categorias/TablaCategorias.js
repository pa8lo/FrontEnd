import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListadoCategorias from './ListaCategorias';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

class Categorias extends Component {
    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Categorias'
                />
                <div className="col-12 col-md-12">
                    <ListadoCategorias/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                         
                        { permisos.filter(permiso => (permiso.id == 16)).length > 0 ?  
                
                            <Link to={`/categoria/alta-categoria`} className="btn btn-success">Nueva Categoria</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nueva Categoria</Link> 
                        
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
})(Categorias);