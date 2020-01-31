import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

class EstadoIndividual extends Component {

    goBack(){
      window.history.back();
    }

    render() {

        //console.log(this.props)

        return (
            <div>
                <Header titulo = 'Datos de Estado'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form className="col-8">
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input type="text" disabled defaultValue={this.props.location.state.Description} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Abreviatura</label>
                                    <input type="text" disabled defaultValue={this.props.location.state.Key} className="form-control" required/>
                                </div>
                            </form>
                        </div>
                        <div align="center" style={{marginTop:"20px"}} className="form-group">
                            <button type="button" className="btn" style={{color:"white", backgroundColor: "#4D4D4D"}} onClick={ () => this.goBack()}>Volver</button>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default EstadoIndividual;