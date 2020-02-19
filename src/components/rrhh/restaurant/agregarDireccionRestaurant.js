import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import AddressForm from './direcciones/AddressForm';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

class AgregarDireccionRestaurant extends Component {

    render() {
        //console.log(this.props);
        return (
            
        <React.Fragment>
            <Header titulo = 'Dirección de Restaurant'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                        <AddressForm />
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

export default AgregarDireccionRestaurant;