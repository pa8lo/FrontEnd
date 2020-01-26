import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaGastos from './ListaGastos';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

class Gastos extends Component {
    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Gastos'
                />
                <div className="col-12 col-md-12">
                    <ListaGastos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 24)).length > 0 ?  
                
                            <Link to={`/gastos/alta-gasto`} className="btn btn-success">Nuevo Gasto</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Gasto</Link> 
                        
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
})(Gastos);