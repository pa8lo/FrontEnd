import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaRoles from './ListaRoles';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

class Roles extends Component {

    componentWillMount(){
        this.props.currentUser();
    }


    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;

        return (
            <div>
                <Header 
                    titulo = 'Lista de Roles'
                />
                <div className="col-12 col-md-12">
                    <ListaRoles/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 9)).length > 0 ?  
                
                             <Link to={`/rrhh/alta-rol`} className="btn btn-success">Nuevo Rol</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Rol</Link> 
                        
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
})(Roles);