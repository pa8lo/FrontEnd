import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/IndexHeader';
import ListaPedidos from './ListaPedidos';
import StickyButton from '../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

const buttonStyle = {
    marginLeft: 10,
    width: 155
};

class Pedidos extends Component {
    componentWillMount(){
        this.props.currentUser();
    }

    render() {

        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Pedidos'
                />
                <div className="col-12 col-md-12">
                    <ListaPedidos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        { permisos.filter(permiso => (permiso.id == 20)).length > 0 ?  
                
                            <Link to={`/pedidos/alta-pedido`} className="btn btn-success">Nuevo Pedido</Link>

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Pedido</Link> 
                        
                        }

                        { JSON.parse(localStorage.getItem('pedidoCompleto')).length > 0 || JSON.parse(localStorage.getItem('pedidoSemiCompleto')).length > 0 || JSON.parse(localStorage.getItem('enviarPedido')).length > 0 ?  
                
                            <Link to={`/pedidos-encolados`} style={buttonStyle} className="btn btn-warning">Solicitudes Encoladas</Link>

                            :  

                            <Link to="#" disabled style={buttonStyle} className="btn btn-warning">Solicitudes Encoladas</Link>
                        
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
})(Pedidos);