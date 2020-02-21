import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaEstados from './ListaEstados';
import Header from '../header/IndexHeader';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

class Estados extends Component {

    componentWillMount(){
        this.props.currentUser();
    }

    render() {
        
        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;

        return (
            <div>
                <Header 
                    titulo = 'Lista de Estados'
                />
                <div className="col-12 col-md-12">
                    <ListaEstados/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

                        { permisos.filter(permiso => (permiso.id == 20)).length > 0 ? 
                
                            <Link to={`/estados/alta-estado`} className="btn btn-success">Nuevo Estado</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Estado</Link> 
                        
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
})(Estados);