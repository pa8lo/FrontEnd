import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaCombos from './ListaCombos';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

class Combo extends Component {
    componentWillMount(){
       // this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Combos'
                />
                <div className="col-12 col-md-12">
                    <ListaCombos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 16)).length > 0 ?  
                
                            <Link to={`/combos/alta-combo`} className="btn btn-success">Nuevo Combo</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Combo</Link> 
                        
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
})(Combo);