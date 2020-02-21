import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ListadoEmpleados from './ListaEmpleados';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

import { connect } from 'react-redux';
import { currentUser } from '../../../actions/usuarioAction';

// const ListadoEmpleados = lazy(() => import('./ListaEmpleados'))

class Empleados extends Component {

    componentWillMount(){
        this.props.currentUser();
    }

    render() {
 
        if(this.props.usuario.length === 0) return null;

        const permisos = this.props.usuario.Authorizations;
        
        return (
            <div>
                <Header 
                    titulo = 'Lista de Empleados'
                />
                <div className="col-12 col-md-12">

                {/* <Suspense fallback={<h1>Still Loading…</h1>}> */}
                    <ListadoEmpleados/>
                {/* </Suspense> */}
                    
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        
                        
                        { permisos.filter(permiso => (permiso.id == 1)).length > 0 ?  
                
                            <Link to={`/rrhh/alta-empleado`} className="btn btn-success">Nuevo Empleado</Link> 

                            :  

                            <Link to="#" disabled className="btn btn-success">Nuevo Empleado</Link> 
                        
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
})(Empleados);