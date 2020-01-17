import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/IndexHeader';
import ListaPedidos from './ListaPedidos';
import StickyButton from '../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

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
                        
                        { permisos.filter(permiso => (permiso.id == 20)) ?  
                
                            <Link to={`/pedidos/alta-pedido`} className="btn btn-success">Nuevo Pedido</Link>

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Pedido</Link> 
                        
                        }

                        { permisos.filter(permiso => (permiso.id == 20)) ?  
                
                            <Link to={`/pedido/estados`} className="btn btn-warning" style={{marginLeft: '20px'}}>Nuevo Estado</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-warning" style={{marginLeft: '20px'}}>Nuevo Estado</Link> 
                        
                        }

                        { permisos.filter(permiso => (permiso.id == 6)) ?  
                
                            <Link to={`/clientes`} className="btn btn-danger" style={{marginLeft: '20px'}}>Clientes</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-danger" style={{marginLeft: '20px'}}>Clientes</Link> 
                        
                        }

                        { permisos.filter(permiso => (permiso.id == 20)) ?  
                
                            <Link to={`/mapa`} className="btn btn-info" style={{marginLeft: '20px'}}>Ver Pedidos en Mapa</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-info" style={{marginLeft: '20px'}}>Ver Pedidos en Mapa</Link> 
                        
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