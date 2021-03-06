import React, { Component } from 'react';
import axios from 'axios';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import AddressForm from './direcciones/AddressForm';

//Redux
import { connect } from 'react-redux';
import { agregarCliente } from '../../actions/clientesAction';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';


class AgregarDatosCliente extends Component {

    render() {
        //console.log(this.props);
        return (
            
        <React.Fragment> 
            <Header titulo = 'Alta de Dirección'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                        <AddressForm 
                            clientId={this.props.match.params.clienteId}
                        />
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    clientes : state.clientes.clientes
});

export default connect(mapStateToProps, { agregarCliente })(AgregarDatosCliente);