import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaTurnos from './ListaTurnos';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

class Turnos extends Component {
    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Turnos'
                />
                <div className="col-12 col-md-12">
                    <ListaTurnos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 28)).length > 0 ?  
                
                            <Link to={`/rrhh/alta-turno`} className="btn btn-success">Nuevo Turno</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Turno</Link> 
                        
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
})(Turnos);